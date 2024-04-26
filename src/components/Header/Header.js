import "./Header.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [activePage, setActivePage] = useState("homePage");

  const handlePage = (PageName) => {
    setActivePage(PageName);
  };

  return (
    <header>
      <div className="header">
        <Link className="Header-title" to="/">
          IntelliApply Pro
        </Link>
      </div>
    </header>
  );
}
