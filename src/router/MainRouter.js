import { Switch, Route, Redirect } from "react-router-dom";

import Main from "../pages/Main";

export const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/main" component={Main} />
      </Switch>
      <Redirect to="/main" />
    </>
  );
};
