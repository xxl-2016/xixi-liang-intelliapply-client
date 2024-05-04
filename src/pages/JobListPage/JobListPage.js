import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobListPage.scss";
import { Link } from "react-router-dom";
import saveIcon from "../../assets/icons/bookmark.png";
import savedIcon from "../../assets/icons/bookmark-2.png";
import Hero from "../../components/Hero/Hero";

export default function JobSearch({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [keywords, setKeywords] = useState("");
  const [jobList, setJobList] = useState([]);
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSearch = async () => {
    try {
      localStorage.removeItem("jobList");
      const response = await axios.get("http://localhost:6060/jobs", {
        params: {
          keywords: keywords || "developer",
        },
      });
      const updatedJobList = response.data.data.map((job) => ({
        ...job,
        saved: false,
      }));
      localStorage.setItem("jobList", JSON.stringify(updatedJobList));
      setRefresh(refresh + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedJobList = JSON.parse(localStorage.getItem("jobList"));
    if (storedJobList) {
      setJobList(storedJobList);
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
  }, [refresh]);

  const handleSaveJob = async (job) => {
    try {
      const response = await axios.post("http://localhost:6060/jobs", {
        id: job.id,
        username: user.username,
        job_title: job.title,
        company_name: job.company.name,
        location: job.location,
        applied: false,
        followup: 0,
        post_date: job.postDate || "No Data",
      });
      alert("Job saved successfully");
      setJobList((prevJobList) =>
        prevJobList.map((j) => (j.id === job.id ? { ...j, saved: true } : j))
      );
      console.log("Saved job:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveButtonClick = (job) => {
    if (job.saved) {
      handleDelete(job);
    } else {
      handleSaveJob(job);
    }
  };

  const handleDelete = async (job) => {
    try {
      await axios.delete(`http://localhost:6060/jobs/${job.id}`);
      const updatedJobList = jobList.map((j) =>
        j.id === job.id ? { ...j, saved: false } : j
      );
      setJobList(updatedJobList);
      console.log("Removed saved job:", job.title);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="jobs">
        {Hero({ isUserLoggedIn, setIsUserLoggedIn })}
        <div className="jobs-search">
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords"
            className="jobs-search__input"
            autoComplete="off"
          />
          <button className="jobs-search__button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="jobs-sort">
          <h3 className="jobs-sort__heading">JOB TITLE</h3>
          <h3 className="jobs-sort__heading">COMPANY</h3>
          <h3 className="jobs-sort__heading">TYPE</h3>
          <h3 className="jobs-sort__heading">LOCATION</h3>
          <h3 className="jobs-sort__heading">POSTED DATE</h3>
          <h3 className="jobs-sort__actions">ACTIONS</h3>
        </div>

        {jobList.map((job) => (
          <div key={job.id} className="jobs-card">
            <div className="jobs-card__divider"></div>
            <div className="jobs-card__detail">
              <div className="jobs-card__detail--item">
                <div className="jobs-card__detail--item-heading">
                  <h3 className="jobs-card__detail--item-heading-text">
                    JOB TITLE
                  </h3>
                  <Link
                    to={`/job-detail/${job.id}`}
                    className="jobs-card__detail--item-heading-info"
                  >
                    {job.title}
                  </Link>
                </div>
                <div className="jobs-card__detail--item-heading">
                  <h3 className="jobs-card__detail--item-heading-text">
                    COMPANY NAME
                  </h3>
                  <h4 className="jobs-card__detail--item-heading-company">
                    {job.company.name}
                  </h4>
                </div>
              </div>

              <div className="jobs-card__detail--type">
                <div className="jobs-card__detail--type-heading">
                  <h3 className="jobs-card__detail--type-heading-text">TYPE</h3>
                  <h4 className="jobs-card__detail--type-heading-info">
                    {job.type}
                  </h4>
                </div>
                <div className="jobs-card__detail--location-heading">
                  <h3 className="jobs-card__detail--location-heading-text">
                    LOCATION
                  </h3>
                  <h4 className="jobs-card__detail--location-heading-info">
                    {job.location}
                  </h4>
                </div>
              </div>

              <div className="jobs-card__detail--button">
                <div className="jobs-card__detail--button-heading">
                  <h3 className="jobs-card__detail--button-heading-text">
                    POST DATE
                  </h3>
                  <h4 className="jobs-card__detail--button-heading-info">
                    {job.postDate}
                  </h4>
                </div>
                <button
                  className="jobs-card__detail--button-save"
                  onClick={() => handleSaveButtonClick(job)}
                >
                  <img
                    className="jobs-card__detail--button-save-img"
                    src={job.saved ? savedIcon : saveIcon}
                    alt="save"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
