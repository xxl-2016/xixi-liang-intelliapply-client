import "./UserProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserProfilePage({ setIsUserLoggedIn }) {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log(jobsResponse.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <>Loading user details...</>;
  }

  return (
    <section className="profile-page">
      {user ? (
        <>
          <h2>Welcome back, {user.username}!</h2>
          <p>Email: {user.email}</p>
          <h2>Your Jobs</h2>
          <ul>
            {jobs.jobs.map((job) => (
              <li key={job.id}>
                <p>Job Title: {job.job_title}</p>
                <p>Company: {job.company_name}</p>
                <p>Location: {job.location}</p>
              </li>
            ))}
          </ul>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("authToken");
              setIsUserLoggedIn(false);
            }}
          >
            <Link to="/about-us">LOG OUT</Link>
          </button>
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </section>
  );
}
