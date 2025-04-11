import { styled } from "styled-components";

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
  justify-content: flex-start;
`;

interface TagItemProps {
	$active: boolean;
}

export const TagItem = styled.button<TagItemProps>`
	background-color: ${(props) =>
		props.$active ? props.theme.primary : props.theme.backgroundSecondary};
	color: ${(props) =>
		props.$active ? props.theme.textLight : props.theme.textSecondary};
	border: none;
	border-radius: 16px;
	padding: 4px 12px;
	font-size: 14px;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background-color: ${(props) =>
			props.$active ? props.theme.primaryDark : props.theme.backgroundTertiary};
		transform: translateY(-1px);
	}
`;
