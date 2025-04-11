import React from "react";
import * as S from "styles/components/SidebarStyles";
import useSidebarStore from "stores/SidebarStore";
import useContentStore from "@/stores/ContentStore";
import TreeNode from "./TreeNode";
import { FileNode } from "types/ContentTree";


const categoryDisplayNames: Record<string, string> = {
	introduction: "소개",
	react: "React",
	javascript: "JavaScript",
};



export default function Sidebar() {
	const { isSidebarOpen, onToggle } = useSidebarStore();
	const { contentTree } = useContentStore();

	return (
		<>
			<S.SidebarContainer $isOpen={isSidebarOpen}>
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
										{contentTree[category].map((node: FileNode) => (
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
			<S.ToggleButton onClick={onToggle} $isOpen={isSidebarOpen}>
				{isSidebarOpen ? "◀" : "▶"}
			</S.ToggleButton>
		</>
	);
}