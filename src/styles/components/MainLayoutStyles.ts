import styled from "styled-components";

interface ContainerProps {
	sidebarOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
	min-height: 100vh;
	background-color: ${({ theme }) => theme.colors.background};
	color: ${({ theme }) => theme.colors.text};
	margin-left: ${(props) =>
		props.sidebarOpen ? "250px" : "0"}; // 사이드바 상태에 따라 마진 조정
	transition: margin-left 0.3s ease;
	display: flex;
	flex-direction: column;
`;

export const Header = styled.header`
	padding: 1rem 2rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	background-color: ${({ theme }) => theme.colors.background};
	position: sticky;
	top: 0;
	z-index: 100;
`;

export const Main = styled.main`
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
	flex: 1;
	width: 100%;
`;

export const Footer = styled.footer`
	text-align: center;
	padding: 1rem;
	border-top: 1px solid ${({ theme }) => theme.colors.border};
	background-color: ${({ theme }) => theme.colors.background};
	margin-top: auto;
`;

export const AlignNavAndPage = styled.div`
	display: flex;
	justify-content: flex-start;
	flex: 1;
`;
