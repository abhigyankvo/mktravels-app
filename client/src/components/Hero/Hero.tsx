import "./hero.scss";
import { Login } from "../index";
import { Link } from "react-router-dom";
//TODO add a scroll indicator

const Hero = () => {
  return (
    <div className="hero">
      <div className="heroNav">
        <div className="navLogo">
          {/*TODO replace with logo */}
          <Link to="/">
            <div className="logo"></div>
          </Link>
        </div>
        <div className="navLinks">
          <li>
            <i className="fi fi-rr-home"></i>
          </li>
          <li>
            <i className="fi fi-rr-layers"></i>
          </li>
          <li>
            <i className="fi fi-rr-heart"></i>
          </li>
          <li>
            <i className="fi fi-rr-comment"></i>
          </li>
        </div>
        {/* add css for profile */}
        <div className="navProfile">
          <Login />
        </div>
      </div>
      <div className="heroContent">
        <h1>The whole world in one place</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, iste
          ipsum? Distinctio molestiae eaque iste.
        </p>
        <button>Our Services</button>
      </div>
      <div className="heroImg"></div>
    </div>
  );
};

export default Hero;
