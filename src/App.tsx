import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { Home } from "./autologAccountPackages/autologTeam/pages/Home";
import { Dashboard } from "./autologAccountPackages/autologTeam/pages/Dashboard";
import { Login } from "./autologAccountPackages/autologTeam/pages/Login";
import { Offers } from "./autologAccountPackages/autologTeam/pages/Offers";
import { ReveiwPendings } from "./autologAccountPackages/autologTeam/pages/Actions/ReviewPendings/ReveiwPendingsPage";

interface user {
  userType: string;
  cognitoUser: any;
}

const initialUser = {
  userType: "initialType",
  cognitoUser: "initialCognito",
};

const App = () => {
  const [curUser, setCurUser] = useState<user>(initialUser);

  return (
    <Router>
      <div>
        <Route
          path="/"
          component={(props: any) => (
            <Dashboard
              userType={"Team"}
              cognitoUser={{}}
              // userType={curUser.userType}
              // cognitoUser={curUser.cognitoUser}
            />
          )}
        />
      </div>
    </Router>
  );
};

export default App;

//<Route exact path="/" component={(props: any) => <Home />} />
// <Route
//   path="/dashboard"
//   component={(props: any) => (
//     <Dashboard
//       userType={curUser.userType}
//       cognitoUser={curUser.cognitoUser}
//     />
//   )}
// />
// <Route
//   path="/login"
//   component={(props: any) => (
//     <Login setCurUser={setCurUser} {...props} />
//   )}
// />
// <Route
//   path="/offers"
//   component={(props: any) => <Offers {...props} />}
// />
// <Route
//   path="/reviewPndingsRFQ"
//   component={(props: any) => <ReveiwPendings {...props} />}
// />
