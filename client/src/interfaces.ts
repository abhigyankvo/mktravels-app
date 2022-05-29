//TODO: Shift interface to root folder
export interface IStateType {
  preUrl?: string | undefined;
}
export enum EventType {
  TOURISM,
  ONCE,
  DAILY,
  RENT,
}
export interface ISuggestion {
  name: string;
  value: string;
}
export interface IBookingDetails {
  origin: string;
  destination: string;
  dateTime: Date;
  passengers: number;
  firstname: string;
  lastname: string;
  mobileNo: number;
  email: string;
  eventType: EventType;
  status: string;
  bookingId?: string;
}
export interface AuxProp {
  children: React.ReactNode;
}
export interface IBookingContext {
  bookingDetails: IBookingDetails;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateTimeChange: (e: any) => void;
  handlePassengersChange: (e: number) => void;
  setFromStorage: () => void;
  setFromSuggestion: (suggestion: ISuggestion) => void;
}
export interface IPageHandler {
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: (_bookingDetails: IBookingDetails) => void;
}

export interface IUser {
  name: string;
  email: string;
  profilePicture: string;
}
export interface IUserContext {
  user: IUser | null;
  updateUser: (user: IUser) => void;
}
