import React, { useState } from 'react';
import * as React from 'react'
import ReactDOM from 'react-dom';

import { HashRouter as Router } from "react-router-dom";

import AppRouter  from './router/appRouter';
import TopAppBar from './components/topAppBar';
import Footer from './components/footer';

import Grid from '@mui/material/Grid';
import theme from './theme';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider as MuiThemeProvider } from '@mui/system';
import { ThemeProvider } from '@emotion/react';


export default function Index() {
  const [identity, setIdentity] = useState(JSON.parse(localStorage.getItem('_scApp')));
  const [loading, setLoading] = useState(false);
  const [isProfileReady, setIsProfileReady] = useState(false);
  const [ auth, setAuth ] = useState();


  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          {
            <Backdrop style={{ zIndex: 11, color: "#0000FF" }} open={loading}>
              <CircularProgress style={{ zIndex: 11, color: "#0000FF" }} />
            </Backdrop>
          }
          <Grid container 
          sx={{
            margin: 0, 
            padding: 0, 
            minHeight: '100vh'
          }} 
          >
            <Grid item xs={12} sx={{ zIndex: 9 }}>
              <TopAppBar setIdentity={setIdentity} identity={identity} setLoading={setLoading} auth={auth} setAuth={setAuth} />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 6 }}>
              <Grid container spacing={2} direction="column" justifyContent="center">
                <AppRouter identity={identity} setLoading={setLoading} loading={loading} setIdentity={setIdentity} auth={auth} setAuth={setAuth} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </ThemeProvider>
      </MuiThemeProvider>
    </Router>
  );
}

ReactDOM.render(<Index />, document.querySelector('#app'));