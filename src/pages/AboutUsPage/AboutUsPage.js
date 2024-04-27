import "./AboutUsPage.scss";
import { Link } from "react-router-dom";
import facebook from "../../assets/icons/Icon-facebook.svg";
import twitter from "../../assets/icons/Icon-twitter.svg";
import instagram from "../../assets/icons/Icon-instagram.svg";
import Spline from "@splinetool/react-spline";

export default function AboutUsPage() {
  return (
    <>
      <section className="aboutus">
        <div className="aboutus-network">
          <Spline
            className="aboutus-network__spline"
            scene="https://prod.spline.design/u5a12k2nXlnDk7Xj/scene.splinecode"
          />
        </div>
        <div className="aboutus-thanks">
          <h1 className="aboutus-thanks__text">Thanks for visiting our site</h1>
        </div>
        <div className="aboutus-social">
          <p className="aboutus-social__heading">Follow us on social media:</p>
          <div className="aboutus-social__icons">
            <Link
              to="https://www.facebook.com/"
              className="aboutus-social__icons--facebook"
            >
              <img
                className="aboutus-social__icons--facebook-icon"
                src={facebook}
                alt="facebook"
              />
            </Link>
            <Link
              to="https://www.twitter.com/"
              className="aboutus-social__icons--twitter"
            >
              <img
                className="aboutus-social__icons--twitter-icon"
                src={twitter}
                alt="twitter"
              />
            </Link>
            <Link
              to="https://www.instagram.com/"
              className="aboutus-social__icons--instagram"
            >
              <img
                className="aboutus-social__icons--instagram-icon"
                src={instagram}
                alt="instagram"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
