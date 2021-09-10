import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  IconButton,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "500px",
    height: "500px",
  },
  formTitle: {
    color: "#202124",
    fontSize: "24px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
  },
  formDescription: {
    color: "#7E7E7E",
    fontSize: "18px",
  },
  containerEditTitle: {
    marginLeft: "10px",
  },
  containerItem: {
    height: "130px",
    padding: "8px",
    borderRadius: "8px",
    marginBottom: "8px",
  },
  containerQuestion: {
    display: "flex",
    alignItems: "center",
  },
  question: {
    width: "50%",
    marginRight: "8px",
  },
  typeQuestions: {
    width: "50%",
    marginLeft: "auto",
  },
  containerActions: {
    display: "flex",

    marginTop: "12px",
  },
  duplicateIcon: {
    marginLeft: "auto",
  },
  addQuestionContainer: {
    bottom: "0px",
    position: "sticky",
    display: "flex",
    justifyContent: "center",
  },
}));

function Modal(props) {
  const classes = useStyles();

  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.onClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div className={classes.formTitle}>
          {props.title}
          <div className={classes.containerEditTitlett}>
            <IconButton color="primary">
              <EditIcon color="primary" />
            </IconButton>
          </div>
        </div>
        <div className={classes.formDescription}>{props.description}</div>
      </DialogTitle>
      <DialogContent
        className={classes.container}
        id="creation-forms-container"
      >
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()} color="primary">
          Disagree
        </Button>
        <Button
          onClick={() =>
            props.onAccept({
              form: {
                name: "Formulario sin titulo",
                description: "Descripcion del formulario",
                questions: props.state.questions,
              },
            })
          }
          color="primary"
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
