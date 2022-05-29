import passport from "passport";
import strategy from "passport-google-oauth20";
import User from "./models/userModel";
import { IUser } from "./interfaces/interface";
//check if any can be removed,
//handle error being sent from ln:44

const GoogleStrategy = strategy.Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: `/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const getUser = await User.findOne({ googleID: profile.id });
        if (getUser) {
          console.log("User already exists ");
          done(null, getUser);
        } else {
          const user: IUser = {
            name: profile.displayName,
            email: profile._json.email || "",
            profilePicture: profile._json.picture || "",
            googleID: profile.id,
            bookings: [],
          };
          const makeUser = new User(user);
          const newUser = await makeUser.save();
          console.log("New User Created ");
          done(null, newUser);
        }
      } catch (err: any) {
        console.log("Could not get/create user", err);
        done(err, undefined);
      }
    }
  )
);
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
