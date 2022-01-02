import { useState, useEffect } from "react";
// import { makeStyles } from "@mui/material/styles";
import { Grid, Fab, Paper, Button } from "@mui/material";
import React from "react";
import theme from '../../theme';
import {  useLocation } from 'react-router-dom';
import FormHeader from "../../components/formHeader";
import QAndA from "../../components/q&A/q&A";

import service from "./service";
import { useNavigate } from "../../../../../node_modules/react-router-dom/index";

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  container: {
    padding: "24px",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
};

function Form(props) {
    const location = useLocation();
    const formId = location.pathname.split('/')[location.pathname.split('/').length-1];
    const [state, setState] = useState(service.state);
    const [ title, setTitle ] = useState();
    const [ description, setDescription ] = useState();
    const navigate = useNavigate();

  useEffect( async () => {
    if( localStorage.getItem("_scApp") ) {
      getFormData();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
    {
      state.form &&
    <Grid container column={1} alignItems="center" justifyContent="center" sx={{ marginTop: 15 }}>
        <Paper sx={{ width: "40vh", height: "auto", position: "relative" }}>
        <Grid item xs={12} sx={{ padding: 3, paddingBottom: 0, marginBottom: 0  }}>
            <FormHeader mode="Read"  title={state.form.formBase?.title} description={state.form.formBase?.description} setTitle={setTitle} setDescription={setDescription} />
        </Grid>
        <Grid item xs={12} sx={{ padding: 1, marginBottom: 15 }}>
            <QAndA  state={state} setState={setState} />
        </Grid>
        <Grid item xs={12} sx={{ padding: 1, position: "absolute", bottom: 10, right: 10  }}>
          {
            !props.loading &&
          <Button
            size="small"
            variant="contained"
            onClick={async () =>{
                await submitAnswers();
            }
            }
            color="primary"
            >
            Submit
          </Button>
        }
        </Grid>
        </Paper>
    </Grid>
    }
    </>
  );

  async function submitAnswers () {
    props.setLoading(true);
    await service.submitAnswers(state.form);
    navigate('/forms');
    props.setLoading(false);
};

  async function getFormData () {
      props.setLoading(true);
      const formData = await service.getFormData(formId);
      if(formData){
        setState(formData);
        props.setLoading(false);
      } else {
        navigate('/forms');
      }
  };

};

export default Form;
