import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { IconButton, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

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
          {!props.isShare ? (
            <div className={classes.containerEditTitlett}>
              <IconButton color="primary">
                <EditIcon color="primary" />
              </IconButton>
            </div>
          ) : (
            <></>
          )}
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
        <Button
          variant="outlined"
          onClick={() => props.onClose()}
          color="primary"
          size="small"
        >
          Disagree
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() =>
            props.onAccept({
              id: props.state.selectedForm.id,
              name: props.state.selectedForm.name,
              description: props.state.selectedForm.description,
              questions: props.state.selectedForm.questions,
              image: props.state.selectedForm.image
                ? props.state.selectedForm.image
                : undefined,
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
