import { useState, useEffect } from "react";
// import { makeStyles } from "@mui/material/styles";
import { Grid, Fab, Paper, Button, Typography, TextField } from "@mui/material";
import React from "react";
import theme from '../../theme';

import service from "./service";


function QAndA(props) {
    const activeForm = props.mode == "read" ?  props.state.selectedForm : props.mode == "multi" ? props.state.selectedForm[props.formPage]  : props.state.form;
    return (
    <Grid container spacing={2} column={1} alignItems="center" justifyContent="center" sx={{ marginTop: 3 }}>
      {
        activeForm.questions &&
        activeForm.questions.map((q,i)=>(
          <Paper key={q.id} sx={{ width: "35vh", marginBottom: 1 }}>
            <Grid item xs={12} sx={{ padding: 1 }}>
              <Typography>{q.question}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ padding: 2 }}>
              <TextField
                  variant="standard"
                  size="large"
                  multiline
                  fullWidth
                  row={3}
                  disabled={props.mode == "read" || props.mode == "multi" ? true : false}
                  value={activeForm.answers && activeForm.answers[i] ? activeForm.answers[i].answer : q.answers ? q.answers[0].answer : ""}
                  onChange={(event) => {
                    onUpdateAnswer({
                      answer: event.target.value,
                      fQId: q.id,
                    })
                  }}
                  label="Answer"
              />
            </Grid>
          </Paper>
        )
        )
      }
    </Grid>
  );

  function onUpdateAnswer({answer, fQId}) {
    return service.onUpdateAnswer({ state: props.state, answer, fQId }).then(props.setState);
  };

};

export default QAndA;
