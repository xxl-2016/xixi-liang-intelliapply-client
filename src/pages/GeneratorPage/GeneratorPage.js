import "./GeneratorPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import SplineNetwork from "../../components/SplineNetwork/SplineNetwork";

export default function GeneratorPage({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [user, setUser] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [coverLetterData, setCoverLetterData] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

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
        const username = userResponse.data.username;
        const jobsResponse = await axios.get(
          `http://localhost:6060/saved?username=${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(jobsResponse.data);
        console.log(jobs);
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
      if (!selectedJobId) {
        console.log("Please select a job.");
        return;
      }

      const coverLetterResponse = await axios.get(
        `http://localhost:6060/cover?username=${user.username}&jobId=${selectedJobId}`,
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

  const handleCheckboxChange = (jobId) => {
    setSelectedJobId(jobId);
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
          <h2 className="generator-cover__heading">
            Generate Cover Letter for Specific Job
          </h2>
          {jobs.map((job) => (
            <div key={job.id} className="generator-cover__job">
              <h3 className="generator-cover__job--title">{job.job_title}</h3>
              <input
                type="checkbox"
                className="generator-cover__job--checkbox"
                checked={selectedJobId === job.id}
                onChange={() => handleCheckboxChange(job.id)}
              />
            </div>
          ))}
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
