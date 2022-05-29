import { ReactNode, createContext, useState } from "react";
//TODO: put context files at one place
import { IUser, IUserContext } from "../interfaces";

//Context has a global state and setter functions
const UserContext = createContext<IUserContext>({} as IUserContext);
function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const updateUser = (_user: IUser) => {
    console.log("User", _user);
    setUser(_user);
  };
  return (
    <>
      <UserContext.Provider value={{ user, updateUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export { UserProvider, UserContext };
