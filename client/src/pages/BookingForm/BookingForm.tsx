import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PersonalForm, RideForm, ConfirmPage } from "../../components";
import { IBookingDetails } from "../../interfaces";
import { BookingContext } from "../../context/bookingContext";

function CabBookingForm() {
  const navigate = useNavigate();

  const lastPage = () => Number(window.sessionStorage.getItem("page") || 0);
  const [page, setPage] = useState(lastPage);
  const { bookingDetails, setFromStorage } = useContext(BookingContext);
  //Goto saved page from localStorage

  //set page index to sessionStorage
  useEffect(() => {
    window.sessionStorage.setItem("page", JSON.stringify(page));
  }, [page]);
  useEffect(() => {
    window.sessionStorage.setItem(
      "bookingDetails",
      JSON.stringify(bookingDetails)
    );
  }, [bookingDetails]);

  //Go through BookingForm pages
  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, 2));
  };
  const handleBack = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (_bookingDetails: IBookingDetails) => {
    try {
      const response = await axios.post(`/auth/addride`, _bookingDetails, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        window.sessionStorage.clear();
        setFromStorage();
        navigate("/success");
      }
      console.log("response");
    } catch (err) {
      console.log("Booking failed", err);
      navigate("/fail");
    }
  };
  return (
    <>
      <div className="bookingform-container">
        {page === 0 ? (
          bookingDetails.eventType === 0 ? (
            <h1>Tourism Page</h1>
          ) : (
            <RideForm
              handleNext={handleNext}
              handleBack={handleBack}
              handleSubmit={handleSubmit}
            />
          )
        ) : page === 1 ? (
          <PersonalForm
            handleNext={handleNext}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
          />
        ) : (
          <ConfirmPage
            handleNext={handleNext}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
          />
        )}
      </div>
    </>
  );
}
export default CabBookingForm;
