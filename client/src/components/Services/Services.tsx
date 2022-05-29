import { Link } from "react-router-dom";
import "./services.scss";
import { EventType } from "../../interfaces";
import { ReactComponent as Curve3 } from "../../assets/svg/curve3.svg";
import { ReactComponent as Purple } from "../../assets/svg/purple-circle.svg";
import { ReactComponent as Gray } from "../../assets/svg/gray-circle.svg";
import { ReactComponent as Orange } from "../../assets/svg/orange-circle.svg";
import { ReactComponent as OrangeLine } from "../../assets/svg/orange-line.svg";
import { ReactComponent as PurpleLLine } from "../../assets/svg/purpleL-line.svg";
import { ReactComponent as GrayLine } from "../../assets/svg/gray-line.svg";

const Services = () => {
  return (
    <div className="services">
      <div className="servicesContent">
        <div>
          <h1>Our Services</h1>
          <h3>Choose a category</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            distinctio laudantium voluptas labore ex dolores omnis numquam eum
            nihil deserunt.
          </p>
        </div>
      </div>
      <div className="servicesCat">
        <Link to="/service/tourism" className="cat one">
          <div className="float1">
            <Curve3 />
            <GrayLine />
            <OrangeLine />
          </div>
          <div className="item">
            <h2>Tourism</h2>
            <p>It's a big world out there. Let's Explore! </p>
          </div>
        </Link>
        <Link to="/service/once" className="cat two">
          <div className="float2">
            <Gray />
            <GrayLine />
            <PurpleLLine />
          </div>
          <div className="item">
            <h2>Cab</h2>
            <p>Book a quick ride for your destination</p>
          </div>
        </Link>

        <Link to="/service/daily" className="cat three">
          <div className="float3">
            <Curve3 />
            <Purple />
            <Orange />
          </div>
          <div className="item">
            <h2>Get to Office</h2>
            <p>Daily pick & drop service for office</p>
          </div>
        </Link>
        <Link to="/wedding" className=" cat four">
          <div className="item">
            <h2>Wedding</h2>
            <p>Comfortable ride for all your guests</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Services;
