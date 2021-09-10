import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "500px",
    height: "500px",
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
}));

function AnswerForm(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.form.questions.length > 0) {
      props.onSelectedQuestion(props.form.questions[0]);
    }
  }, []);

  return props.form.questions.length > 0 ? (
    props.form.questions.map((question) => (
      <Paper
        key={question.id}
        elevation={props.state.selectedQuestion?.id === question.id ? 5 : 1}
        className={classes.paper}
        onClick={() => props.onSelectedQuestion(question)}
        style={{
          cursor:
            props.state.selectedQuestion?.id === question.id ? "" : "pointer",
        }}
      >
        <div className={classes.containerItem}>
          <div className={classes.containerQuestion}>
            <div className={classes.question}>
              <TextField
                id="filled-basic"
                label="Pregunta"
                variant="filled"
                //   value={questionValue}
                //   onChange={(event) =>
                //     props.onUpdateQuestion({
                //       question: event.target.value,
                //       type: "",
                //     })
                //   }
                //   disabled={!(props.state.selectedQuestion.id === question.id)}
              />
            </div>
            <div className={classes.typeQuestions}>
              <FormControl
                variant="outlined"
                fullWidth
                //   disabled={!(props.state.selectedQuestion.id === question.id)}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Tipo de pregunta
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={""}
                  // onChange={(event) => setType(event.target.value)}
                  label="Tipo de pregunta"
                >
                  <MenuItem value={""}>Texto corto</MenuItem>
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
        </div>
      </Paper>
    ))
  ) : (
    <div>No hay preguntas</div>
  );
}

export default AnswerForm;
