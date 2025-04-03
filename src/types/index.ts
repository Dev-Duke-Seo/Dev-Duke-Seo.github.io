export interface Post {
  title: string;
  description: string;
  createdAt: string;
  tags: string[];
  slug: string;
  category: string;
  path: string;
  content: string;
  htmlContent?: string;
  contentLoaded?: boolean;
}

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  post?: Post;
}

export interface ContentTree {
  [category: string]: FileNode[];
}

export interface BlogLayoutProps {
  children: React.ReactNode;
  contentTree: ContentTree;
}

export interface SidebarProps {
  contentTree: ContentTree;
  isOpen: boolean;
  onToggle: () => void;
}

export interface PostProps {
  post: Post | null;
}

export interface PostListProps {
  posts: Post[];
  title?: string;
} 