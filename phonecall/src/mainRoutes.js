import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainPage from "./component/mainPage";
import LogPage from "./component/logPage";

class MainRoutes extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/logs" component={LogPage} />

          {/* <Route exact path="/profile" component={Profiles} /> */}
        </Switch>
      </>
    );
  }
}

export default MainRoutes;
