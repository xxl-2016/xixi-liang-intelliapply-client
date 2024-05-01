import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import HomePage from "./pages/HomePage/HomePage.js";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.js";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage.js";
import JobListPage from "./pages/JobListPage/JobListPage.js";
import JobDetailpage from "./pages/JobDetailPage/JobDetailPage.js";
import "./App.scss";

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isUserLoggedIn={isUserLoggedIn}
                  setIsUserLoggedIn={setIsUserLoggedIn}
                />
              }
            />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route
              path="/login"
              element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
            {isUserLoggedIn ? (
              <Route
                path="/profile"
                element={
                  <UserProfilePage setIsUserLoggedIn={setIsUserLoggedIn} />
                }
              />
            ) : null}
            {isUserLoggedIn ? (
              <Route
                path="/job-list"
                element={
                  <JobListPage
                    isUserLoggedIn={isUserLoggedIn}
                    setIsUserLoggedIn={setIsUserLoggedIn}
                  />
                }
              />
            ) : null}
            <Route
              path="/job-detail/:id"
              element={
                <JobDetailpage
                  isUserLoggedIn={isUserLoggedIn}
                  setIsUserLoggedIn={setIsUserLoggedIn}
                />
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}
