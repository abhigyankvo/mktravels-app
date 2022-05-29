import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
require("./passport");
// import userRoute from "./routes/user";
import authRoute from "./routes/auth";

const URI: string = process.env.URI as string;
const port: string = process.env.PORT || "4000";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "mellon",
    keys: ["ftvAwddrv#46632gt%"],
    maxAge: 1000 * 60 * 60 * 24,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(
//   cors({
//     origin: `${process.env.FRONTEND_BASEURL}`,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );
//make the cookie

const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(URI);
  } catch (err) {
    console.log(err);
  }
};
connectDB();

// app.use("/", userRoute);
app.use("/auth", authRoute);
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

// app.use(express.static("client/build"));
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

mongoose.connection.once("open", () => {
  console.log("Connected to mongodb");
  app.listen(port, () => {
    console.log(`Application is running on port ${port}.`);
  });
});
