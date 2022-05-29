import { useContext, useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import PlacesAutocomplete from "react-places-autocomplete";
import "./ride.scss";
import { NextButton } from "../index";
import { IPageHandler } from "../../interfaces";
import { BookingContext } from "../../context/bookingContext";
import { ReactComponent as Plus } from "../../assets/svg/plus.svg";
import { ReactComponent as Minus } from "../../assets/svg/minus.svg";
import { ReactComponent as UsersAlt } from "../../assets/svg/users-alt.svg";
import { Link } from "react-router-dom";

export default function RideForm({ handleNext }: IPageHandler) {
  const {
    bookingDetails,
    handleTextChange,
    handleDateTimeChange,
    handlePassengersChange,
    setFromSuggestion,
  } = useContext(BookingContext);

  const [errors, setErrors] = useState({
    originError: "",
    destinationError: "",
  });
  const validate = () => {
    let originError = "";
    let destinationError = "";
    if (bookingDetails.origin === "") {
      originError = "Please enter origin";
    }
    if (bookingDetails.destination === "") {
      destinationError = "Please enter destination";
    }
    if (originError || destinationError) {
      setErrors({ ...errors, originError, destinationError });
      return;
    }
    handleNext();
  };

  return (
    <div className="rideform-container">
      <div className="rideform-left-container">
        <div className="rideform-left">
          <Link to="/">
            <div className="logo"></div>
          </Link>
          <h2>Booking Detail</h2>
          <div className="input-container">
            {/* <div id="origin-div"> */}
            <PlacesAutocomplete
              debounce={500}
              value={bookingDetails.origin}
              onChange={(value) => setFromSuggestion({ name: "origin", value })}
              onSelect={(value) => setFromSuggestion({ name: "origin", value })}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <>
                  <label htmlFor="origin">Origin</label>
                  <input {...getInputProps({ id: "origin" })} />
                  <div className="suggestion-container">
                    {loading ? (
                      <p style={{ color: "black" }}>Loading...</p>
                    ) : null}
                    {suggestions.map((suggestion, index) => {
                      return (
                        <div className="suggestion-item" key={index}>
                          <p {...getSuggestionItemProps(suggestion)}>
                            {suggestion.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </PlacesAutocomplete>
            <p style={{ color: "red" }}>{errors.originError}</p>
          </div>
          <div className="input-container">
            <PlacesAutocomplete
              debounce={500}
              value={bookingDetails.destination}
              onChange={(value) =>
                setFromSuggestion({ name: "destination", value })
              }
              onSelect={(value) =>
                setFromSuggestion({ name: "destination", value })
              }
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <label htmlFor="destination">Destination</label>
                  <input {...getInputProps({ id: "destination" })} />
                  <div className="suggestion-container">
                    {loading ? <div>Loading...</div> : null}
                    {suggestions.map((suggestion, index) => {
                      return (
                        <div className="suggestion-item" key={index}>
                          <p {...getSuggestionItemProps(suggestion)}>
                            {suggestion.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <p style={{ color: "red" }}>{errors.destinationError}</p>
          </div>

          {/* eventType */}
          <div id="radio-div">
            <input
              id="daily"
              name="eventType"
              value={2}
              type="radio"
              defaultChecked={bookingDetails.eventType === 2}
              className={bookingDetails.eventType === 2 ? "checked" : ""}
              onChange={handleTextChange}
            />
            <label className="radiolabel" htmlFor="daily">
              Daily
            </label>
            <input
              id="once"
              name="eventType"
              value={1}
              type="radio"
              className={bookingDetails.eventType === 1 ? "checked" : ""}
              defaultChecked={bookingDetails.eventType === 1}
              onChange={handleTextChange}
            />
            <label className="radiolabel" htmlFor="once">
              Once
            </label>
          </div>
          {/* Data And Time Selector */}
          <div id="date">
            <label htmlFor="">Date-Time</label>
            <DateTimePicker
              ampm={true}
              disablePast
              value={bookingDetails.dateTime}
              onChange={handleDateTimeChange}
            />
          </div>

          {/* Passenger Increment Decrement */}

          <div id="passenger-div-container">
            <label style={{ marginBottom: "8px" }} htmlFor="">
              Passengers
            </label>
            <div id="passenger-div">
              <div
                onClick={() => handlePassengersChange(-1)}
                className={`user ${
                  bookingDetails.passengers === 1
                    ? "userChangeDisabled"
                    : "userChange"
                }`}
              >
                <Minus />
              </div>

              <div style={{ margin: "0 15px", display: "flex" }}>
                <UsersAlt />
                <p style={{ fontSize: "0.9rem", letterSpacing: "1.5px" }}>
                  x{bookingDetails.passengers}
                </p>
              </div>
              <div
                onClick={() => handlePassengersChange(1)}
                className={`user ${
                  bookingDetails.passengers === 9
                    ? "userChangeDisabled"
                    : "userChange"
                }`}
              >
                <Plus />
              </div>
            </div>
          </div>
          <div className="navigation-container" onClick={validate}>
            <NextButton />
          </div>
        </div>
      </div>
      <div className="rideform-right-container"></div>
    </div>
  );
}
///////////////////////

// const provider = new OpenStreetMapProvider();
// const [search, setSearch] = useState("");
// const [suggestion, setSuggestion] = useState<string[]>([]);
// const [shouldShowSuggestions, setShouldShowSuggestions] = useState(true);
// const [fieldID, setFieldID] = useState("");

///////////////

// const debouncedSearch = useDebounce(search, 1000);
// useEffect(() => {
//   const locationApi = async () => {
//     const response = await provider.search({ query: debouncedSearch });
//     console.log(response);
//     let temp: string[] = response.map((item) => item.label);
//     setSuggestion(temp);
//   };
//   if (debouncedSearch && shouldShowSuggestions) {
//     locationApi();
//   }
// }, [debouncedSearch]);
// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (e.target.value.length > 0) {
//     setShouldShowSuggestions(true);
//   } else {
//     setShouldShowSuggestions(false);
//     setSuggestion([]);
//   }
//   setFieldID(e.target.name);
//   setSearch(e.target.value);

//   handleTextChange(e);
// };
// const handleSuggestionClick = (item: any) => {
//   setShouldShowSuggestions(false);
//   setFromSuggestion(item);
//   setSuggestion([]);
// };
// const getSuggestions = (id: string) => {
//   let temp: any = [];
//   if (
//     suggestion.length > 0 &&
//     shouldShowSuggestions === true &&
//     fieldID === id
//   ) {
//     for (let i = 0; i < suggestion.length; i++) {
//       temp.push(
//         <p
//           className="suggestion-item"
//           onClick={() =>
//             handleSuggestionClick({ name: id, value: suggestion[i] })
//           }
//           key={i}
//         >
//           {suggestion[i]}
//         </p>
//       );
//     }
//   }
//   return temp.length > 0 ? (
//     <div className="suggestion-container">{temp}</div>
//   ) : null;
// };
//////////////////////
/* <label htmlFor="destination">Destination</label>
 <input
    value={bookingDetails.destination}
   type="text"
   name="destination"
   id="destination"
   onChange={handleChange}
 />
 <p style={{ color: "red" }}>{errors.destinationError}</p>
 {getSuggestions("destination")} */
