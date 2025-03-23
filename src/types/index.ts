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
}

export interface ContentTree {
  [category: string]: Post[];
}

export interface BlogLayoutProps {
  children: React.ReactNode;
  contentTree: ContentTree;
}

export interface NavigationProps {
  contentTree: ContentTree;
}

export interface PostProps {
  post: Post | null;
}

export interface PostListProps {
  posts: Post[];
  title?: string;
} 