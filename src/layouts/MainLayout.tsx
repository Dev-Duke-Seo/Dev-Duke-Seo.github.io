import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import * as S from "styles/components/MainLayoutStyles";
import GlobalNavigationBar from "./GlobalNavigationBar";
import useSidebarStore from "stores/SidebarStore";
import ApiLimitModal from "components/ApiLimitModal";

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	// const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const { isSidebarOpen } = useSidebarStore();
	return (
		<S.Container $sidebarOpen={isSidebarOpen}>
			<S.Header>
				<GlobalNavigationBar />
			</S.Header>
			<Sidebar />
			<S.Main>
				{children}
			</S.Main>
			<S.Footer>
				© {new Date().getFullYear()} Blog by Duke. All rights reserved.
			</S.Footer>
			<ApiLimitModal />
		</S.Container>
	);
};

export default MainLayout;
