import Header from "../../components/Header/Header.js";
import "./HomePage.scss";
import Spline from "@splinetool/react-spline";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isExpandedSignUp, setIsExpandedSignUp] = useState(false);
  const [isExpandedLogin, setIsExpandedLogin] = useState(false);

  const handleExpandSignUp = () => {
    setIsExpandedSignUp(!isExpandedSignUp);
    setIsExpandedLogin(false);
  };

  const handleExpandLogin = () => {
    setIsExpandedLogin(!isExpandedLogin);
    setIsExpandedSignUp(false);
  };

  return (
    <>
      <section className="homePage">
        <div className="homePage-hero">
          <Link to="/about-us" className="homePage-hero__news">
            ABOUT US
          </Link>
          <Link to="/login" className="homePage-hero__login">
            LOGIN
          </Link>
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
              />
            ) : (
              <button
                className="homePage-click__sign--button"
                onClick={handleExpandSignUp}
              >
                SIGN UP
              </button>
            )}
            {isExpandedSignUp && (
              <div className="homePage-click__sign--expanded">
                <input
                  className="homePage-click__sign--expanded-username"
                  type="text"
                  placeholder="Username"
                />
                <input
                  className="homePage-click__sign--expanded-password"
                  type="password"
                  placeholder="Password"
                />
                <button className="homePage-click__sign--expanded-submit">
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
