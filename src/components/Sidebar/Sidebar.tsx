import React, { useCallback } from "react";
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
	const { isSidebarOpen, width, onToggle, setWidth } = useSidebarStore();
	const { contentTree } = useContentStore();

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		
		const startDragging = (e: MouseEvent) => {
			setWidth(e.clientX);
		};
		
		const stopDragging = () => {
			document.removeEventListener('mousemove', startDragging);
			document.removeEventListener('mouseup', stopDragging);
		};
		
		document.addEventListener('mousemove', startDragging);
		document.addEventListener('mouseup', stopDragging);
	}, [setWidth]);

	return (
		<>
			<S.SidebarContainer $isOpen={isSidebarOpen} style={{ width: isSidebarOpen ? width : 0 }}>
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
			<S.Resizer 
				$isOpen={isSidebarOpen} 
				onMouseDown={handleMouseDown} 
				style={{ left: isSidebarOpen ? `${width}px` : '0' }} 
			/>
			<S.ToggleButton onClick={onToggle} $isOpen={isSidebarOpen} style={{ left: isSidebarOpen ? width : 0 }}>
				{isSidebarOpen ? "◀" : "▶"}
			</S.ToggleButton>
		</>
	);
}