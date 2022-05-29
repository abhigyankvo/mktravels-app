import "./success.scss";
import { ReactComponent as Tick } from "../../assets/svg/Tick.svg";

import { Link } from "react-router-dom";
function Success() {
  return (
    <div className="success-container">
      {/* <div className="logo1"></div> */}
      <div className="success">
        <Tick />
        <h2>Booking Successful !</h2>
        <p>
          Your booking was successful. We will send you a message on your
          contact number.
        </p>
        <div className="buttons">
          <Link to="/">
            <div className="success-btn goHome">Home</div>
          </Link>
          <Link to="/profile">
            <div className="success-btn  goProfile">Your Rides</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
