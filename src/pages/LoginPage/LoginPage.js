import "./LoginPage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setIsUserLoggedIn }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post("http://localhost:6060/auth", {
        username: username,
        password: password,
      });
      const authToken = response.data;
      const token = authToken.access_token;
      localStorage.setItem("authToken", token);
      setIsUserLoggedIn(true);
      navigate('/profile');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        alert("Username or password is incorrect");
      }
    }
  };
  return (
    <>
      <section className="login-page">
        <form className="login-page__form" onSubmit={handleSubmit}>
          <input
            className="login-page__form--username"
            type="text"
            name="username"
            placeholder="Username or Email"
          />
          <input
            className="login-page__form--password"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button className="login-page__form--submit">Submit</button>
        </form>
      </section>
    </>
  );
}
