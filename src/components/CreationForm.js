import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(() => ({
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
  const [type, setType] = useState("short answer");

  useEffect(() => {
    if (props.state.selectedForm?.questions.length > 0)
      props.onSelectedQuestion(props.state.selectedForm?.questions[0]);
  }, [props.state.selectedForm]);

  return (
    <>
      {props.state.selectedForm?.questions.length > 0 ? (
        props.state.selectedForm?.questions.map((question) => (
          <Paper
            key={question.id}
            elevation={props.state.selectedQuestion?.id === question.id ? 5 : 1}
            className={classes.paper}
            onClick={() => props.onSelectedQuestion(question)}
            style={{
              cursor:
                props.state.selectedQuestion?.id === question.id
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
                    // value={props.state.selectedQuestion?.name}
                    onChange={(event) =>
                      props.onUpdateQuestion({
                        question: event.target.value,
                        type: "",
                      })
                    }
                    disabled={
                      !(props.state.selectedQuestion?.id === question.id)
                    }
                  />
                </div>
                <div className={classes.typeQuestions}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    disabled={
                      !(props.state.selectedQuestion?.id === question.id)
                    }
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Tipo de pregunta
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={type}
                      onChange={(event) => setType(event.target.value)}
                      label="Tipo de pregunta"
                    >
                      <MenuItem value={type}>Texto corto</MenuItem>
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

              {!props.isShare &&
              !props.state.forms.find(
                (form) => form.id === props.state.selectedForm?.id
              ) ? (
                props.state.selectedQuestion?.id === question.id ? (
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
                )
              ) : (
                <></>
              )}
            </div>
          </Paper>
        ))
      ) : (
        <div>No hay preguntas</div>
      )}
      {!props.isShare &&
      !props.state.forms.find(
        (form) => form.id === props.state.selectedForm?.id
      ) ? (
        <div className={classes.addQuestionContainer}>
          <IconButton
            color="primary"
            onClick={() => {
              props.onAddedQuestion({
                id: props.state.selectedForm?.questions.length + 1,
                name: "",
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
      ) : (
        <></>
      )}
    </>
  );
}

export default CreationForm;
