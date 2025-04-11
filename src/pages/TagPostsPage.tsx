import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import useContentStore from "@/stores/ContentStore";
import PostList from "@/components/PostList";

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem;
`;

const Header = styled.div`
	margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
	color: ${(props) => props.theme.textSecondary};
	text-decoration: none;
	display: inline-flex;
	align-items: center;
	margin-bottom: 1rem;

	&:hover {
		color: ${(props) => props.theme.primary};
	}

	&::before {
		content: "←";
		margin-right: 0.5rem;
	}
`;

const Title = styled.h1`
	font-size: 2rem;
	color: ${(props) => props.theme.textPrimary};
	margin: 0;
`;

export default function TagPostsPage() {
	const { tagName } = useParams();
	const { allTags } = useContentStore();

	const tag = allTags.find((t) => t.name === tagName);

	if (!tag) {
		return (
			<Container>
				<Header>
					<BackLink to="/tags">태그 목록으로</BackLink>
					<Title>태그를 찾을 수 없습니다</Title>
				</Header>
			</Container>
		);
	}

	return (
		<Container>
			<Header>
				<BackLink to="/tags">태그 목록으로</BackLink>
				<Title>#{tag.name}</Title>
			</Header>
			<PostList
				title={`${tag.name} 태그의 포스트 (${tag.posts.length})`}
				posts={tag.posts}
			/>
		</Container>
	);
}
