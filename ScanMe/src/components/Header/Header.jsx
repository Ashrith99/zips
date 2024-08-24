import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons/icons";
import "./Header.css";
import Hambermenuoptions from "../Hambermenuoptions/Hambermenuoptions";

function Header({ onSearchChange, isMenu, isAddpage }) {
  const navigate = useNavigate();
  const [option, setOption] = useState(false);
  const [greeting, setGreeting] = useState("");
  const handleMenuoption = () => {
    setOption(true);
  };

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("good afternoon");
    } else {
      setGreeting("good evening");
    }
  }, []);

  return (
    <>
      {option && <Hambermenuoptions setopt={setOption} />}
      <div className="header">
        <img
          src={icons.menuicon}
          alt="Menu"
          onClick={handleMenuoption}
          className="menu-icon"
          style={{ opacity: option ? 0 : 1 }}
        />
        {isAddpage ? (
          <img
            src={icons.home_icon}
            onClick={() => navigate("/")}
            alt="Filter"
            className="home-icon"
          />
        ) : (
          <img
            src={icons.pallet_icon}
            onClick={() => navigate("/added-items")}
            alt="Filter"
            className="pallet-icon"
          />
        )}
      </div>
      {isAddpage || isMenu ? (
        <></>
      ) : (
        <>
          <div className="welcome">
            <h2>
              Hello, {greeting}!{" "}
              {/* <span role="img" aria-label="Wave">
                👋
              </span> */}
            </h2>
          </div>
          <div className="wrap-input-17">
            <div className="search-box">
              <button className="btn-search">🔍</button>
              <input
                onChange={onSearchChange}
                type="text"
                className="input-search"
                placeholder="Search..."
              />
            </div>
          </div>
        </>
      )}
      
    </>
  );
}

export default Header;
