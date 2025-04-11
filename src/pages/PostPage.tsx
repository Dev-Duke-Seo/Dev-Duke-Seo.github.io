import { useParams } from "react-router-dom";
import styled from "styled-components";
import Post from "../components/Post";
import useContentStore from "../stores/ContentStore";

const PostPageContainer = styled.div`
	max-width: 100%;
	margin: 0 auto;
`;

export default function PostPage() {
	const { posts } = useContentStore();

	const removeContentPath = (path: string) => {
		return path.replace("content/", "");
	};

	const params = useParams();


	const post = posts.find(
		(post) => removeContentPath(post.path) === params["*"]
	);

	return (
		<PostPageContainer>
			{post ? (
				<>
					<Post post={post} />
				</>
			) : (
				<div>포스트를 찾을 수 없습니다.</div>
			)}
		</PostPageContainer>
	);
}
