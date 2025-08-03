import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Feed from '../pages/Feed';
import AddPostForm from '../pages/AddPost'
import Header from '../components/Header';

export default function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={<AddPostForm />} />
      </Routes>
    </Router>
  );
}