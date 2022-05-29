import { useContext } from "react";
import { UserContext } from "../../context/userContext";

import { Link } from "react-router-dom";
const Login = () => {
  const { user } = useContext(UserContext);
  const style = { color: "white", cursor: "pointer" };
  return (
    <>
      {user ? (
        <Link style={style} to="/profile">
          Profile
        </Link>
      ) : (
        <Link style={style} to="/login">
          Login
        </Link>
      )}
    </>
  );
};

export default Login;
