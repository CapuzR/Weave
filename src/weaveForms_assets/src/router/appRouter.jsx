    import React, { useState, useEffect } from 'react';

  import Login from '../pages/Login/index';
  import Forms from '../pages/Forms/index';
  import Form from '../pages/Form/index';
  // import  Profile from './profile';
  import {
    Navigate,
    Routes,
    Route,
  } from "react-router-dom";
  import loginServices from "../pages/Login/service";
  import { useNavigate } from "../../../../node_modules/react-router-dom/index";

export default function AppRouter(props) {

    return (
            <div>
               <Routes>
                <Route exact path="/forms" element={<Forms identity={props.identity} setLoading={props.setLoading} loading={props.loading} setIdentity={props.setIdentity} />} />
                <Route exact path="/form/:id" element={<Form identity={props.identity} setLoading={props.setLoading} loading={props.loading} setIdentity={props.setIdentity} />} />

                <Route exact path="/" element={<Login identity={props.identity} setLoading={props.setLoading} loading={props.loading} setIdentity={props.setIdentity} />} />
                <Route path="*" element={<Forms identity={props.identity} setLoading={props.setLoading} loading={props.loading} setIdentity={props.setIdentity} />}/>
              </Routes>
            </div>
    );

};