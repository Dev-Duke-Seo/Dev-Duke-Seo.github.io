// src/components/Comments.tsx
import useThemeStore from "@/stores/ThemeStore";
import { useEffect, useRef } from "react";

interface CommentsProps {
	repo: string;
	issueTerm: string;
	label?: string;
	theme?: string;
}

export default function Comments({
	repo,
	issueTerm,
	label = "💬 Comments",
	theme = "preferred-color-scheme",
}: CommentsProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { isDarkMode } = useThemeStore();

	useEffect(() => {
		if (!containerRef.current) return;

		const script = document.createElement("script");
		script.src = "https://utteranc.es/client.js";
		script.setAttribute("repo", repo);
		script.setAttribute("issue-term", issueTerm);
		script.setAttribute("label", label);
		script.setAttribute("theme", isDarkMode ? "github-dark" : "github-light");
		script.setAttribute("crossorigin", "anonymous");
		script.async = true

		containerRef.current.appendChild(script);

		return () => {
			if (containerRef.current) {
				containerRef.current.innerHTML = "";
			}
		};
	}, [repo, issueTerm, label, isDarkMode]);

	return <div ref={containerRef} />;
}
