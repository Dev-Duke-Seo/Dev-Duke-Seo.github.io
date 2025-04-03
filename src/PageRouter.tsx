import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import PostPage from "./pages/PostPage";


interface Route {
  path: string;
  element: React.ReactNode;
}

const pageRoutes: Route[] = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/blog/:category/*", element: <PostPage /> },
];


const PageRouter = () => {
  return (
    <Routes>
      {pageRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default PageRouter;