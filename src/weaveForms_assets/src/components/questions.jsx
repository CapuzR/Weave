import { useState, useEffect } from "react";
// import { makeStyles } from "@mui/material/styles";
import React from "react";
import {
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const styles = {
  paper: {
    width: "40vh"
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
    minHeight: "130px",
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
};

function Questions(props) {
  // const classes = useStyles();
  const [qType, setQType] = useState({ shortAnswer : null });


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
            onClick={() => props.onSelectedQuestion(question)}
            sx={styles.paper}
            style={{
              cursor:
                props.state.selectedQuestion?.id === question.id
                  ? ""
                  : "pointer",
            }}
          >
            <div style={styles.containerItem}>
              <div style={styles.containerQuestion}>
                <div style={styles.question}>
                  <TextField
                    id="filled-basic"
                    label="Question"
                    variant="outlined"
                    multiline
                    value={question.question}
                    onChange={(event) =>
                      props.onUpdateQuestion({
                        question: event.target.value,
                        qType: qType,
                      })
                    }
                  />
                </div>
                <div style={styles.typeQuestions}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Question Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={Object.keys(question.qType)[0]}
                      onChange={(event) => setQType(event.target.value)}
                      label="Question Type"
                    >
                      <MenuItem value={"NFT"} disabled>NFT</MenuItem>
                      <MenuItem value={"principal"} disabled>Wallet</MenuItem>
                      <MenuItem value={"icDrive"} disabled>ICDrive</MenuItem>
                      <MenuItem value={"upload"} disabled>Upload</MenuItem>
                      <MenuItem value={"DeSo"} disabled>DeSo</MenuItem>
                      <MenuItem value={"shortAnswer"}>Short answer</MenuItem>
                      <MenuItem value={"text"} disabled>Text</MenuItem>
                      <MenuItem value={"paragraph"} disabled>Paragraph</MenuItem>
                      <MenuItem value={"multipleChoice"} disabled>Multiple choice</MenuItem>
                      <MenuItem value={"checkboxes"} disabled>Checkboxes</MenuItem>
                      <MenuItem value={"dropdown"} disabled>Dropdown list</MenuItem>
                      <MenuItem value={"date"} disabled>Date</MenuItem>
                      <MenuItem value={"time"} disabled>Time</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              {
              !props.state.forms.find(
                (form) => form.id === props.state.selectedForm?.id
              ) && (
                props.state.selectedQuestion?.id === question.id ? (
                  <div style={styles.containerActions}>
                    <IconButton disabled style={styles.duplicateIcon}>
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
              )}
            </div>
          </Paper>
        ))
      ) : (
        <div style={{ paddingLeft: 1 }}>No questions.</div>
      )}
      {/* {!props.isShare &&
      !props.state.forms.find(
        (form) => form.id === props.state.selectedForm?.id
      ) ? ( */}
        <div style={styles.addQuestionContainer}>
          <IconButton
            color="primary"
            onClick={() => {
                props.onAddedQuestion({
                  id: props.state.selectedForm?.questions.length + 1,
                  question: "",
                  qType: qType,
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
      {/* ) : (
        <></>
      )} */}
    </>
  );
}

export default Questions;
