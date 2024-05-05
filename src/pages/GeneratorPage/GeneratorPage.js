import "./GeneratorPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import SplineNetwork from "../../components/SplineNetwork/SplineNetwork";

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
      {Hero({ isUserLoggedIn, setIsUserLoggedIn })}
      {SplineNetwork()}
      <div className="generator">
        <div className="generator-resume">
          <button className="generator-resume__button" onClick={handleResume}>
            Resume Generator
          </button>
          {showResume && resumeData && (
            <div className="generator-resume__content">
              <pre className="generator-resumme__content--detail">
                {resumeData}
              </pre>
            </div>
          )}
        </div>
        <div className="generator-cover">
          <button
            className="generator-cover__button"
            onClick={handleCoverLetter}
          >
            Cover Letter Generator
          </button>
          {showCoverLetter && coverLetterData && (
            <div className="generator-cover__content">
              <pre className="generator-cover__content--detail">
                {coverLetterData}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
