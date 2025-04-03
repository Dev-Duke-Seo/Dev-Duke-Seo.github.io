import { Post, ContentTree } from "../types";
import { getLoadedPosts } from "./postLoader";
import { getMarkdownContent, parseMarkdown } from "../utils/githubLoader";

// 카테고리별 트리 구조 생성
export function getContentTree(): ContentTree {
	const tree: ContentTree = {};
	const allPosts = getLoadedPosts();

	allPosts.forEach((post) => {
		const { category } = post;

		if (!tree[category]) {
			tree[category] = [];
		}

		// Post를 FileNode로 변환하여 추가
		tree[category].push({
			name: `${post.slug}.md`,
			path: post.path,
			type: 'file',
			post
		});
	});

	return tree;
}

// 모든 포스트 반환
export function getAllPosts(): Post[] {
	return getLoadedPosts();
}

// 특정 포스트 반환
export function getPost(category: string, slug: string): Post | undefined {
	const allPosts = getLoadedPosts();
	return allPosts.find(
		(post) => post.category === category && post.slug === slug
	);
}

// 특정 포스트의 내용을 로드
export async function loadPostContent(post: Post): Promise<Post> {
	// 이미 내용이 로드된 경우
	if (post.contentLoaded) {
		return post;
	}

	// GitHub에서 마크다운 내용 가져오기
	const content = await getMarkdownContent(post.path.replace('/blog/', '') + '.md');
	
	if (!content) {
		// 내용을 가져올 수 없는 경우
		return {
			...post,
			content: "내용을 불러올 수 없습니다.",
			contentLoaded: true,
		};
	}

	// 마크다운 파싱
	const { metadata, content: markdownContent } = parseMarkdown(content);

	// 메타데이터로 포스트 정보 업데이트
	return {
		...post,
		title: metadata.title || post.title,
		description: metadata.description || post.description,
		createdAt: metadata.date || post.createdAt,
		tags: Array.isArray(metadata.tags) 
			? metadata.tags 
			: (metadata.tags ? metadata.tags.split(',').map((tag: string) => tag.trim()) : []),
		content: markdownContent,
		contentLoaded: true,
	};
}

// HTML로 변환된 콘텐츠 반환
export async function getPostWithHtml(
	category: string,
	slug: string
): Promise<Post | null> {
	const post = getPost(category, slug);
	if (!post) return null;

	// 내용이 로드되지 않은 경우 먼저 로드
	let fullPost = post;
	if (!post.contentLoaded) {
		fullPost = await loadPostContent(post);
		
		// 로드된 포스트 정보 업데이트
		const allPosts = getLoadedPosts();
		const index = allPosts.findIndex(p => p.category === category && p.slug === slug);
		if (index !== -1) {
			allPosts[index] = fullPost;
		}
	}

	// 마크다운 -> HTML 변환
	const htmlContent = fullPost.content
		.replace(/\n\n/g, "</p><p>")
		.replace(/\n/g, "<br />")
		.replace(
			/`{3}jsx([\s\S]*?)`{3}/g,
			'<pre><code class="language-jsx">$1</code></pre>'
		)
		.replace(
			/`{3}javascript([\s\S]*?)`{3}/g,
			'<pre><code class="language-javascript">$1</code></pre>'
		)
		.replace(/`([^`]+)`/g, "<code>$1</code>");

	return {
		...fullPost,
		htmlContent: `<p>${htmlContent}</p>`,
	};
}
