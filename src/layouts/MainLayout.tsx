import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import { getContentTree } from "data/postLoader";
import * as S from "../styles/components/MainLayoutStyles";
import GlobalNavigationBar from "./GlobalNavigationBar";

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const contentTree = getContentTree();

	return (
		<S.Container sidebarOpen={isSidebarOpen}>
			<S.Header>
				<GlobalNavigationBar />
			</S.Header>
			<Sidebar contentTree={contentTree} isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
			<S.Main>
				{children}
			</S.Main>
			<S.Footer>
				© {new Date().getFullYear()} Blog by Duke. All rights reserved.
			</S.Footer>
		</S.Container>
	);
};

export default MainLayout;
