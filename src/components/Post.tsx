import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Post as PostType } from "../types/Post";

import * as S from "./PostStyles";
import { styled } from "styled-components";
import TagList from "./TagList";

// SyntaxHighlighter 대신 Shiki 사용
import { Highlighter } from "shiki";
import { createHighlighter } from "shiki";
import useThemeStore from "@/stores/ThemeStore";

const StyledTagList = styled(TagList)`
	margin: 2rem 0;
`;

interface PostProps {
	post: PostType | null;
}

export default function Post({ post }: PostProps) {
	const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
	const [renderedContent, setRenderedContent] = useState<string>("");

	const { isDarkMode, toggleTheme } = useThemeStore();

	// 다크/라이트 모드 감지
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			toggleTheme();
		};
		
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	// 하이라이터 초기화
	useEffect(() => {
		async function initializeHighlighter() {
			const highlighter = await createHighlighter({
				langs: ['javascript', 'typescript', 'jsx', 'tsx', 'html', 'css', 'json', 'markdown'],
				themes: ['github-dark-dimmed', 'github-light']
			});
			setHighlighter(highlighter);
		}
		
		initializeHighlighter();
	}, []);

	// 포스트 내용 처리
	useEffect(() => {
		if (highlighter && post?.content) {
			// 마크다운 내의 코드 블록 찾기
			const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
			let processedContent = post.content;
			
			// 코드 블록 대체하기
			processedContent = processedContent.replace(codeBlockRegex, (match, lang, code) => {
				try {
					const language = lang || 'text';
					const theme = isDarkMode ? 'github-dark-dimmed' : 'github-light';
					const highlighted = highlighter.codeToHtml(code, {
						lang: language,
						theme: theme
					});
					return highlighted;
				} catch (error) {
					console.error('하이라이팅 오류:', error);
					return match; // 오류 시 원본 코드 블록 유지
				}
			});
			
			setRenderedContent(processedContent);
		}
	}, [highlighter, post?.content, isDarkMode]);

	if (!post) {
		return <S.PostNotFound>작성된 포스트가 없습니다.</S.PostNotFound>;
	}

	const formattedDate = post.date
		? format(post.date, "yyyy년 MM월 dd일", { locale: ko })
		: "작성일 미상";

	return (
		<S.PostContainer>
			<S.PostHeader>
				<S.PostTitle>{post.title}</S.PostTitle>

				{post.date && (
					<S.PostMeta>
						<time dateTime={post.date.toISOString()}>{formattedDate}</time>
					</S.PostMeta>
				)}

				{post.tags && post.tags.length > 0 && (
					<S.PostTags>
						{post.tags.map((tag) => (
							<S.PostTag key={tag.name}>#{tag.name}</S.PostTag>
						))}
					</S.PostTags>
				)}
			</S.PostHeader>

			<S.PostContent>
				{!highlighter ? (
					<div>로딩 중...</div>
				) : (
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
					>
						{renderedContent || post.content}
					</ReactMarkdown>
				)}
			</S.PostContent>
			<StyledTagList />
		</S.PostContainer>
	);
}
