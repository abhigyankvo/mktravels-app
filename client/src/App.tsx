import "./index.scss";
import axios from "axios";
import { useEffect, useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { Landing, LoginPage, BookingForm, Profile, Success } from "./pages";

import { UserContext } from "./context/userContext";
import { BookingProvider } from "./context/bookingContext";
export default function App() {
  const { user, updateUser } = useContext(UserContext);
  const location = useLocation();
  useEffect(() => {
    if (
      !location.pathname.includes("/service") &&
      location.pathname !== "/login"
    ) {
      window.sessionStorage.removeItem("page");
      window.sessionStorage.removeItem("bookingDetails");
    }
  });
  useEffect(() => {
    if (!user) {
      console.log("Calling for user");
      (async () => {
        const tempUser = await axios
          .get(`/auth/login/success`, {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
          .catch((err) => {
            console.log(err);
            return {
              data: {
                user: null,
              },
            };
          });

        updateUser(tempUser.data.user);
      })();
    }
  }, [user]);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Routes>
        {/* Send user proper to landing page to show profile picture/ Login button */}
        <Route path="/" element={<Landing />} />
        <Route path="login">
          <Route path="" element={<LoginPage />} />
          <Route path=":preUrl" element={<LoginPage />} />
        </Route>

        <Route
          path="/service/:eventtype"
          element={
            <BookingProvider>
              <BookingForm />
            </BookingProvider>
          }
        />
        <Route
          path="/profile"
          element={
            user != null ? (
              <Profile />
            ) : (
              <Navigate to="/login" state={{ preUrl: "/profile" }} />
            )
          }
        />
        <Route path="/tourism" element={<h1>Tourism</h1>} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </MuiPickersUtilsProvider>
  );
}
