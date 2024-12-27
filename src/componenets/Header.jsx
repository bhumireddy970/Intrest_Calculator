import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate("/history");
  };
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="main-header">
      <h1>
        <u>వడ్డీ లెక్కలు</u>
      </h1>
      <div className="header-container">
        <button className=" history" onClick={handleHistoryClick}>
          History
        </button>
        <button className="history" onClick={handleHomeClick}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Header;
