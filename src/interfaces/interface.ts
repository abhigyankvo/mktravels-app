// export interface IRide {
//   to: string;
//   from: string;
//   rideDate: Date;
//   eventType: string;
//   status?: boolean;
//   rideId?: string;
// }

export enum EventType {
  TOURISM,
  ONCE,
  DAILY,
  RENT,
}
//add completion status
//add booked on date
export interface IBookingDetails {
  origin: string;
  destination: string;
  dateTime: Date;
  passengers: number;
  firstname: string;
  lastname: string;
  mobileNo: number;
  email: string;
  bookingId?: string;
  eventType: EventType;
  status: string;
}
export interface IUser {
  id?: string;
  name: string;
  email: string;
  profilePicture: string;
  googleID: string;
  bookings: IBookingDetails[];
}
// export interface INewUser {
//   name: string;
//   email: string | undefined;
//   rides: IRide[];
//   id: string;
// }
