import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./context/userContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>,
  document.getElementById("root")
);
