import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import PostPage from './pages/PostPage';
import TagsPage from './pages/TagsPage';
import TagPostsPage from './pages/TagPostsPage';

export default function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/content/*" element={<PostPage />} />
      <Route path="/tags" element={<TagsPage />} />
      <Route path="/tags/:tagName" element={<TagPostsPage />} />
    </Routes>
  );
}