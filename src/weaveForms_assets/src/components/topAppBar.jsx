import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

import { useNavigate } from "react-router-dom";
import services from '../pages/Login/service.js';
import WeaveLogo from '../../assets/weavelogo.png';

export default function TopAppBar(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
    color="secondary"
    // sx={{ backgroundColor:"#fff" }}
    >
        <Toolbar>
        <Grid item xs={6}>
            <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={()=>{navigate('/');}}
            sx={{ padding: 0, borderRadius: 10 }}
            >
                <img
                    src={WeaveLogo}
                    alt=""
                    style={{ width: 190 }}
                />
                <Typography>
                    forms BETA
                </Typography>
            </IconButton>
        </Grid>
        {
          props.identity &&
          <Grid container alignItems="flex-end" sx={{ textAlign: 'right' }}>
              <Grid item xs={12}>
                  <Button 
                  variant="contained" 
                  // sx={{ backgroundColor: '#43a047', color:'#fff' }} 
                  onClick={(e)=>{onSignOut(e);}}
                  >Logout</Button>
              </Grid>
          </Grid>
        }
        </Toolbar>
    </AppBar>
  );

  async function onSignOut() {
    const wallet = localStorage.getItem('wallet');
    props.setLoading(true);
    if(wallet) {
      if(wallet === 'Plug') {
        localStorage.clear();
        props.setIdentity(false);
        props.setLoading(false);
        props.setAuth(false);
        navigate('/');
      } else {
        const isDisconnected = await services.onSignOutStoic();
        if(isDisconnected){
          localStorage.clear();
          props.setIdentity(false);
          props.setLoading(false);
          props.setAuth(false);
          navigate('/');
        }
      }
    }
  }
}
