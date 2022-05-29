import "./personal.scss";
import { useContext, useState } from "react";
import { BookingContext } from "../../context/bookingContext";
import { IPageHandler } from "../../interfaces";
import {
  NextButton,
  PreviousButton,
} from "../NavigationButtons/NavigationButtons";
import { Link } from "react-router-dom";
export default function PersonalForm({ handleNext, handleBack }: IPageHandler) {
  const { bookingDetails, handleTextChange } = useContext(BookingContext);
  const [errors, setErrors] = useState({
    firstnameError: "",
    lastnameError: "",
    mobileError: "",
    emailError: "",
  });
  const validate = () => {
    let firstnameError = "";
    let lastnameError = "";
    let mobileError = "";
    let emailError = "";
    if (bookingDetails.firstname === "") {
      firstnameError = "Please enter firstname";
    }
    if (bookingDetails.lastname === "") {
      lastnameError = "Please enter lastname";
    }
    if (
      !bookingDetails.mobileNo ||
      bookingDetails.mobileNo > 9999999999 ||
      bookingDetails.mobileNo < 1000000000
    ) {
      mobileError = "Please enter valid mobile number";
    }
    if (
      !bookingDetails.email ||
      !bookingDetails.email.includes("@") ||
      !bookingDetails.email.includes(".")
    ) {
      emailError = "Please enter valid email";
    }
    if (firstnameError || lastnameError || mobileError || emailError) {
      setErrors({
        ...errors,
        firstnameError,
        lastnameError,
        mobileError,
        emailError,
      });
      return;
    }

    handleNext();
  };
  console.log({ bookingDetails, errors });
  return (
    <div className="personalform-container">
      <div className="personalform-left-container">
        <div className="personalform-left">
          <Link to="/">
            <div className="logo"></div>
          </Link>
          <h2>Personal Detail</h2>

          <div>
            <label htmlFor="firstname">Firstname</label>
            <input
              value={bookingDetails.firstname}
              type="text"
              name="firstname"
              id="firstname"
              onChange={handleTextChange}
            />
            <p style={{ color: "red" }}>{errors.firstnameError}</p>
          </div>
          <div>
            <label htmlFor="lastname">Lastname</label>
            <input
              value={bookingDetails.lastname}
              type="text"
              name="lastname"
              id="lastname"
              onChange={handleTextChange}
            />
            <p style={{ color: "red" }}>{errors.lastnameError}</p>
          </div>
          <div>
            <label htmlFor="mobileNo">Mobile</label>
            <input
              value={bookingDetails.mobileNo || ""}
              type="number"
              inputMode="numeric"
              name="mobileNo"
              id="mobileNo"
              onChange={handleTextChange}
            />
            <p style={{ color: "red" }}>{errors.mobileError}</p>
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              value={bookingDetails.email}
              type="email"
              name="email"
              id="email"
              onChange={handleTextChange}
            />
            <p style={{ color: "red" }}>{errors.emailError}</p>
          </div>
          <div className="navigation-container">
            <div onClick={handleBack}>
              <PreviousButton />
            </div>
            <div onClick={validate}>
              <NextButton />
            </div>
          </div>
        </div>
      </div>
      <div className="personalform-right-container"></div>
    </div>
  );
}
