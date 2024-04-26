import "./Header.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/intelliapply-logo.png";

export default function Header() {
  const [activePage, setActivePage] = useState("homePage");

  const handlePage = (PageName) => {
    setActivePage(PageName);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img className="header-logo__img" src={logo} alt="logo" />
        </Link>
      </div>
    </header>
  );
}
