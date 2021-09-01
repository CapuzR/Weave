import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Fab } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import Header from "../../components/Header";
import ListForms from "../../components/ListForms";
import CreationForm from "../../components/CreationForm";

import service from "./service";

const useStyles = makeStyles((theme) => ({
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
}));

function Main({ history }) {
  const classes = useStyles();
  const [state, setState] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  console.log(state);
  useEffect(() => {
    init();
  }, []);
  return state ? (
    <div className={classes.root}>
      <Header onLogout={() => onSignOut()} />
      <div className={classes.container}>
        <Grid container spacing={2}>
          <ListForms
            forms={state.forms}
            onSelected={onSelectedForm}
            onDelete={onDeleteForm}
          />
          ]
        </Grid>
      </div>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon onClick={() => setOpenDialog(true)} />
      </Fab>
      <CreationForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  ) : (
    <div>Cargando . . .</div>
  );

  function init() {
    return service.init().then(setState);
  }

  function onSignOut() {
    service.onSignOut();
    history.replace("/");
  }

  function onSelectedForm(form) {
    return service.onSelectedForm({ state, form }).then(setState);
  }

  function onDeleteForm(id) {
    return service.onDeleteForm({ state, id }).then(setState);
  }
}

export default Main;
