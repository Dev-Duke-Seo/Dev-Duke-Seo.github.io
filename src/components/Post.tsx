import React from "react";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import "highlight.js/styles/github-dark.css";
import { Post as PostType } from "../types/Post";

import {
	PostContainer,
	PostHeader,
	PostTitle,
	PostMeta,
	PostTags,
	PostTag,
	PostContent,
	PostNotFound,
} from "../styles/components/PostStyles";
import { styled } from "styled-components";
import TagList from "./TagList";

const StyledTagList = styled(TagList)`
	margin: 2rem 0;
`;

// 타입 선언 추가
interface CodeProps {
	node?: any;
	inline?: boolean;
	className?: string;
	children?: React.ReactNode;
	[key: string]: any; // 추가 props에 대한 인덱스 시그니처
}
interface PostProps {
	post: PostType | null;
}

export default function Post({ post }: PostProps) {
	if (!post) {
		return <PostNotFound>작성된 포스트가 없습니다.</PostNotFound>;
	}

	const formattedDate = post.date
		? format(post.date, "yyyy년 MM월 dd일", { locale: ko })
		: "작성일 미상";

	return (
		<PostContainer>
			<PostHeader>
				<PostTitle>{post.title}</PostTitle>

				{post.date && (
					<PostMeta>
						<time dateTime={post.date.toISOString()}>{formattedDate}</time>
					</PostMeta>
				)}

				{post.tags && post.tags.length > 0 && (
					<PostTags>
						{post.tags.map((tag) => (
							<PostTag key={tag.name}>#{tag.name}</PostTag>
						))}
					</PostTags>
				)}
			</PostHeader>

			<PostContent>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw, rehypeHighlight]}
					components={{
						code: function Code(props: CodeProps) {
							const { inline, className, children, ...rest } = props;
							// console.log(className);
							const match = /language-(\w+)/.exec(className || "");
							return !inline && match ? (
								<SyntaxHighlighter
									language={match[1]}
									PreTag="pre"
									style={darcula}
									className="markdown"
									customStyle={{
										padding: "1rem",
										margin: "0",
										backgroundColor: "transparent",
									}}
									{...rest}
								>
									{String(children).replace(/\n$/, "")}
								</SyntaxHighlighter>
							) : (
								<code className={className} {...rest}>
									{children}
								</code>
							);
						},
					}}
				>
					{post.content}
				</ReactMarkdown>
			</PostContent>
			<StyledTagList />
		</PostContainer>
	);
}
