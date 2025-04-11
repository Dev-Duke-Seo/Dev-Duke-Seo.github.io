import React from "react";
import * as S from "./GlobalNavigationBarStyle";
import useThemeStore from "stores/ThemeStore";
import useSidebarStore from "@/stores/SidebarStore";

export default function GlobalNavigationBar() {
	const { isDarkMode, toggleTheme } = useThemeStore();
	const { isSidebarOpen, onToggle } = useSidebarStore();
	return (
		<S.Nav>
			<S.Logo to="/">Dev.Duke</S.Logo>
			<S.NavLinks>
				<S.StyledLink to="/">Home</S.StyledLink>
				<S.StyledLink to="/about">About</S.StyledLink>
				<S.ToggleButton onClick={() => {
					onToggle();
				}}>Blogs</S.ToggleButton>
				<S.StyledLink to="/tags">Tags</S.StyledLink>
				{/* <S.StyledLink to="/blog">Posts</S.StyledLink> */}
			</S.NavLinks>
			<S.ThemeToggle onClick={toggleTheme}>
				{isDarkMode ? "🌙" : "🌞"}
			</S.ThemeToggle>
		</S.Nav>
	);
}
