// GitHub API
import { downloadMarkdown } from "@/apis/downloadMarkdown";
import { searchContents } from "@/apis/searchContents";
import { extractFrontMatter } from "@/utils/parseMarkdown";
import useContentStore from "@/stores/ContentStore";
import { ContentTree, FileNode } from "@/types/ContentTree";
import { Post, Tag } from "@/types/Post";

import { GitHubConfig } from "config/github";

//TEMPORARY
// const TEMPORARY_CONTENT_ROOT = 'content/_private';
const CONTENT_ROOT = GitHubConfig.CONTENT_ROOT;

export async function initContent() {
  const { contentTree,setIsLoading, setContentTree, setPosts, setAllTags } = useContentStore.getState();
  if (Object.keys(contentTree).length > 0) {
    return;
  }
  setIsLoading(true);
  
  try {
    // 포스트와 태그 저장소
    const posts: Post[] = [];
    const tagMap: Map<string, Tag> = new Map();
    const contentTree: ContentTree = {};
    
    // GitHub API를 통해 컨텐츠 서치 
    const contentResponse = await searchContents(CONTENT_ROOT);
    
    // 포스트 데이터 처리 및 태그 추출
    for (const item of contentResponse) {
      console.log(item);
      if (item.type === 'dir') {
        if (item.name.startsWith('_')) {
          continue;
        }
        const category = item.name;
        contentTree[category] = [];
        
        // 디렉토리 내 파일 처리
        await processDirectory(item.path, contentTree[category], posts, tagMap);
      } else if (item.type === 'file' && item.name.endsWith('.md')) {
        // 마크다운 파일 처리
        const category = 'blog';
        if (!contentTree[category]) {
          contentTree[category] = [];
        }
        await processMarkdownFile(item, contentTree[category], posts, tagMap);
      }
    }
    
    // 상태 업데이트
    setContentTree(contentTree);
    setPosts(posts);
    setAllTags(Array.from(tagMap.values()));

  } catch (error) {
    console.error('콘텐츠 초기화 중 오류:', error);
    throw error;
  } finally {
    setIsLoading(false);    
  }
}

// 디렉토리 처리 함수
async function processDirectory(
  path: string, 
  nodes: FileNode[], 
  posts: Post[], 
  tagMap: Map<string, Tag>
) {
  const response = await searchContents(path);
  
  for (const item of response) {
    if (item.type === 'file' && item.name.endsWith('.md')) {
      // 마크다운 파일 콘텐츠 로드
      await processMarkdownFile(item, nodes, posts, tagMap);
    } else if (item.type === 'dir') {
      // 하위 디렉토리 처리
      const childNode: FileNode = {
        name: item.name,
        path: item.path,
        type: 'directory',
        children: []
      };
      
      nodes.push(childNode);
      
      if (childNode.children) {
        await processDirectory(item.path, childNode.children, posts, tagMap);
      }
    }
  }
}

// 마크다운 파일 처리 함수
async function processMarkdownFile(
  item: { path: string; name: string; type: string },
  nodes: FileNode[],
  posts: Post[],
  tagMap: Map<string, Tag>
) {
  // 마크다운 파일 콘텐츠 로드
  const contentResponse = await downloadMarkdown(item.path);
  const file = await contentResponse.data;
  
  // 프론트매터에서 메타데이터 추출
  const { metadata, content } = extractFrontMatter(file);
  const { title, description, tags: tagNames, date, category } = metadata;
  
  // 포스트 객체 생성
  const post: Post = {
    title: title.replace('.md', ''),
    description,
    date,
    category,
    path: item.path,
    content,
    tags: [],
  };
  
  // 태그 처리
  if (tagNames && Array.isArray(tagNames)) {
    for (const tagName of tagNames) {
      let tag = tagMap.get(tagName);
      
      if (!tag) {
        tag = { name: tagName, posts: [] };
        tagMap.set(tagName, tag);
      }
      
      tag.posts.push(post);
      post.tags.push(tag);
    }
  }
  
  // 포스트 저장
  posts.push(post);
  
  // 트리 노드 추가
  const fileNode: FileNode = {
    name: item.name,
    path: item.path,
    type: 'file',
    post
  };
  
  nodes.push(fileNode);
}