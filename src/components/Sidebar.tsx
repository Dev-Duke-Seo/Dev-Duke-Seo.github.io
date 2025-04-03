import React from "react";
import { SidebarProps, FileNode as FileNodeType } from "types";
import { Link } from "react-router-dom";
import * as S from "../styles/components/SidebarStyles";

const categoryDisplayNames: Record<string, string> = {
	introduction: "소개",
	react: "React",
	javascript: "JavaScript",
};

/**
 * 폴더 노드 컴포넌트
 */
const FolderNode: React.FC<{ node: FileNodeType; depth: number }> = ({
	node,
	depth,
}) => {
	const [isOpen, setIsOpen] = React.useState(true);

	if (!node.children || node.children.length === 0) {
		return null;
	}

	return (
		<S.FolderItem depth={depth}>
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
};

/**
 * 파일 노드 컴포넌트
 */
const FileNode: React.FC<{ node: FileNodeType; depth: number }> = ({
	node,
	depth,
}) => {
	if (!node.post) {
		return null;
	}

	return (
		<S.FileItem depth={depth}>
			<Link to={node.post.path}>
				<S.FileIcon>📄</S.FileIcon>
				<S.FileName>{node.name.replace(".md", "")}</S.FileName>
			</Link>
		</S.FileItem>
	);
};

/**
 * 트리 노드 컴포넌트
 */
const TreeNode: React.FC<{ node: FileNodeType; depth: number }> = ({
	node,
	depth,
}) => {
	if (node.type === "directory") {
		return <FolderNode node={node} depth={depth} />;
	} else {
		return <FileNode node={node} depth={depth} />;
	}
};

const Sidebar: React.FC<SidebarProps> = ({ contentTree, isOpen, onToggle }) => {
	return (
		<>
			<S.SidebarContainer isOpen={isOpen}>
				{contentTree && Object.keys(contentTree).length > 0 ? (
					<>
						<S.Title>글 목록</S.Title>
						<S.CategoryList>
							{Object.keys(contentTree).map((category) => (
								<S.CategoryItem key={category}>
									<S.CategoryHeader>
										<S.CategoryName>
											{categoryDisplayNames[category] || category}
										</S.CategoryName>
									</S.CategoryHeader>
									<S.CategoryContent>
										{contentTree[category].map((node) => (
											<TreeNode key={node.path} node={node} depth={0} />
										))}
									</S.CategoryContent>
								</S.CategoryItem>
							))}
						</S.CategoryList>
					</>
				) : (
					<S.EmptyMessage>포스트가 없습니다.</S.EmptyMessage>
				)}
			</S.SidebarContainer>
			<S.ToggleButton onClick={onToggle} isOpen={isOpen}>
				{isOpen ? "◀" : "▶"}
			</S.ToggleButton>
		</>
	);
};

export default Sidebar;
