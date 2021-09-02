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

function CreationForm(props) {
  const classes = useStyles();

  return (
    <Dialog
      open={props.openDialog}
      onClose={() => props.setOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div className={classes.formTitle}>
          Formulario sin titulo
          <div className={classes.containerEditTitlett}>
            <IconButton color="primary">
              <EditIcon color="primary" />
            </IconButton>
          </div>
        </div>
        <div className={classes.formDescription}>
          Descripción del formulario
        </div>
      </DialogTitle>
      <DialogContent
        className={classes.container}
        id="creation-forms-container"
      >
        {props.state.questions.map((question) => (
          <Paper
            key={question.id}
            elevation={props.state.selectedQuestion.id === question.id ? 5 : 1}
            className={classes.paper}
            onClick={() => props.onSelectedQuestion(question)}
            style={{
              cursor:
                props.state.selectedQuestion.id === question.id
                  ? ""
                  : "pointer",
            }}
          >
            <div className={classes.containerItem}>
              <div className={classes.containerQuestion}>
                <div className={classes.question}>
                  <TextField
                    id="filled-basic"
                    label="Pregunta"
                    variant="filled"
                    disabled={
                      !(props.state.selectedQuestion.id === question.id)
                    }
                  />
                </div>
                <div className={classes.typeQuestions}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    disabled={
                      !(props.state.selectedQuestion.id === question.id)
                    }
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Tipo de pregunta
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={10}
                      //   onChange={handleChange}
                      label="Tipo de pregunta"
                    >
                      <MenuItem value={10}>Texto corto</MenuItem>
                      <MenuItem value={20} disabled>
                        Selección simple
                      </MenuItem>
                      <MenuItem value={30} disabled>
                        Selección multiple
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {props.state.selectedQuestion.id === question.id ? (
                <div className={classes.containerActions}>
                  <IconButton disabled className={classes.duplicateIcon}>
                    <FileCopyIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => props.onDeleteQuestion(question.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Paper>
        ))}
        <div className={classes.addQuestionContainer}>
          <IconButton
            color="primary"
            onClick={() => {
              props.onAddedQuestion({
                id: props.state.questions.length,
                question: "",
                type: "",
              });

              document
                .getElementById("creation-forms-container")
                .scrollTo(
                  0,
                  document.getElementById("creation-forms-container")
                );
            }}
          >
            <AddCircleIcon color="primary" />
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpenDialog(false)} color="primary">
          Disagree
        </Button>
        <Button onClick={() => props.setOpenDialog(false)} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreationForm;
