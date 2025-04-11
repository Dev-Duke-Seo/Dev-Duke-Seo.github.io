import styled from "styled-components";

export const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
`;

export const Title = styled.h2`
	font-size: 1.8rem;
	margin-bottom: 1.5rem;
	color: ${({ theme }) => theme.colors.text};
	padding-bottom: 0.5rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const Item = styled.li`
	border-radius: 6px;
	overflow: hidden;
	transition: transform 0.3s, box-shadow 0.3s;

	&:hover {
		transform: translateY(-3px);
	}
`;

export const Card = styled.article`
	background: ${({ theme }) =>
		theme.darkMode
			? `radial-gradient(
			ellipse at right top,
			rgba(0, 236, 157, 0.56) 0%,
			#151419 45%,
			#151419 100%
		)`
			: `radial-gradient(
			ellipse at right top,
			rgba(74, 107, 255, 0.3) 0%, 
			rgba(106, 139, 255, 0.2) 25%,
			${theme.colors.backgroundSub} 50%,
			${theme.colors.backgroundSub} 100%
		)`};

	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 8px;
	padding: 1.5rem;
	transition: box-shadow 0.3s;
	position: relative;
	overflow: hidden;

	/* &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    border-radius: 0 8px 0 100%;
    pointer-events: none;
  } */
	&::before {
		position: absolute;
		content: "";
		top: 0;
		width: 101%;
		height: 1000%;
		border-radius: 20.25rem;
		z-index: -1;
		border: 155rem solid transparent;
		-webkit-mask: linear-gradient(#fff 0 0) padding-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: destination-out;
		mask-composite: exclude;
		background: ${({ theme }) =>
			theme.darkMode
				? `linear-gradient(
				45deg,
				#11ff2c,
				#00ff0d,
				#21e40f,
				#370bcb,
				#1890ff
			) border-box`
				: `linear-gradient(
				45deg,
				#4a6bff,
				#6b8bff,
				#8ea7ff,
				#4a6bff,
				#0c45ff
			) border-box`};
	}
	${Item}:hover & {
		box-shadow: 0 10px 20px
			${({ theme }) =>
				theme.darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"};

		&::before {
			background: ${({ theme }) =>
				theme.darkMode
					? `linear-gradient(
					45deg,
					#00ff0d,
					#11ff2c,
					#00ec9d,
					#00b4ff,
					#370bcb
				) border-box`
					: `linear-gradient(
					45deg,
					#1854ff,
					#4a6bff,
					#90b0ff,
					#6b8bff,
					#1844ff
				) border-box
				 `};
		}
	}

	@media (max-width: 768px) {
		padding: 1rem;
	}
`;

export const CardTitle = styled.h3`
	font-size: 1.4rem;
	margin-bottom: 0.8rem;
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.3;

	@media (max-width: 768px) {
		font-size: 1.2rem;
	}
`;

export const CardDescription = styled.p`
	color: ${({ theme }) => theme.colors.textLight};
	margin-bottom: 1rem;
	font-size: 0.95rem;
	line-height: 1.5;
`;

export const CardMeta = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	font-size: 0.85rem;
	color: ${({ theme }) => theme.colors.textLight};

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 0.5rem;
	}
`;

export const CardDate = styled.time`
	font-weight: 500;
`;

export const CardTags = styled.div`
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
`;

export const CardTag = styled.span`
	background-color: ${({ theme }) => (theme.darkMode ? "#333333" : "#f1f5f9")};
	color: ${({ theme }) => (theme.darkMode ? "#b3b3b3" : "#4a5568")};
	padding: 0.2rem 0.5rem;
	border-radius: 20px;
	font-size: 0.75rem;
`;

export const EmptyMessage = styled.div`
	text-align: center;
	padding: 3rem 0;
	color: ${({ theme }) => theme.colors.textLight};

	h2 {
		margin-bottom: 1rem;
	}
`;
