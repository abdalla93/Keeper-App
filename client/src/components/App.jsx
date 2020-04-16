import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import LogedIn from "./LogedIn";
import { GlobalProvider } from "../context/GlobalState";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <GlobalProvider>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/logedin" component={LogedIn} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Footer />
        </div>
      </GlobalProvider>
    </Router>
  );
}

export default App;
