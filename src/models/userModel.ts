import { IUser, IBookingDetails, EventType } from "../interfaces/interface";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const rideSchema = new mongoose.Schema<IBookingDetails>({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  dateTime: { type: Date, required: true },
  passengers: { type: Number, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobileNo: { type: Number, required: true },
  email: { type: String, required: true },
  bookingId: {
    type: String,
    required: true,
    immutable: true,
    default: () => uuidv4(),
  },
  eventType: { type: Number, enum: EventType, required: true },
  status: { type: String, required: true },
});
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  googleID: { type: String, required: true },
  profilePicture: { type: String, required: true },
  bookings: [rideSchema],
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
