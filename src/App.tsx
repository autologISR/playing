import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { Dashboard } from "./autologAccountPackages/autologTeam/pages/Dashboard";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Dashboard} />
      </div>
    </Router>
  );
};

export default App;
