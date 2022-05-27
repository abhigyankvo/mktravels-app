//all the /auth routes here
import passport from "passport";
import express from "express";
import User from "../models/userModel";
import { IUser, IBookingDetails } from "../interfaces/interface";
const authRoute = express.Router();

authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND_BASEURL}/login`,
    failureRedirect: "/auth/login/failed",
  })
);

authRoute.get("/login/success", (req, res) => {
  if (req.user) {
    let _user = req.user as IUser;
    console.log("login success");
    res.status(200).send({
      user: {
        name: _user.name,
        email: _user.email,
        profilePicture: _user.profilePicture,
      },
      token: req.cookies,
      success: true,
    });
  } else {
    console.log("no user");
    res.status(404).send("User not logged in");
  }
});

authRoute.get("/login/failed", (req, res) => {
  res.status(401).send({
    success: false,
    message: "user failed to authenticate.",
  });
});
authRoute.get("/logout", (req, res) => {
  console.log("logged out");
  req.logout();
  res.redirect(`${process.env.FRONTEND_BASEURL}`);
});

authRoute.post("/addride", isLoggedIn, async (req, res) => {
  try {
    const user: IUser = req.user as IUser;
    const ride: IBookingDetails = req.body;
    const getUser = await User.findOne({ googleID: user.googleID });
    console.log("User found, adding ride to user");
    // console.log("BODY", req.body);
    getUser?.bookings.push(ride);
    const updatedUser = await getUser?.save();
    res.sendStatus(200);
  } catch (err) {
    console.log("error in adding rides", err);
    res.send(err);
  }
});
authRoute.get("/getRides", isLoggedIn, async (req, res) => {
  const user: IUser = req.user as IUser;
  try {
    const getUser = await User.findOne({ googleID: user.googleID });
    if (getUser) {
      const rides = getUser.bookings;
      res.status(200).send({ rides });
    }
  } catch (err) {
    console.log("Couldn not get rides", err);
    res.status(500).send(err);
  }
});
authRoute.put("/cancelride/:id", isLoggedIn, async (req, res) => {
  const bookingId: string = req.params.id;
  const user: IUser = req.user as IUser;
  try {
    const getUser = await User.findOne({ googleID: user.googleID });
    if (getUser) {
      console.log("found user");
      for (let i = 0; i < getUser.bookings.length; i++) {
        if (getUser.bookings[i].bookingId === bookingId) {
          getUser.bookings[i].status = "cancelled";
          const newUser = await getUser.save();
          console.log("ride cancelled");
          res.status(200).send({ rides: newUser.bookings });
          return;
        }
      }
      res.send("no booking found");
    }
  } catch (err) {
    console.log("Couldn not get rides", err);
    res.status(500).send(err);
  }
});
function isLoggedIn(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.isAuthenticated()) {
    console.log("isLoggedin called");
    return next();
  }
  res.redirect(`${process.env.FRONTEND_BASEURL}/login`);
}
export default authRoute;
