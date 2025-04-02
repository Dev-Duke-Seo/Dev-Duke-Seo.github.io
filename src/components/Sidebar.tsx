import React from "react";
import { SidebarProps } from "../types";
import * as S from "../styles/components/SidebarStyles";
import PostList from "./PostList";

const categoryDisplayNames: Record<string, string> = {
	introduction: "소개",
	react: "React",
	javascript: "JavaScript",
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
									<PostList posts={contentTree[category]} />
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

