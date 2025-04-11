export interface Post {
  title: string;
  description: string;
  date: Date | null;
  tags: Tag[];
  category: string;
  path: string;
  content: string;
  htmlContent?: string;
  contentLoaded?: boolean;
}

export interface Tag {
  name: string;
  posts: Post[];
  }