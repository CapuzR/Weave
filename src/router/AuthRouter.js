import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../pages/Login";

export const AuthRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/auth/signin" component={Login} />
      </Switch>
      <Redirect to="/auth/signin" />
    </>
  );
};
