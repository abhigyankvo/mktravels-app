import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IStateType } from "../../interfaces";
import { UserContext } from "../../context/userContext";

function LoginPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      if (window.sessionStorage.getItem("preUrl")) {
        const preUrl: string = window.sessionStorage.getItem(
          "preUrl"
        ) as string;

        window.sessionStorage.removeItem("preUrl");

        navigate(preUrl);
      } else navigate("/");
    } else {
      const state: IStateType | null = location.state as IStateType | null;
      if (state && state.preUrl) {
        window.sessionStorage.setItem("preUrl", state.preUrl);
      }
    }
  }, [user]);
  // const handleLogin = () => {
  //   window.open(`/auth/google`, "_self");
  // };
  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      <a href="/auth/google">Login with Google</a>
      {/* <button onClick={handleLogin}>Login with Google</button> */}
    </div>
  );
}

export default LoginPage;
