import React from 'react';
import { Link, useLocation } from 'react-router-dom';


export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="app-header">
      <Link to="/" className="logo">BloodConnect</Link>

      <nav>
        <Link to="/">Feed</Link>
        <Link to="/add">Post Request</Link>
        {pathname !== '/login' && <Link to="/login">Login</Link>}
        {pathname !== '/signup' && <Link to="/signup">Signup</Link>}
      </nav>
    </header>
  );
}