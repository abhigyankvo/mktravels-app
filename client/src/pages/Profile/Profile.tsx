import "./profile.scss";
import axios from "axios";
import { format } from "date-fns";
import { ReactComponent as Passenger } from "../../assets/svg/user.svg";
import { ReactComponent as Datesvg } from "../../assets/svg/calendar.svg";
import { ReactComponent as Timesvg } from "../../assets/svg/clock.svg";
import { ReactComponent as Right } from "../../assets/svg/arrow-right.svg";

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBookingDetails } from "../../interfaces";
import { UserContext } from "../../context/userContext";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState("upcoming");
  const [bookings, setBookings] = useState<IBookingDetails[]>([]);
  useEffect(() => {
    const getRidesCall = async () => {
      try {
        const response = await axios.get(`/auth/getRides`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setBookings(response.data.rides);
      } catch (err) {
        console.log("err", err);
      }
    };
    getRidesCall();
  }, []);

  const handleLogout = () => {
    window.open(`/auth/logout`, "_self");
  };
  const handleCancel = async (index: number) => {
    console.log("cancel");
    const res = await axios.put(
      `/auth/cancelride/${bookings[index].bookingId}`,
      {},
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("res ", res);
    setBookings(res.data.rides);
  };

  const rideComponents = (rideData: IBookingDetails, index: number) => {
    let origin: string = "";
    let destination: string = "";
    const dateTime = new Date(rideData.dateTime);
    const originArray = rideData.origin.replaceAll(",", "").split(" ");
    const destinationArray = rideData.destination
      .replaceAll(",", "")
      .split(" ");

    for (let i = 0; i < Math.min(originArray.length, 2); i++) {
      origin = origin + " " + originArray[i];
    }
    for (let i = 0; i < Math.min(destinationArray.length, 2); i++) {
      destination = destination + " " + destinationArray[i];
    }

    return (
      <div key={index}>
        <div className="pf-rides">
          <div className="aa route">
            {origin} <Right /> {destination}
          </div>
          <div className="bb time">
            <Timesvg /> {format(dateTime, "h:mm a")}
          </div>
          <div className="cc date">
            <Datesvg />
            {format(dateTime, "dd/mm/yy")} Daily
          </div>
          <div className="dd passengers">
            <Passenger /> {rideData.passengers}
          </div>
          <div className="ee">
            {rideData.status === "cancelled" ? (
              <h3 style={{ color: "red" }}>Cancelled</h3>
            ) : (
              <div onClick={() => handleCancel(index)} className="red-btn">
                Cancel
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  const getRides = () => {
    let temp = [];
    if (show === "upcoming") {
      for (let i = 0; i < bookings.length; i++) {
        const date = new Date(bookings[i].dateTime);
        if (date > new Date() && bookings[i].status !== "cancelled") {
          temp.push(rideComponents(bookings[i], i));
        }
      }
    } else {
      for (let i = 0; i < bookings.length; i++) {
        const date = new Date(bookings[i].dateTime);
        if (date < new Date() || bookings[i].status === "cancelled") {
          temp.push(rideComponents(bookings[i], i));
        }
      }
    }
    if (temp.length > 0) return temp;
    else
      return (
        <div style={{ color: "red", marginTop: "10px" }} className="no-rides">
          No rides to show
        </div>
      );
  };
  //Call for booking details
  return (
    <div>
      <div className="profile">
        <div className="profile-top">
          <Link to="/">
            <div className="logo"></div>
          </Link>
          <div onClick={handleLogout} className="success-btn  goProfile">
            Logout
          </div>
          {/* <div onClick={handleLogout} className="logout">
            Logout
          </div> */}
        </div>
        <div className="profile-details">
          <div className="pf-img">
            <img src={user?.profilePicture} alt="" />
          </div>
          <div className="pf-details">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="profile-rides">
          <div className="ride-sections">
            <div
              onClick={() => {
                setShow("upcoming");
              }}
              className={show === "upcoming" ? "upcoming active" : "upcoming"}
            >
              Upcoming
            </div>
            <div
              onClick={() => {
                setShow("completed");
              }}
              className={
                show === "completed" ? "completed active" : "completed"
              }
            >
              Completed
            </div>
          </div>
          <div className="scroll-rides">{getRides()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
