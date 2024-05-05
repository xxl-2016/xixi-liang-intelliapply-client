import "./UserInfoPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";

export default function UserInfoPage({ isUserLoggedIn, setIsUserLoggedIn }) {
  const [user, setUser] = useState(null);
  const [infoResponse, setInfoResponse] = useState(null);
  const [editing, setEditing] = useState(false);
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

  const handleEditPut = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const updatedFields = Object.keys(resumeData).reduce((acc, key) => {
        if (resumeData[key]) {
          acc[key] = resumeData[key];
        }
        return acc;
      }, {});
      const response = await axios.put(
        `http://localhost:6060/info/${user.username}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Personal Info updated successfully");
      setEditing(false);
      setRefresh(refresh + 1);
    } catch (error) {
      console.error("Error updating personal info:", error);
    }
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

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
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
      {Hero({ isUserLoggedIn, setIsUserLoggedIn })}
      <section className="info">
        <div className="info-AI">
          <Link className="info-AI__link" to="/generator">
            AI-powered Generator
          </Link>
        </div>
        <div className="info-input">
          {infoResponse ? (
            <>
              {editing ? (
                <>
                  <h1 className="info-input__heading">
                    Please enter your personal info:
                  </h1>
                  <form className="info-input__form" onSubmit={handleEditPut}>
                    <input
                      type="text"
                      name="firstName"
                      className="info-input__form--input"
                      placeholder="First Name"
                      value={resumeData.firstName}
                      onChange={(e) => handleChange(e, null, "firstName")}
                    />

                    <input
                      type="text"
                      name="lastName"
                      className="info-input__form--input"
                      placeholder="Last Name"
                      value={resumeData.lastName}
                      onChange={(e) => handleChange(e, null, "lastName")}
                    />
                    <input
                      type="text"
                      name="address"
                      className="info-input__form--input"
                      placeholder="Address"
                      value={resumeData.address}
                      onChange={(e) => handleChange(e, null, "address")}
                    />
                    <input
                      type="text"
                      name="phone"
                      className="info-input__form--input"
                      placeholder="Phone"
                      value={resumeData.phone}
                      onChange={(e) => handleChange(e, null, "phone")}
                    />
                    <input
                      type="text"
                      name="location"
                      className="info-input__form--input"
                      placeholder="Location"
                      value={resumeData.location}
                      onChange={(e) => handleChange(e, null, "location")}
                    />
                    <input
                      type="text"
                      name="linkedin"
                      className="info-input__form--input"
                      placeholder="LinkedIn"
                      value={resumeData.linkedin}
                      onChange={(e) => handleChange(e, null, "linkedin")}
                    />
                    <input
                      type="text"
                      name="github"
                      className="info-input__form--input"
                      placeholder="GitHub"
                      value={resumeData.github}
                      onChange={(e) => handleChange(e, null, "github")}
                    />
                    <input
                      type="text"
                      name="portfolio"
                      className="info-input__form--input"
                      placeholder="Portfolio"
                      value={resumeData.portfolio}
                      onChange={(e) => handleChange(e, null, "portfolio")}
                    />
                    <input
                      type="text"
                      name="skills"
                      className="info-input__form--input"
                      placeholder="Skills"
                      value={resumeData.skills}
                      onChange={(e) => handleChange(e, null, "skills")}
                    />
                    {resumeData.experience.map((exp, index) => (
                      <div className="experience" key={index}>
                        <input
                          type="text"
                          name="title"
                          className="info-input__form--input"
                          placeholder="Title"
                          value={exp.title}
                          onChange={(e) => handleChange(e, index, "experience")}
                        />
                        <input
                          type="text"
                          name="company"
                          className="info-input__form--input"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => handleChange(e, index, "experience")}
                        />
                        <input
                          type="date"
                          name="start_date"
                          className="info-input__form--input"
                          placeholder="Start Date"
                          value={exp.start_date}
                          onChange={(e) => handleChange(e, index, "experience")}
                        />
                        <input
                          type="date"
                          name="end_date"
                          className="info-input__form--input"
                          placeholder="End Date"
                          value={exp.end_date}
                          onChange={(e) => handleChange(e, index, "experience")}
                        />
                        <button
                          className="info-input__form--input-button remove"
                          type="button"
                          onClick={() => handleRemoveItem(index, "experience")}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      className="info-input__form--input-button add"
                      type="button"
                      onClick={() => handleAddItem("experience")}
                    >
                      Add Work Experience
                    </button>

                    {resumeData.education.map((edu, index) => (
                      <div className="education" key={index}>
                        <input
                          type="text"
                          name="degree"
                          className="info-input__form--input"
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => handleChange(e, index, "education")}
                        />
                        <input
                          type="text"
                          name="university"
                          className="info-input__form--input"
                          placeholder="University"
                          value={edu.university}
                          onChange={(e) => handleChange(e, index, "education")}
                        />
                        <input
                          type="text"
                          name="graduation_year"
                          className="info-input__form--input"
                          placeholder="Graduation Year"
                          value={edu.graduation_year}
                          onChange={(e) => handleChange(e, index, "education")}
                        />
                        <button
                          className="info-input__form--input-button remove"
                          type="button"
                          onClick={() => handleRemoveItem(index, "education")}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      className="info-input__form--input-button add"
                      type="button"
                      onClick={() => handleAddItem("education")}
                    >
                      Add Education
                    </button>

                    {resumeData.certifications.map((cert, index) => (
                      <div className="cert" key={index}>
                        <input
                          type="text"
                          name="name"
                          className="info-input__form--input"
                          placeholder="Certification Name"
                          value={cert.name}
                          onChange={(e) =>
                            handleChange(e, index, "certifications")
                          }
                        />
                        <input
                          type="text"
                          name="issued_by"
                          className="info-input__form--input"
                          placeholder="Issued By"
                          value={cert.issued_by}
                          onChange={(e) =>
                            handleChange(e, index, "certifications")
                          }
                        />
                        <input
                          type="text"
                          name="year"
                          className="info-input__form--input"
                          placeholder="Year"
                          value={cert.year}
                          onChange={(e) =>
                            handleChange(e, index, "certifications")
                          }
                        />
                        <button
                          className="info-input__form--input-button remove"
                          type="button"
                          onClick={() =>
                            handleRemoveItem(index, "certifications")
                          }
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="cert-button">
                      <button
                        className="info-input__form--input-button cert-add"
                        type="button"
                        onClick={() => handleAddItem("certifications")}
                      >
                        Add Certification
                      </button>
                    </div>

                    <div className="submit">
                      <button
                        className="info-input__button cancel"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      <button className="info-AI" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h1 className="info-input__heading">
                    {infoResponse.username}'s Personal Info
                  </h1>
                  <h2 className="info-input__subheading">First Name:</h2>
                  <p className="info-input__text">{infoResponse.first_name}</p>
                  <h2 className="info-input__subheading">Last Name:</h2>
                  <p className="info-input__text">{infoResponse.last_name}</p>
                  <h2 className="info-input__subheading">Address:</h2>
                  <p className="info-input__text">{infoResponse.address}</p>
                  <h2 className="info-input__subheading">Phone:</h2>
                  <p className="info-input__text">{infoResponse.phone}</p>
                  <h2 className="info-input__subheading">Location:</h2>
                  <p className="info-input__text">{infoResponse.location}</p>
                  <h2 className="info-input__subheading">LinkedIn:</h2>
                  <p className="info-input__text">{infoResponse.linkedin}</p>
                  <h2 className="info-input__subheading">GitHub:</h2>
                  <p className="info-input__text">{infoResponse.github}</p>
                  <h2 className="info-input__subheading">Portfolio:</h2>
                  <p className="info-input__text">{infoResponse.portfolio}</p>
                  <h2 className="info-input__subheading">Skills:</h2>
                  <p className="info-input__text">{infoResponse.skills}</p>
                  <h2 className="info-input__subheading">Work Experience:</h2>
                  {infoResponse.experience.map((exp, index) => (
                    <div key={index}>
                      <p className="info-input__text">{exp.title}</p>
                      <p className="info-input__text">{exp.company}</p>
                      <p className="info-input__text">{exp.start_date}</p>
                      <p className="info-input__text">{exp.end_date}</p>
                    </div>
                  ))}
                  <h2 className="info-input__subheading">Education:</h2>
                  {infoResponse.education.map((edu, index) => (
                    <div key={index}>
                      <p className="info-input__text">{edu.degree}</p>
                      <p className="info-input__text">{edu.university}</p>
                      <p className="info-input__text">{edu.graduation_year}</p>
                    </div>
                  ))}
                  <h2 className="info-input__subheading">Certifications:</h2>
                  {infoResponse.certifications.map((cert, index) => (
                    <div key={index}>
                      <p className="info-input__text">{cert.name}</p>
                      <p className="info-input__text">{cert.issued_by}</p>
                      <p className="info-input__text">{cert.year}</p>
                    </div>
                  ))}
                  <button className="info-input__button" onClick={handleEdit}>
                    Edit
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <h1 className="info-input__heading">
                Please enter your personal info:
              </h1>
              <form className="info-input__form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="firstName"
                  className="info-input__form--input"
                  placeholder="First Name"
                  value={resumeData.firstName}
                  onChange={(e) => handleChange(e, null, "firstName")}
                />

                <input
                  type="text"
                  name="lastName"
                  className="info-input__form--input"
                  placeholder="Last Name"
                  value={resumeData.lastName}
                  onChange={(e) => handleChange(e, null, "lastName")}
                />
                <input
                  type="text"
                  name="address"
                  className="info-input__form--input"
                  placeholder="Address"
                  value={resumeData.address}
                  onChange={(e) => handleChange(e, null, "address")}
                />
                <input
                  type="text"
                  name="phone"
                  className="info-input__form--input"
                  placeholder="Phone"
                  value={resumeData.phone}
                  onChange={(e) => handleChange(e, null, "phone")}
                />
                <input
                  type="text"
                  name="location"
                  className="info-input__form--input"
                  placeholder="Location"
                  value={resumeData.location}
                  onChange={(e) => handleChange(e, null, "location")}
                />
                <input
                  type="text"
                  name="linkedin"
                  className="info-input__form--input"
                  placeholder="LinkedIn"
                  value={resumeData.linkedin}
                  onChange={(e) => handleChange(e, null, "linkedin")}
                />
                <input
                  type="text"
                  name="github"
                  className="info-input__form--input"
                  placeholder="GitHub"
                  value={resumeData.github}
                  onChange={(e) => handleChange(e, null, "github")}
                />
                <input
                  type="text"
                  name="portfolio"
                  className="info-input__form--input"
                  placeholder="Portfolio"
                  value={resumeData.portfolio}
                  onChange={(e) => handleChange(e, null, "portfolio")}
                />
                <input
                  type="text"
                  name="skills"
                  className="info-input__form--input"
                  placeholder="Skills"
                  value={resumeData.skills}
                  onChange={(e) => handleChange(e, null, "skills")}
                />
                {resumeData.experience.map((exp, index) => (
                  <div className="experience" key={index}>
                    <input
                      type="text"
                      name="title"
                      className="info-input__form--input"
                      placeholder="Title"
                      value={exp.title}
                      onChange={(e) => handleChange(e, index, "experience")}
                    />
                    <input
                      type="text"
                      name="company"
                      className="info-input__form--input"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleChange(e, index, "experience")}
                    />
                    <input
                      type="date"
                      name="start_date"
                      className="info-input__form--input"
                      placeholder="Start Date"
                      value={exp.start_date}
                      onChange={(e) => handleChange(e, index, "experience")}
                    />
                    <input
                      type="date"
                      name="end_date"
                      className="info-input__form--input"
                      placeholder="End Date"
                      value={exp.end_date}
                      onChange={(e) => handleChange(e, index, "experience")}
                    />
                    <button
                      className="info-input__form--input-button remove"
                      type="button"
                      onClick={() => handleRemoveItem(index, "experience")}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className="info-input__form--input-button add"
                  type="button"
                  onClick={() => handleAddItem("experience")}
                >
                  Add Work Experience
                </button>

                {resumeData.education.map((edu, index) => (
                  <div className="education" key={index}>
                    <input
                      type="text"
                      name="degree"
                      className="info-input__form--input"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleChange(e, index, "education")}
                    />
                    <input
                      type="text"
                      name="university"
                      className="info-input__form--input"
                      placeholder="University"
                      value={edu.university}
                      onChange={(e) => handleChange(e, index, "education")}
                    />
                    <input
                      type="text"
                      name="graduation_year"
                      className="info-input__form--input"
                      placeholder="Graduation Year"
                      value={edu.graduation_year}
                      onChange={(e) => handleChange(e, index, "education")}
                    />
                    <button
                      className="info-input__form--input-button remove"
                      type="button"
                      onClick={() => handleRemoveItem(index, "education")}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className="info-input__form--input-button add"
                  type="button"
                  onClick={() => handleAddItem("education")}
                >
                  Add Education
                </button>

                {resumeData.certifications.map((cert, index) => (
                  <div className="cert" key={index}>
                    <input
                      type="text"
                      name="name"
                      className="info-input__form--input"
                      placeholder="Certification Name"
                      value={cert.name}
                      onChange={(e) => handleChange(e, index, "certifications")}
                    />
                    <input
                      type="text"
                      name="issued_by"
                      className="info-input__form--input"
                      placeholder="Issued By"
                      value={cert.issued_by}
                      onChange={(e) => handleChange(e, index, "certifications")}
                    />
                    <input
                      type="text"
                      name="year"
                      className="info-input__form--input"
                      placeholder="Year"
                      value={cert.year}
                      onChange={(e) => handleChange(e, index, "certifications")}
                    />
                    <button
                      className="info-input__form--input-button remove"
                      type="button"
                      onClick={() => handleRemoveItem(index, "certifications")}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="cert-button">
                  <button
                    className="info-input__form--input-button cert-add"
                    type="button"
                    onClick={() => handleAddItem("certifications")}
                  >
                    Add Certification
                  </button>
                </div>

                <div className="submit">
                  <button className="info-AI" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}
