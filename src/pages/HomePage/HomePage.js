import "./HomePage.scss";
import Spline from "@splinetool/react-spline";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import SubScriptionPlan from "../../components/SubscriptionPlan/SubscriptionPlan";
import Hero from "../../components/Hero/Hero";

export default function HomePage({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [isExpandedSignUp, setIsExpandedSignUp] = useState(false);
  const [isExpandedLogin, setIsExpandedLogin] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

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

  return (
    <>
      {isSignUpSuccess && <Navigate to="/login" />}
      <section className="homePage">
        {Hero({ isUserLoggedIn, setIsUserLoggedIn })}
        <div className="homePage-hero__job">
          {isUserLoggedIn ? (
            <Link to="/job-list" className="homePage-hero__job--list">
              Search Jobs
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
                autoComplete="off"
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
                  autoComplete="off"
                />
                <input
                  className="homePage-click__sign--expanded-password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={password}
                  autoComplete="off"
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

        <div className="homePage-AI">
          <p className="homePage-AI__title">03</p>
          <h1 className="homePage-AI__text">
            AI Powered Resume and Cover Letter Builder.
          </h1>
        </div>

        {SubScriptionPlan()}
      </section>
    </>
  );
}
