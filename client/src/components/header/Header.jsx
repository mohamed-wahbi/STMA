import React, { useState } from "react";
import '../header/style.css'
import HeaderLeft from "./HeaderLeft";
import NavBar from "./NavBar";
import HeaderRight from "./HeaderRight";
import Search from "./Search";

const Header = ({aEntreprise}) => {
  const [toggel, setToggle] = useState(false);
  

  

  return (
    <div>
      <header className="header">

        <HeaderLeft toggel={toggel} setToggle={setToggle} aEntreprise={aEntreprise} />

        <Search/>

        <NavBar toggel={toggel} setToggle={setToggle} aEntreprise={aEntreprise} />

        <HeaderRight aEntreprise={aEntreprise} />

      </header>
    </div>
  );
};

export default Header;
