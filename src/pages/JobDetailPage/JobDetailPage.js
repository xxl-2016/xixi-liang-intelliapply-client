import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobDetailPage.scss";
import { Link, useParams } from "react-router-dom";

export default function JobDetailPage({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    localStorage.removeItem("jobDetail");
    const storedJobDetail = JSON.parse(localStorage.getItem("jobDetail"));
    if (storedJobDetail) {
      setJob(storedJobDetail.data);
    }
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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:6060/jobs/${id}`);
        setJob(response.data.data);
        localStorage.setItem("jobDetail", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, []);

  return (
    <div className="JobDetailPage">
      <Link to="/job-list" className="back-link">
        Back to job list
      </Link>
      {job ? (
        <>
          <h1>{job.title}</h1>
          <h2>{job.state}</h2>
          <p>{job.type}</p>
          <p>{job.applies}</p>
          <p>{job.views}</p>
          <p>{job.workPlace}</p>
          <h2>{job.location}</h2>
          <Link to={job.url}>View</Link>
          <h2>{job.company.name}</h2>
          <p>{job.company.industries}</p>
          <p>{job.company.description}</p>
          <p>{job.location}</p>
          <p>{job.description}</p>
          <p>{job.skills}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
