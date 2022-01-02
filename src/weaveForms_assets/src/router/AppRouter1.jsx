import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { AuthRouter } from "./AuthRouter";
import { MainRouter } from "./MainRouter";

const AppRouter = (props) => {

  return (
    <Router>
      <Routes>
        <Route path="/forms" component={MainRouter} />
        <Route path="/" component={AuthRouter} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
