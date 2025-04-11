import React from "react";
import styled from "styled-components";
import PostList from "../components/PostList";
import useContentStore from "@/stores/ContentStore";

const HomeContainer = styled.div`
	max-width: 100%;
	margin: 0 auto;
`;

const HomeHeader = styled.div`
	text-align: center;
	margin-bottom: 3rem;
	padding: 2rem 1rem;
	background-color: ${({ theme }) => theme.backgroundSub};
	border-radius: 8px;
`;

const Title = styled.h1`
	font-size: 2.5rem;
	color: ${({ theme }) => theme.text};
	margin-bottom: 1rem;
`;

const Subtitle = styled.p`
	font-size: 1.2rem;
	color: ${({ theme }) => theme.textSecondary};
	line-height: 1.6;
`;

const Home: React.FC = () => {
	// 최근 포스트 5개만 가져오기
	const { posts } = useContentStore.getState();
	const recentPosts = posts.slice(0, 5);

	return (
		<HomeContainer>
			<HomeHeader>
				<Title>좋은 동료가 되기위한 성장일지</Title>
				<Subtitle>&quot;오늘의 유행이 내일의 구식.&quot;</Subtitle>
			</HomeHeader>

			<PostList posts={recentPosts} title="최근 포스트" />
		</HomeContainer>
	);
};

export default Home;
