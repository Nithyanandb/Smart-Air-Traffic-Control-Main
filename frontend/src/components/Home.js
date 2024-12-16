import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Home_bottom from './Home_bottom';
import Nav_Bar from "./Nav_Bar";

function Home() {
  return (
    <div className="fly-high">
     <Nav_Bar/>
      <Home_bottom/>

    </div>
  );
}

export default Home;