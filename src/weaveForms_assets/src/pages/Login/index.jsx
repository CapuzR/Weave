
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import services from './service.js';
import service from '../../router/service.js';
// import iILogo from '../../assets/weavelogo.png';


const style = {
  position: 'relative',
  width: "30vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function Login(props) {
    const navigate = useNavigate();

    React.useEffect(()=>{
      if( localStorage.getItem("_scApp") ) {
        navigate("/forms");
      }
    }, []);

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ marginTop: 15 }}>
    <Grid item xs={3}>
        <Box sx={style}>
            <Grid container spacing={3} alignItems="center" sx={{ width: '100%', textAlign: "center" }}>
                <Grid item xs={12}>
                    <Button disabled color="primary" variant="outlined" sx={{ width: "250px" }} onClick={(e)=>{onSignInPlug(e)}}>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                            {/* <img style={{maxHeight: '30px', width:'auto', margin:0}} src="https://docs.plugwallet.ooo/imgs/logo.png"/> */}
                            </Grid>
                            <Grid item xs={8}>
                                Internet identity
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={} color="primary" variant="outlined" sx={{ width: "250px" }} onClick={(e)=>{onSignInStoic(e)}}>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <img style={{maxWidth: '30px', height:'auto', margin:0}} src="https://entrepot.app/stoic.png"/>
                            </Grid>
                            <Grid item xs={8}>
                                Stoic wallet
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="outlined" sx={{ width: "250px" }} onClick={(e)=>{onSignInPlug(e)}}>
                        <Grid container alignItems="center">
                            <Grid item xs={4} sx={{ alignItems: "center" }}>
                              <img style={{maxHeight: '30px', width:'auto', margin:0}} src="https://docs.plugwallet.ooo/imgs/logo.png"/>
                            </Grid>
                            <Grid item xs={8}>
                                Plug wallet
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Grid>
    </Grid>
  );

  async function onSignInStoic(event) {
    event.preventDefault();
    props.setLoading(true);
    const identity = await services.onSignInStoic();
    if(identity) {
      localStorage.setItem("wallet", 'Stoic');
      props.setIdentity(identity);
      props.setLoading(false);
      navigate('/forms');
    } else {
      props.setLoading(false);
    }
  };


  async function onSignInPlug(event) {
    event.preventDefault();
    props.setLoading(true);
    const identity = await services.onSignInPlug();
    if(identity){
      localStorage.setItem("_scApp", JSON.stringify(identity));
      localStorage.setItem("wallet", 'Plug');
      props.setIdentity(identity);
      props.setLoading(false);
      navigate('/forms');
    } else {
      props.setLoading(false);
    }
  }

}



//   async function onSignInII(event) {
//     event.preventDefault();
//     const res = await service.onSignInII()
//     history.push('/main');
//   }
// <form
//           sx={classes.form}
//           noValidate
//           onSubmit={(event) => onSignInII(event)}
//         >
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={classes.submit}
//           >
//             Internet Identity
//           </Button>
//         </form>