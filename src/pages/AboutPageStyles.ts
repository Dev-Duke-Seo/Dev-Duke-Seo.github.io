import styled, { css } from "styled-components";

export const ContentContainer = styled.div`
	max-width: ${({ theme }) => theme.maxWidth};
	margin: 0 auto;
	padding: 4rem 2rem;
	display: flex;
	flex-direction: column;
`;

export const Title = styled.h1`
	font-size: 3.2rem;
	color: ${(props) => props.theme.colors.text};
	margin-bottom: 4rem;
	text-align: end;

	@media (max-width: 768px) {
		text-align: start;
	}
`;

export const SectionContainer = styled.div`
	display: grid;
	grid-template-columns: 300px 1fr;
	gap: 4rem;
	margin-bottom: 4rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 2rem;
	}
`;

export const SectionTitle = styled.h2`
	font-size: 2.4rem;
	color: ${(props) => props.theme.colors.text};
	position: relative;
	padding-bottom: 1rem;
	text-align: end;

	@media (max-width: 768px) {
		text-align: start;
	}

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 40px;
		height: 3px;
		border-radius: 2px;
	}
`;

export const SectionContent = styled.div<{ alignReverse?: boolean }>`
	color: ${(props) => props.theme.colors.textLight};
	font-size: 1.6rem;
	line-height: 1.8;

	${({ alignReverse }) =>
		alignReverse &&
		css`
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			@media (max-width: 768px) {
				justify-content: center;
			}
		`}
`;

export const ProfileImage = styled.div`
	width: 200px;
	height: 200px;
	overflow: hidden;
	border: 3px solid ${(props) => props.theme.colors.border};
	box-shadow: 0 0 15rem rgba(0, 0, 0, 0.5);
	position: relative;
	border-radius: 50%;
	margin-bottom: 2rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const SkillList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;

	li {
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;

		&::before {
			content: "•";
			margin-right: 1rem;
			color: ${(props) => props.theme.colors.primary};
			font-size: 1.8rem;
		}

		strong {
			color: ${(props) => props.theme.colors.textLight};
			font-weight: 600;
			margin-right: 0.5rem;
			min-width: 100px;
			position: relative;

			&::after {
				content: ":";
				position: absolute;
				right: 0;
				color: ${(props) => props.theme.colors.textLight};
			}
		}
	}
`;

export const ContactLink = styled.a`
	color: ${(props) => props.theme.colors.primary};
	text-decoration: none;
	transition: color 0.2s ease;

	&:hover {
		color: ${(props) => props.theme.colors.textLight};
	}
`;

export const BadgeContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 100%;
`;

export const BadgeCategory = styled.h3`
	font-size: 1.8rem;
	color: ${(props) => props.theme.colors.textLight};
	margin-bottom: 1rem;
`;

export const BadgeGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.8rem;
	
	img {
		height: 2.2rem;
		transition: transform 0.2s;
		
		&:hover {
			transform: translateY(-3px);
		}
	}
`;

export const TechStackContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
`;

export const MainCategory = styled.h2`
	font-size: 2.2rem;
	font-weight: 700;
	color: ${(props) => props.theme.colors.textLight};
	margin-top: 2.5rem;
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const SubCategory = styled.h3`
	font-size: 1.6rem;
	font-weight: 600;
	color: ${(props) => props.theme.colors.textLight};
	margin: 1rem 0 0.5rem ;
	position: relative;	
`;

export const Quote = styled.h1`
	font-size: 30px;
	font-weight: bold;
	color: ${(props) => props.theme.colors.text};
`;
