import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IBookingDetails,
  IBookingContext,
  AuxProp,
  ISuggestion,
  EventType,
} from "../interfaces";

const BookingContext = createContext<IBookingContext>({} as IBookingContext);
function BookingProvider({ children }: AuxProp) {
  const params = useParams();
  const event: EventType = params.eventtype === "once" ? 1 : 2;
  console.log(params);
  let initialBookingDetails = (): IBookingDetails => {
    let lastBookingDetails = window.sessionStorage.getItem("bookingDetails");
    if (lastBookingDetails) {
      let parsed = JSON.parse(lastBookingDetails);
      let temp = {
        ...parsed,
        dateTime: new Date(parsed.dateTime),
      };
      return temp;
    }
    return {
      origin: "",
      destination: "",
      dateTime: new Date(),
      passengers: 1,
      firstname: "",
      lastname: "",
      mobileNo: NaN,
      email: "",
      eventType: event,
      status: "inprogess",
    };
  };
  const [bookingDetails, setBookingDetails] = useState<IBookingDetails>(
    initialBookingDetails
  );
  const setFromStorage = () => {
    setBookingDetails(initialBookingDetails());
  };

  const setFromSuggestion = (e: ISuggestion) => {
    setBookingDetails({ ...bookingDetails, [e.name]: e.value });
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.name === "mobileNo" || e.target.name === "eventType") {
      setBookingDetails({
        ...bookingDetails,
        [e.target.name]: parseInt(e.target.value),
      });
    } else
      setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };
  const handleDateTimeChange = (e: any) => {
    console.log(e);
    setBookingDetails({ ...bookingDetails, dateTime: e });
  };
  const handlePassengersChange = (e: number) => {
    if (
      (e === -1 && bookingDetails.passengers === 1) ||
      (e === 1 && bookingDetails.passengers === 9)
    ) {
      return;
    }
    //increment or decrement passengers
    setBookingDetails((prev) => {
      const newPassengers = prev.passengers + e;
      return { ...prev, passengers: newPassengers };
    });
  };

  return (
    <>
      <BookingContext.Provider
        value={{
          bookingDetails,
          handleTextChange,
          handleDateTimeChange,
          handlePassengersChange,
          setFromStorage,
          setFromSuggestion,
        }}
      >
        {children}
      </BookingContext.Provider>
    </>
  );
}

export { BookingProvider, BookingContext };
