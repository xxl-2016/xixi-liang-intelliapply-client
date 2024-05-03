import "./GeneratorPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function GeneratorPage({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [user, setUser] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [coverLetterData, setCoverLetterData] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userResponse = await axios.get("http://localhost:6060/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  const handleResume = async () => {
    try {
      const resumeResponse = await axios.get(
        `http://localhost:6060/resume?username=${user.username}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const content = resumeResponse.data.candidates[0].content.parts[0].text;
      setResumeData(content);
      setShowResume(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCoverLetter = async () => {
    try {
      const coverLetterResponse = await axios.get(
        `http://localhost:6060/cover?username=${user.username}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const coverLetterContent =
        coverLetterResponse.data.candidates[0].content.parts[0].text;
      setCoverLetterData(coverLetterContent);
      setShowCoverLetter(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="generator-hero">
        {isUserLoggedIn ? (
          <div className="generator-hero__active">
            <Link to="/about-us" className="generator-hero__active--news">
              ABOUT US
            </Link>
            <div className="generator-hero__active--user">
              {user && (
                <button className="generator-hero__active--user-avatar">
                  <Link to="/profile">{user.username.toUpperCase()}</Link>
                </button>
              )}
              <button
                className="generator-hero__active--user-logout"
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
            <Link to="/about-us" className="generator-hero__news">
              ABOUT US
            </Link>
            <Link to="/login" className="generator-hero__login">
              LOGIN
            </Link>
          </>
        )}
      </div>
      <div>
        <h1>Resume Generator</h1>
        <button onClick={handleResume}>Generate</button>
        {showResume && resumeData && (
          <div className="resume-content">
            <pre>{resumeData}</pre>
          </div>
        )}
      </div>
      <div>
        <h1>Cover Letter Generator</h1>
        <button onClick={handleCoverLetter}>Generate</button>
        {showCoverLetter && coverLetterData && (
          <div className="cover-letter-content">
            <pre>{coverLetterData}</pre>
          </div>
        )}
      </div>
    </>
  );
}
