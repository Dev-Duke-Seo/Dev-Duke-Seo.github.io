/**
 * IndexedDB를 사용한 캐싱 서비스
 * 브라우저 내 데이터베이스에 API 응답을 캐싱합니다.
 */

// 데이터베이스 설정
const DB_NAME = 'blog_cache';
const DB_VERSION = 1;
const STORE_NAME = 'github_data';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24시간

// 캐시 아이템 인터페이스
interface CacheItem<T> {
  key: string;
  data: T;
  timestamp: number;
}

// IndexedDB 초기화
async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      console.error('IndexedDB 열기 실패:', event);
      reject(new Error('IndexedDB 열기 실패'));
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // 객체 저장소가 없으면 생성
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        console.log('캐시 저장소가 생성되었습니다.');
      }
    };
  });
}

/**
 * 캐시에서 데이터 가져오기
 */
export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      
      request.onerror = (event) => {
        console.error('캐시 검색 실패:', event);
        reject(new Error('캐시 검색 실패'));
      };
      
      request.onsuccess = () => {
        const result = request.result as CacheItem<T> | undefined;
        
        // 캐시 항목이 없거나 만료된 경우
        if (!result || (Date.now() - result.timestamp > CACHE_EXPIRATION)) {
          // 만료된 항목 삭제
          if (result) {
            deleteFromCache(key).catch(console.error);
          }
          resolve(null);
          return;
        }
        
        resolve(result.data);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('캐시 접근 오류:', error);
    return null;
  }
}

/**
 * 데이터를 캐시에 저장
 */
export async function saveToCache<T>(key: string, data: T): Promise<void> {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const cacheItem: CacheItem<T> = {
        key,
        data,
        timestamp: Date.now()
      };
      
      const request = store.put(cacheItem);
      
      request.onerror = (event) => {
        console.error('캐시 저장 실패:', event);
        reject(new Error('캐시 저장 실패'));
      };
      
      request.onsuccess = () => {
        resolve();
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('캐시 저장 오류:', error);
  }
}

/**
 * 캐시에서 항목 삭제
 */
export async function deleteFromCache(key: string): Promise<void> {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);
      
      request.onerror = (event) => {
        console.error('캐시 항목 삭제 실패:', event);
        reject(new Error('캐시 항목 삭제 실패'));
      };
      
      request.onsuccess = () => {
        resolve();
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('캐시 삭제 오류:', error);
  }
}

/**
 * 모든 캐시 정리
 */
export async function clearCache(): Promise<void> {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();
      
      request.onerror = (event) => {
        console.error('캐시 정리 실패:', event);
        reject(new Error('캐시 정리 실패'));
      };
      
      request.onsuccess = () => {
        console.log('캐시가 정리되었습니다.');
        resolve();
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('캐시 정리 오류:', error);
  }
} 