import "./Hero.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Hero({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get("http://localhost:6060/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }
  }, []);

  return (
    <>
      <div className="hero">
        {isUserLoggedIn ? (
          <div className="hero__active">
            <Link to="/about-us" className="hero__active--news">
              ABOUT US
            </Link>
            <div className="hero__active--user">
              {user && (
                <button className="hero__active--user-avatar">
                  <Link to="/profile">{user.username.toUpperCase()}</Link>
                </button>
              )}
              <button
                className="hero__active--user-logout"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("jobList");
                  localStorage.removeItem("jobDetail");
                  setIsUserLoggedIn(false);
                  alert("Log out successfully");
                }}
              >
                <Link
                  className="hero__active--user-logout-button"
                  to="/about-us"
                >
                  LOG OUT
                </Link>
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/about-us" className="hero__news">
              ABOUT US
            </Link>
            <Link to="/login" className="hero__login">
              LOGIN
            </Link>
          </>
        )}
      </div>
    </>
  );
}
