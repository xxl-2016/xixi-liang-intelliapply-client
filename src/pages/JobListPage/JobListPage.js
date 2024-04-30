import React, { useState } from "react";
import axios from "axios";
import "./JobListPage.scss";
import { Link } from "react-router-dom";
import saveIcon from "../../assets/icons/folder.png";

export default function JobSearch({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [keywords, setKeywords] = useState("");
  const [jobList, setJobList] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:6060/jobs", {
        params: {
          keywords: keywords || "developer",
        },
      });
      setJobList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="jobs">
        <div className="jobs-hero">
          {isUserLoggedIn ? (
            <div className="jobs-hero__active">
              <Link to="/about-us" className="jobs-hero__active--news">
                ABOUT US
              </Link>
              <img src="#" alt="Avatar" className="jobs-hero__active--avatar" />
              <button
                className="jobs-hero__active--logout"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setIsUserLoggedIn(false);
                }}
              >
                LOG OUT
              </button>
            </div>
          ) : (
            <>
              <Link to="/about-us" className="jobs-hero__news">
                ABOUT US
              </Link>
              <Link to="/login" className="jobs-hero__login">
                LOGIN
              </Link>
            </>
          )}
        </div>

        <div className="jobs-search">
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords"
            className="jobs-search__input"
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
                    to={job.url}
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
                <button className="jobs-card__detail--button-save">
                  <img
                    className="jobs-card__detail--button-save-img"
                    src={saveIcon}
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
