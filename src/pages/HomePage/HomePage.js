import Header from "../../components/Header/Header.js";
import "./HomePage.scss";
import Spline from "@splinetool/react-spline";

export default function HomePage() {
  return (
    <>
      <section className="homePage">
        <div className="homePage-click">
          <Spline scene="https://prod.spline.design/u5a12k2nXlnDk7Xj/scene.splinecode" />
          <button className="homePage-click__button">Click Me</button>
        </div>
        <div className="homePage-hero">
          <button className="homePage-hero__news">News</button>
          <button className="homePage-hero__login">Login</button>
        </div>

        <div className="homePage-slogan">
          <p className="homePage-slogan__title">01</p>
          <h1 className="homePage-slogan__text">
            Streamlining Your Job Hunt, One Click at a Time.
          </h1>
        </div>

        <div className="homePage-API">
          <p className="homePage-slogan__title">02</p>
          <h1 className="homePage-API__text">Available Job APIs:</h1>
          <ul className="homePage-API__details">
            <li className="homePage-API__details--indeed">Indeed API</li>
            <li className="homePage-API__details--glassdoor">Glassdoor API</li>
            <li className="homePage-API__details--linkedin">LinkedIn API</li>
          </ul>
        </div>
      </section>
    </>
  );
}
