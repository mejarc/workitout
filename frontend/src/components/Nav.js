import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/create-exercise">Add Exercise</Link>
    </nav>
  );
}

export default Nav;
