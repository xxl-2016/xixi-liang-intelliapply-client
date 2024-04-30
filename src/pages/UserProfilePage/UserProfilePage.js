import "./UserProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserProfilePage({ setIsUserLoggedIn }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:6060/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    };
    fetchProfile();
  }, []);

  if (!user) {
    return <>Loading user details...</>;
  }

  return (
    <section className="profile-page">
      <h2>Welcome back, {user.username}!</h2>
      <p>Email {user.email}</p>
      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("authToken");
          setIsUserLoggedIn(false);
        }}
      >
        <Link to="/about-us">LOG OUT</Link>
      </button>
    </section>
  );
}
