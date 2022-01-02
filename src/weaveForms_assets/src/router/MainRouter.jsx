import { Routes, Route, Redirect } from "react-router-dom";
import React from "react";

import Main from "../pages/Main";

export const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route exact path="/forms" component={Main} />
        <Route exact path="/forms/:id" component={Main} />
      </Routes>
      {/* <Redirect to="/main" /> */}
    </>
  );
};
