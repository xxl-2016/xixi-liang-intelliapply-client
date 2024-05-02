import "./UserProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserProfilePage({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

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
        const jobsResponse = await axios.get(
          `http://localhost:6060/saved/${userResponse.data.username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobs(jobsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [refresh]);

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:6060/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Job deleted successfully");
      setRefresh(refresh + 1);
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  const handleApply = async (jobId, checked) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:6060/jobs/${jobId}`,
        { applied: checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefresh(refresh + 1);
    } catch (error) {
      console.error("Error applying to job:", error);
    }
  };

  const handleIncrease = async (jobId, followupNumber) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:6060/jobs/${jobId}`,
        { followup: followupNumber + 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefresh(refresh + 1);
    } catch (error) {
      console.error("Error increasing followup:", error);
    }
  };

  const handleDecrease = async (jobId, followupNumber) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:6060/jobs/${jobId}`,
        { followup: followupNumber - 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefresh(refresh + 1);
    } catch (error) {
      console.error("Error decreasing followup:", error);
    }
  };

  if (loading) {
    return <>Loading user details...</>;
  }

  return (
    <>
      <section className="profile">
        <div className="profile-hero">
          {isUserLoggedIn ? (
            <div className="profile-hero__active">
              <Link to="/about-us" className="profile-hero__active--news">
                ABOUT US
              </Link>
              <img
                src="#"
                alt="Avatar"
                className="profile-hero__active--avatar"
              />
              <button
                className="profile-hero__active--logout"
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
              <Link to="/about-us" className="profile-hero__news">
                ABOUT US
              </Link>
              <button
                className="profile-hero__logout"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setIsUserLoggedIn(false);
                }}
              >
                <Link to="/about-us">LOG OUT</Link>
              </button>
            </>
          )}
        </div>
        <div className="profile-user">
          {user ? (
            <>
              <div className="profile-user__heading">
                <h2>Every effort counts, {user.username}!</h2>
                <h2>Saved Jobs</h2>
              </div>

              <div className="profile-user__sort">
                <h3 className="profile-user__sort--heading">JOB TITLE</h3>
                <h3 className="profile-user__sort--heading">COMPANY</h3>
                <h3 className="profile-user__sort--heading">FOLLOW UP</h3>
                <h3 className="profile-user__sort--heading">LOCATION</h3>
                <h3 className="profile-user__sort--heading">POSTED DATE</h3>
                <h3 className="profile-user__sort--heading">APPLIED</h3>
                <h3 className="profile-user__sort--actions">ACTIONS</h3>
              </div>

              {jobs.jobs.map((job) => (
                <div key={job.id} className="profile-user__card">
                  <div className="profile-user__card--detail">
                    <div className="profile-user__card--detail-item">
                      <h3 className="profile-user__card--detail-item-heading">
                        JOB TITLE
                      </h3>
                      <h3 className="profile-user__card--detail-item-text">
                        {job.job_title}
                      </h3>
                    </div>
                    <div className="profile-user__card--detail-item">
                      <h3 className="profile-user__card--detail-item-heading">
                        COMPANY NAME
                      </h3>
                      <h3 className="profile-user__card--detail-item-text">
                        {job.company_name}
                      </h3>
                    </div>
                    <div className="profile-user__card--detail-item">
                      <h3 className="profile-user__card--detail-item-headingheading">
                        FOLLOW UP
                      </h3>
                      <h3 className="profile-user__card--detail-item-text">
                        {job.followup}
                      </h3>
                      <button
                        className="profile-user__card--detail-item-heading-increase"
                        onClick={() => handleIncrease(job.id, job.followup)}
                      >
                        +
                      </button>
                      <button
                        className="profile-user__card--detail-item-heading-decrease"
                        onClick={() => handleDecrease(job.id, job.followup)}
                      >
                        -
                      </button>
                    </div>
                    <div className="profile-user__card--detail-item">
                      <h3 className="profile-user__card--detail-item-heading">
                        LOCATION
                      </h3>
                      <h3 className="profile-user__card--detail-item-text">
                        {job.location}
                      </h3>
                    </div>
                    <div className="profile-user__card--detail-item">
                      <h3 className="profile-user__card--detail-item-heading">
                        POST DATE
                      </h3>
                      <h3 className="profile-user__card--detail-item-text">
                        {job.post_date}
                      </h3>
                    </div>
                    <div className="profile-user__card--detail-item">
                      <h3 className="profile-user__card--detail-item-heading">
                        APPLIED
                      </h3>
                      <h3 className="profile-user__card--detail-item-text">
                        {job.applied ? "YES" : "NO"}
                      </h3>
                      <input
                        type="checkbox"
                        className="profile-user__card--detail-item-checkbox"
                        checked={job.applied}
                        onChange={(e) => handleApply(job.id, e.target.checked)}
                      />
                    </div>
                    <div className="profile-user__card--actions">
                      <Link
                        to={`/job/${job.id}`}
                        className="profile-user__card--actions-link"
                      >
                        VIEW
                      </Link>
                      <button
                        className="profile-user__card--actions-delete"
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
      </section>
    </>
  );
}
