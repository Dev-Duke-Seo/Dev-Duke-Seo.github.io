import React, { useState, useEffect } from "react";
import * as S from "./GlobalNavigationBarStyle";
import useThemeStore from "stores/ThemeStore";
import useSidebarStore from "@/stores/SidebarStore";

export default function GlobalNavigationBar() {
	const { isDarkMode, toggleTheme } = useThemeStore();
	const { isSidebarOpen, onToggle } = useSidebarStore();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	
	return (
		<S.Nav>
			<S.Logo to="/">Dev.Duke</S.Logo>
			{isMobile && (
				<S.ThemeToggle onClick={toggleTheme}>
					{isDarkMode ? "🌙" : "🌞"}
				</S.ThemeToggle>
			)}
			<S.NavLinks>
				<S.StyledLink to="/">Home</S.StyledLink>
				<S.StyledLink to="/about">About</S.StyledLink>
				<S.ToggleButton onClick={() => {
					onToggle();
				}}>Posts</S.ToggleButton>
				<S.StyledLink to="/tags">Tags</S.StyledLink>
				{/* <S.StyledLink to="/blog">Posts</S.StyledLink> */}
			</S.NavLinks>
			{!isMobile && (
				<S.ThemeToggle onClick={toggleTheme}>
					{isDarkMode ? "🌙" : "🌞"}
				</S.ThemeToggle>
			)}
		</S.Nav>
	);
}
