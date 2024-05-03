import "./UserInfoPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserInfoPage({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [user, setUser] = useState(null);
  const [infoResponse, setInfoResponse] = useState(null);
  const [resumeData, setResumeData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    skills: "",
    experience: [{ title: "", company: "", start_date: "", end_date: "" }],
    education: [{ degree: "", university: "", graduation_year: "" }],
    certifications: [{ name: "", issued_by: "", year: "" }],
  });
  const [refresh, setRefresh] = useState(0);

  const handleChange = (e, index, category) => {
    const { name, value } = e.target;
    const updatedData = { ...resumeData };
    if (index !== null) {
      updatedData[category][index][name] = value;
    } else {
      updatedData[name] = value;
    }
    setResumeData(updatedData);
  };

  const handleAddItem = (category) => {
    setResumeData({
      ...resumeData,
      [category]: [...resumeData[category], {}],
    });
  };

  const handleRemoveItem = (index, category) => {
    const updatedData = { ...resumeData };
    updatedData[category].splice(index, 1);
    setResumeData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, ...userData } = resumeData;
      const response = await axios.post("http://localhost:6060/info", {
        username: user.username,
        email: user.email,
        ...userData,
      });
      setResumeData({
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        skills: "",
        experience: [{ title: "", company: "", start_date: "", end_date: "" }],
        education: [{ degree: "", university: "", graduation_year: "" }],
        certifications: [{ name: "", issued_by: "", year: "" }],
      });
      alert("Personal Info recorded successfully");
      setRefresh(refresh + 1);
    } catch (error) {
      console.error("Error adding resume data:", error);
    }
  };

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

        const infoResponse = await axios.get(
          `http://localhost:6060/info/${userResponse.data.username}`
        );
        if (infoResponse.data) {
          setInfoResponse(infoResponse.data);
        } else {
          setInfoResponse(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [refresh]);

  return (
    <>
      <div className="info-hero">
        {isUserLoggedIn ? (
          <div className="info-hero__active">
            <Link to="/about-us" className="info-hero__active--news">
              ABOUT US
            </Link>
            <div className="info-hero__active--user">
              {user && (
                <button className="info-hero__active--user-avatar">
                  <Link to="/profile">{user.username.toUpperCase()}</Link>
                </button>
              )}
              <button
                className="info-hero__active--user-logout"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setIsUserLoggedIn(false);
                }}
              >
                <Link to="/about-us">LOG OUT</Link>
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/about-us" className="info-hero__news">
              ABOUT US
            </Link>
            <Link to="/login" className="info-hero__login">
              LOGIN
            </Link>
          </>
        )}
      </div>
      <div className="info-input">
        {infoResponse ? (
          <>
            <h1>{infoResponse.firstName}</h1>
            <h1>{infoResponse.lastName}</h1>
            <h1>{infoResponse.address}</h1>
            <h1>{infoResponse.email}</h1>
            <h1>{infoResponse.location}</h1>
          </>
        ) : (
          <>
            <h1>Please enter your personal info</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={resumeData.firstName}
                onChange={(e) => handleChange(e, null, "firstName")}
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={resumeData.lastName}
                onChange={(e) => handleChange(e, null, "lastName")}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={resumeData.address}
                onChange={(e) => handleChange(e, null, "address")}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={resumeData.phone}
                onChange={(e) => handleChange(e, null, "phone")}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={resumeData.location}
                onChange={(e) => handleChange(e, null, "location")}
              />
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn"
                value={resumeData.linkedin}
                onChange={(e) => handleChange(e, null, "linkedin")}
              />
              <input
                type="text"
                name="github"
                placeholder="GitHub"
                value={resumeData.github}
                onChange={(e) => handleChange(e, null, "github")}
              />
              <input
                type="text"
                name="portfolio"
                placeholder="Portfolio"
                value={resumeData.portfolio}
                onChange={(e) => handleChange(e, null, "portfolio")}
              />
              <input
                type="text"
                name="skills"
                placeholder="Skills"
                value={resumeData.skills}
                onChange={(e) => handleChange(e, null, "skills")}
              />
              {resumeData.experience.map((exp, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) => handleChange(e, index, "experience")}
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleChange(e, index, "experience")}
                  />
                  <input
                    type="date"
                    name="start_date"
                    placeholder="Start Date"
                    value={exp.start_date}
                    onChange={(e) => handleChange(e, index, "experience")}
                  />
                  <input
                    type="date"
                    name="end_date"
                    placeholder="End Date"
                    value={exp.end_date}
                    onChange={(e) => handleChange(e, index, "experience")}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index, "experience")}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddItem("experience")}>
                Add Work Experience
              </button>

              {resumeData.education.map((edu, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="degree"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleChange(e, index, "education")}
                  />
                  <input
                    type="text"
                    name="university"
                    placeholder="University"
                    value={edu.university}
                    onChange={(e) => handleChange(e, index, "education")}
                  />
                  <input
                    type="text"
                    name="graduation_year"
                    placeholder="Graduation Year"
                    value={edu.graduation_year}
                    onChange={(e) => handleChange(e, index, "education")}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index, "education")}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddItem("education")}>
                Add Education
              </button>

              {resumeData.certifications.map((cert, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleChange(e, index, "certifications")}
                  />
                  <input
                    type="text"
                    name="issued_by"
                    placeholder="Issued By"
                    value={cert.issued_by}
                    onChange={(e) => handleChange(e, index, "certifications")}
                  />
                  <input
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={cert.year}
                    onChange={(e) => handleChange(e, index, "certifications")}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index, "certifications")}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem("certifications")}
              >
                Add Certification
              </button>

              <button type="submit">Submit</button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
