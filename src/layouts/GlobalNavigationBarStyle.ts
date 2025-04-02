import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: ${({ theme }) => theme.maxWidth};
	margin: 0 auto;
	position: relative;
`;


export const StyledLink = styled(Link)`
	font-size: 1.5rem;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.text};
	text-decoration: none;
	&:hover {
		color: ${({ theme }) => theme.colors.primary};
		transition: color 0.2s;
		text-decoration: none;
	}
`;


export const Logo = styled(StyledLink)`
	letter-spacing: 0;
	font-size: 4rem;
	font-weight: 800;
	// dark mode일떄만 Filter적용 
	filter: ${({ theme }) => theme.darkMode ? `drop-shadow(0 0 10px ${theme.colors.primary})` : 'none'};
	&:hover {
		transform: scale(1.05);
		transition: transform 0.2s ease;
	}
`;

export const NavLinks = styled.div`
	display: flex;
	gap: 2rem;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
`;

export const ThemeToggle = styled.button`
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	padding: 0.5rem;
	border-radius: 50%;
	transition: background-color 0.2s;
	&:hover {
		background-color: ${({ theme }) => theme.colors.secondary};
	}
`;