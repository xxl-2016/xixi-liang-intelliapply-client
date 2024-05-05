import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobDetailPage.scss";
import { Link, useParams } from "react-router-dom";
import Hero from "../../components/Hero/Hero";

export default function JobDetailPage({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // localStorage.removeItem("jobDetail");
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
    <>
      {Hero({ isUserLoggedIn, setIsUserLoggedIn })}
      <div className="detail">
        <Link to="/job-list" className="detail-link">
          Back to job list
        </Link>
        <div className="detail-info">
          {job ? (
            <>
              <h1 className="detail-info__heading">{job.title}</h1>
              <h2 className="detail-info__subheading">Job State:</h2>
              <p className="detail-info__text">{job.state}</p>
              <h2 className="detail-info__subheading">Type:</h2>
              <p className="detail-info__text">{job.type}</p>
              <h2 className="detail-info__subheading">Applies:</h2>
              <p className="detail-info__text">{job.applies}</p>
              <h2 className="detail-info__subheading">Views:</h2>
              <p className="detail-info__text">{job.views}</p>
              <h2 className="detail-info__subheading">Workplace:</h2>
              <p className="detail-info__text">{job.workPlace}</p>
              <h2 className="detail-info__subheading">Location:</h2>
              <p className="detail-info__text">{job.location}</p>
              <Link className="detail-info__link" to={job.url}>View</Link>
              <h2 className="detail-info__subheading">Company Name:</h2>
              <p className="detail-info__text">{job.company.name}</p>
              <h2 className="detail-info__subheading">Industries:</h2>
              <p className="detail-info__text">{job.company.industries}</p>
              <h2 className="detail-info__subheading">Description:</h2>
              <p className="detail-info__text">{job.company.description}</p>
              <h2 className="detail-info__subheading">Skills:</h2>
              <p className="detail-info__text">{job.skills}</p>
            </>
          ) : (
            <p className="detail-info__loading">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
