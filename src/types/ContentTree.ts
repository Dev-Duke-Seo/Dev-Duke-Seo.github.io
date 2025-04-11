import { Post } from "./Post";

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
