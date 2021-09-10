import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Fab } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import Header from "../../components/Header";
import ListForms from "../../components/ListForms";
import CreationForm from "../../components/CreationForm";
import TabNavigation from "../../components/TabNavigation";

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
        <TabNavigation page={state.page} onChangePage={onChangePage} />
        {state.page.name === "active" ? (
          <Grid container spacing={2}>
            <ListForms
              forms={state.forms}
              onSelected={onSelectedForm}
              onDelete={onDeleteForm}
            />
          </Grid>
        ) : (
          <></>
        )}
      </div>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon
          onClick={() => {
            setOpenDialog(true);
            onChangePage({ id: 0, name: "active" });
          }}
        />
      </Fab>
      <CreationForm
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        state={state}
        onAddedQuestion={onAddedQuestion}
        onSelectedQuestion={onSelectedQuestion}
        onDeleteQuestion={onDeleteQuestion}
        onUpdateQuestion={onUpdateQuestion}
      />
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

  function onAddedQuestion(question) {
    return service.onAddedQuestion({ state, question }).then(setState);
  }

  function onSelectedQuestion(question) {
    return service.onSelectedQuestion({ state, question }).then(setState);
  }

  function onDeleteQuestion(id) {
    return service.onDeleteQuestion({ state, id }).then(setState);
  }

  function onUpdateQuestion(question, type) {
    return service.onUpdateQuestion({ state, question, type }).then(setState);
  }

  function onChangePage(page) {
    return service.onChangePage({ state, page }).then(setState);
  }
}

export default Main;
