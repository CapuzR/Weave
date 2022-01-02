import React, { useState, useEffect } from "react";
import { Grid, Typography } from '@mui/material';

import Donate from './donate';


function Footer() {

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={12}>
                <Donate />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ textAlign: "center" }}>
                    <Grid item xs={3}>
                    <Typography sx={{ mt: 2, TextAlign: "center" }}>
                        Developed by: Weavers 100% on-chain on The Internet Computer.
                    </Typography>
                    <Typography sx={{ mt: 2, TextAlign: "center" }}>
                        Inspect the backend canister on <a target="_blank" href="https://ic.rocks/principal/lthmp-gqaaa-aaaag-aaaqa-cai">ic.rocks</a>
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ textAlign: "center", marginTop: 1.5 }}>     
                            <Typography sx={{ mt: 2, TextAlign: "center" }}>
                                Other dApps:
                            </Typography>
                            <Grid item>
                                <a style={{ color:'#000', TextAlign: "center" }} href="https://l72na-ciaaa-aaaak-aabwa-cai.raw.ic0.app/" target="_blank">Weave Profile</a>
                            </Grid>
                            <Grid item>
                                <a style={{ color:'#000' }} href="https://elementum.one" target="_blank">Elementum</a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

};

export default Footer;