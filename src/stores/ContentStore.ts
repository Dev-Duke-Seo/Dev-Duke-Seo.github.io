import { create } from "zustand";
import { Post, Tag } from "types/Post";
import { ContentTree } from "types/ContentTree";

interface ContentStoreState {
  // 컨텐츠 트리 
  contentTree: ContentTree;
  setContentTree: (tree: ContentTree) => void;
  
  // 모든 포스트 목록
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  
  // 태그 관련 상태
  allTags: Tag[];
  setAllTags: (tags: Tag[]) => void;
  selectedTag: Tag | null;
  setSelectedTag: (tag: Tag | null) => void;
  
  // 태그별 포스트 필터링 함수
  getPostsByTag: (tagName: string) => Post[];
  
  // 컨텐츠 로딩 상태
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useContentStore = create<ContentStoreState>((set, get) => ({
  // 초기 상태
  contentTree: {},
  posts: [],
  allTags: [],
  selectedTag: null,
  isLoading: false,

  // 액션
  setContentTree: (tree) => set({ contentTree: tree }),
  setPosts: (posts) => set({ posts }),
  
  setAllTags: (tags) => set({ allTags: tags }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  
  setIsLoading: (isLoading) => set({ isLoading }),
  
  // 선택된 태그에 따라 포스트 필터링
  getPostsByTag: (tagName) => {
    const { posts } = get();
    
    if (!tagName) return posts;
    
    return posts.filter((post) => 
      post.tags && post.tags.some(tag => tag.name === tagName)
    );
  },
}));

export default useContentStore; 