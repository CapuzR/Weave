import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField } from "@mui/material";



function FormHeader(props) {

    return (
        <Grid container>
            {
            props.mode == "write" ?
            <>
                <Grid item xs={12} sx={{ paddingLeft: 1 }}>
                    <TextField
                        variant="standard"
                        size="large"
                        // inputProps={{ maxLength: 12 }}
                        sx={{width: '95%'}}
                        multiline
                        value={props.title || ""}
                        onChange={e=>props.setTitle(e.target.value)}
                        label="Title"
                    />
                </Grid>
                <Grid item xs={12} sx={{ paddingLeft: 1 }}>
                    <TextField
                        variant="standard"
                        size="large"
                        sx={{width: '95%'}}
                        multiline
                        value={props.description || ""}
                        onChange={e=>props.setDescription(e.target.value)}
                        label="Description"
                    />
                </Grid>
            </> :
            <>
                <Grid item xs={12}>
                    <Typography
                        variant="h4" 
                        component="h4"
                        label="Title"
                    >
                        {props.title || ""}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="p" 
                        component="p"
                        label="description"
                    >
                        {props.description || ""}
                    </Typography>
                </Grid>
            </>
            }
        </Grid>
    );

};

export default FormHeader;