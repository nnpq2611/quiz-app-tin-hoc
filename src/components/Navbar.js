import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-bar">
      <h1 className="header">Quizz App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create-test">Create Test</Link>
      </nav>
    </div>
  );
};

export default Navbar;
