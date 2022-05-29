import "./confirm.scss";
import { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BookingContext } from "../../context/bookingContext";
import { UserContext } from "../../context/userContext";
import { IPageHandler } from "../../interfaces";
import { format } from "date-fns";
import {
  PreviousButton,
  SubmitButton,
} from "../NavigationButtons/NavigationButtons";
export default function ConfirmPage({
  handleSubmit,
  handleBack,
}: IPageHandler) {
  //If there's no user, redirect to login page, else submit
  let navigate = useNavigate();
  const location = useLocation();
  const { bookingDetails } = useContext(BookingContext);
  const { user } = useContext(UserContext);
  const loginNSubmit = () => {
    if (!user) {
      navigate("/login", { state: { preUrl: location.pathname } });
    } else {
      handleSubmit(bookingDetails);
    }
  };
  return (
    <div>
      <div className="confirmation-container">
        <div className="confirmation-left-container">
          <div className="confirmation-left">
            <Link to="/">
              <div className="logo"></div>
            </Link>
            <h2>Confirmation</h2>
            <div className="bookingDetails">
              <div className="separator">
                <h4>Booking Details</h4>
              </div>
              <div className="flex">
                <div className="details">
                  <p className="plabel">Booking Type : </p>
                  <p className="nextp1">
                    {bookingDetails.eventType === 1 ? "Once" : "Daily"}
                  </p>
                </div>
                <div className="details">
                  <p className="plabel">Passengers : </p>
                  <p className="nextp1">{bookingDetails.passengers}</p>
                </div>
              </div>
              <div className="details">
                <p className="plabel">Origin : </p>
                <p className="nextp">{bookingDetails.origin}</p>
              </div>

              <div className="details">
                <p className="plabel">Destination : </p>
                <p className="nextp">{bookingDetails.destination}</p>
              </div>
              <div className="details">
                <p className="plabel">Date-time : </p>
                <p className="nextp">
                  {format(bookingDetails.dateTime, "eee d MMM u, h:mm a")}
                </p>
              </div>
            </div>
            <div className="personalDetails">
              <div className="separator">
                <h4>Personal Details</h4>
              </div>
              <div className="details">
                <p className="plabel">Name : </p>
                <p className="nextp">
                  {`${bookingDetails.firstname} ${bookingDetails.lastname}`}
                </p>
              </div>
              <div className="details">
                <p className="plabel">Phone : </p>
                <p className="nextp">{bookingDetails.mobileNo}</p>
              </div>
              <div className="details">
                <p className="plabel">Email : </p>
                <p className="nextp">{bookingDetails.email}</p>
              </div>
            </div>
            <div className="navigation-container">
              <div onClick={handleBack}>
                <PreviousButton />
              </div>
              <div onClick={loginNSubmit}>
                <SubmitButton />
              </div>
            </div>
          </div>
        </div>
        <div className="confirmation-right-container"></div>
      </div>
    </div>
  );
}
