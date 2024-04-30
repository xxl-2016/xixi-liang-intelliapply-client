import Header from "../../components/Header/Header.js";
import "./HomePage.scss";
import Spline from "@splinetool/react-spline";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function HomePage({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [isExpandedSignUp, setIsExpandedSignUp] = useState(false);
  const [isExpandedLogin, setIsExpandedLogin] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleExpandSignUp = () => {
    setIsExpandedSignUp(!isExpandedSignUp);
    setIsExpandedLogin(false);
  };

  const handleExpandLogin = () => {
    setIsExpandedLogin(!isExpandedLogin);
    setIsExpandedSignUp(false);
  };

  const validateForm = () => {
    if (!username || !email || !password) {
      alert("Please fill out all fields.");
      return false;
    }
    if (username.length < 6) {
      alert("Username must be at least 6 characters long.");
      return false;
    }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch("http://localhost:6060/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("Sign up successful!");
        setIsSignUpSuccess(true);
        setIsUserLoggedIn(true);
      } else {
        const data = await response.json();
        alert(`Sign up failed: ${data.error}`);
        setIsSignUpSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      {isSignUpSuccess && <Navigate to="/login" />}
      <section className="homePage">
        <div className="homePage-hero">
          {isUserLoggedIn ? (
            <div className="homePage-hero__active">
              <Link to="/about-us" className="homePage-hero__active--news">
                ABOUT US
              </Link>
              <div className="homePage-hero__active--user">
                {user && (
                  <button className="homePage-hero__active--user-avatar">
                    <Link to="/profile">{user.username.toUpperCase()}</Link>
                  </button>
                )}
                <button
                  className="homePage-hero__active--user-logout"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    setIsUserLoggedIn(false);
                  }}
                >
                  <Link to="/about-us">LOG OUT</Link>
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/about-us" className="homePage-hero__news">
                ABOUT US
              </Link>
              <Link to="/login" className="homePage-hero__login">
                LOGIN
              </Link>
            </>
          )}
        </div>
        <div className="homePage-hero__job">
          {isUserLoggedIn ? (
            <Link to="/job-list" className="homePage-hero__job--list">
              JOB LIST
            </Link>
          ) : null}
        </div>
        <div className="homePage-click">
          <Spline
            className="homePage-click__network"
            scene="https://prod.spline.design/u5a12k2nXlnDk7Xj/scene.splinecode"
          />
          <div className="homePage-click__sign">
            {isExpandedSignUp ? (
              <input
                type="text"
                className="homePage-click__sign--input"
                placeholder="Sign Up With Your Email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            ) : (
              !isUserLoggedIn && (
                <button
                  className="homePage-click__sign--button"
                  onClick={handleExpandSignUp}
                >
                  SIGN UP
                </button>
              )
            )}
            {isExpandedSignUp && (
              <div className="homePage-click__sign--expanded">
                <input
                  className="homePage-click__sign--expanded-username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleInputChange}
                  value={username}
                />
                <input
                  className="homePage-click__sign--expanded-password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={password}
                />
                <button
                  className="homePage-click__sign--expanded-submit"
                  onClick={handleSignUp}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="homePage-slogan">
          <p className="homePage-slogan__title">01</p>
          <h1 className="homePage-slogan__text">
            Streamlining Your Job Hunt, One Click at a Time.
          </h1>
        </div>

        <div className="homePage-API">
          <ul className="homePage-API__details">
            <li className="homePage-API__details--indeed">Indeed</li>
            <li className="homePage-API__details--glassdoor">Glassdoor</li>
            <li className="homePage-API__details--linkedin">LinkedIn</li>
          </ul>
          <p className="homePage-API__title">02</p>
        </div>
      </section>
    </>
  );
}
