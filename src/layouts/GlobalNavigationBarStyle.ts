import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: ${({ theme }) => theme.maxWidth};
	margin: 0 auto;
	position: relative;
	padding: 0 1rem;
	
	@media (max-width: 768px) {
		flex-wrap: wrap;
		padding: 1rem;
	}
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
	
	@media (max-width: 768px) {
		font-size: 1.2rem;
	}
`;

export const ToggleButton = styled.a`
	font-size: 1.5rem;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.text};
	text-decoration: none;
	cursor: pointer;
	&:hover {
		color: ${({ theme }) => theme.colors.primary};
		transition: color 0.2s;
		text-decoration: none;
	}
	
	@media (max-width: 768px) {
		font-size: 1.2rem;
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
	
	@media (max-width: 768px) {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}
`;

export const NavLinks = styled.div`
	display: flex;
	gap: 2rem;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	
	@media (max-width: 768px) {
		position: relative;
		left: 0;
		transform: none;
		width: 100%;
		justify-content: space-between;
		margin-top: 1rem;
		gap: 1rem;
	}
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
	
	@media (max-width: 768px) {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
`;