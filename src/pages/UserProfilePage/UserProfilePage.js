import "./UserProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/share.png";

export default function UserProfilePage({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
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
      } catch (error) {
        console.error("Error fetching profile:", error);
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

  return (
    <>
      <section className="profile">
        {Hero({ isUserLoggedIn, setIsUserLoggedIn })}
        <div className="profile-user">
          {user ? (
            <>
              <div className="profile-user__heading">
                <Link className="profile-user__heading--link" to="/user-info">
                  Edit Profile
                </Link>
                <Link className="profile-user__heading--link" to="/job-list">
                  Search Jobs
                </Link>
                <h2 className="profile-user__heading--text">
                  {user.username}'s Saved Jobs:
                </h2>
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

              {jobs &&
                jobs.jobs &&
                jobs.jobs.map((job) => (
                  <div key={job.id} className="profile-user__card">
                    <div className="profile-user__card--divider"></div>
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
                        <h3 className="profile-user__card--detail-item-heading">
                          FOLLOW UP
                        </h3>
                        <div className="followup">
                          <h3 className="profile-user__card--detail-item-text">
                            {job.followup}
                          </h3>
                          <button
                            className="profile-user__card--detail-item-heading-increase followup-increase"
                            onClick={() => handleIncrease(job.id, job.followup)}
                          >
                            +
                          </button>
                          <button
                            className="profile-user__card--detail-item-heading-decrease followup-decrease"
                            onClick={() => handleDecrease(job.id, job.followup)}
                          >
                            -
                          </button>
                        </div>
                      </div>
                      <div className="profile-user__card--detail-item">
                        <h3 className="profile-user__card--detail-item-heading location">
                          LOCATION
                        </h3>
                        <h3 className="profile-user__card--detail-item-text location-text">
                          {job.location}
                        </h3>
                      </div>
                      <div className="profile-user__card--detail-item postdate">
                        <h3 className="profile-user__card--detail-item-heading">
                          POST DATE
                        </h3>
                        <h3 className="profile-user__card--detail-item-text postdate-text">
                          {job.post_date}
                        </h3>
                      </div>
                      <div className="profile-user__card--detail-item">
                        <h3 className="profile-user__card--detail-item-heading">
                          APPLIED
                        </h3>
                        <div className="applied">
                          <h3 className="profile-user__card--detail-item-text">
                            {job.applied ? "YES" : "NO"}
                          </h3>
                          <input
                            type="checkbox"
                            className="profile-user__card--detail-item-checkbox"
                            checked={job.applied}
                            onChange={(e) =>
                              handleApply(job.id, e.target.checked)
                            }
                          />
                        </div>
                      </div>
                      <div className="profile-user__card--actions">
                        <Link
                          to={`/job-detail/${job.id}`}
                          className="profile-user__card--actions-link"
                        >
                          <img className="edit-icon" src={editIcon} alt="edit" />
                        </Link>
                        <button
                          className="profile-user__card--actions-delete"
                          onClick={() => handleDelete(job.id)}
                        >
                          <img src={deleteIcon} alt="delete" />
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
