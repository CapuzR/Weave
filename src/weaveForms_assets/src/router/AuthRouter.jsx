import { Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import Login from "../pages/Login";
import service from './service';
import { useEffect } from "react";

export const AuthRouter = (props) => {

  useEffect(async ()=>{
    if(await service.isAuthenticated()) {
      props.history.push('/forms');
    }
  });

  return (
    <>
      <Routes>
        <Route exact path="/auth/signin" component={Login} />
      </Routes>
      <Navigate to="/auth/signin" replace />
      {/* <Redirect to="/auth/signin" /> */}
    </>
  );
};
