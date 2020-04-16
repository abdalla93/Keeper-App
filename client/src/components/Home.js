import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Home = (props) => {
  const { isAuthenticated } = useContext(GlobalContext);
  const unauthenticateHome = () => {
    props.history.push("/register");
    return (
      <div className="Home">
        <h1>please login/Register to start your keeper Notes</h1>
      </div>
    );
  };
  const authenticatedHome = () => {
    props.history.push("/logedin");
    return (
      <div className="Home">
        <h1>please login/Register to start your keeper Notes</h1>
      </div>
    );
  };

  return <>{!isAuthenticated ? unauthenticateHome() : authenticatedHome()}</>;
};
export default Home;
