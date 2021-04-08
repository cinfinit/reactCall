import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MainRoutes from "./mainRoutes";
function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={MainRoutes} />
      </Switch>
    </div>
  );
}

export default App;
