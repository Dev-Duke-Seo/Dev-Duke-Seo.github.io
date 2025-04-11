
import useSidebarStore from "@/stores/SidebarStore";
import React from "react";
import { Link } from "react-router-dom";
import * as S from "@/layouts/Sidebar/SidebarStyles";
import { FileNode as FileNodeType } from "types/ContentTree";


interface NodeProps {
    node: FileNodeType;
    depth: number;
}

/**
 * 폴더 노드 컴포넌트
 */
export function FolderNode({ node, depth }: NodeProps) {
	const [isOpen, setIsOpen] = React.useState(true);

	if (!node.children || node.children.length === 0) {
		return null;
	}

	return (
		<S.FolderItem>
			<S.FolderHeader onClick={() => setIsOpen(!isOpen)}>
				<S.FolderIcon>{isOpen ? "📂" : "📁"}</S.FolderIcon>
				<S.FolderName>{node.name}</S.FolderName>
			</S.FolderHeader>

			{isOpen && (
				<S.FolderChildren>
					{node.children.map((child) => (
						<TreeNode key={child.path} node={child} depth={depth + 1} />
					))}
				</S.FolderChildren>
			)}
		</S.FolderItem>
	);
}

/**
 * 파일 노드 컴포넌트
 */
export function FileNode({ node, depth }: NodeProps) {
	const { currentPostPath } = useSidebarStore();
	const isActive = node.post?.path === currentPostPath;
	
	if (!node.post) {
		return null;
	}

	return (
		<S.FileItem>
			<Link to={node.post.path}>
				<S.FileIcon>📄</S.FileIcon>
				<S.FileName $isActive={isActive}>
					{node.name.replace(".md", "")}
				</S.FileName>
			</Link>
		</S.FileItem>
	);
}

/**
 * 트리 노드 컴포넌트
 */
export default function TreeNode({ node, depth }: NodeProps) {
	if (node.type === "directory") {
		return <FolderNode node={node} depth={depth} />;
	} else {
		return <FileNode node={node} depth={depth} />;
	}
}