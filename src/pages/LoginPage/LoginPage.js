import "./LoginPage.scss";
import axios from "axios";

export default function LoginPage({ setIsUserLoggedIn }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    console.log(username, password);

    try {
      const response = await axios.post("http://localhost:6060/login", {
        username: username,
        password: password,
      });
      console.log(response);

      localStorage.setItem("authToken", response.data);
      setIsUserLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <section className="login-page">
        <form className="login-page__form" onSubmit={handleSubmit}>
          <input
            className="login-page__form--username"
            type="text"
            placeholder="Username or Email"
          />
          <input
            className="login-page__form--password"
            type="password"
            placeholder="Password"
          />
          <button className="login-page__form--submit">Submit</button>
        </form>
      </section>
    </>
  );
}
