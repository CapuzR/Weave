import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { MainRouter } from "./MainRouter";

const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/main" component={MainRouter} />
        <Route path="/" component={AuthRouter} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
