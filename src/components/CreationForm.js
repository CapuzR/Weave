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
    height: "120px",
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
    // border: "solid 1px",
    marginRight: "8px",
    // padding: "12px",
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
      <DialogContent className={classes.container}>
        <Paper elevation={3}>
          <div className={classes.containerItem}>
            <div className={classes.containerQuestion}>
              <div className={classes.question}>
                <TextField
                  id="filled-basic"
                  label="Pregunta"
                  variant="filled"
                />
              </div>
              <div className={classes.typeQuestions}>
                <FormControl variant="outlined" fullWidth>
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
            <div className={classes.containerActions}>
              <IconButton disabled className={classes.duplicateIcon}>
                <FileCopyIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </Paper>
        <Paper>
          <div className={classes.containerItem}>
            <div className={classes.containerQuestion}>
              <div className={classes.question}>
                <TextField
                  id="filled-basic"
                  label="Pregunta"
                  variant="filled"
                />
              </div>
              <div className={classes.typeQuestions}>
                <FormControl variant="outlined" fullWidth>
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
          </div>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpenDialog(false)} color="primary">
          Disagree
        </Button>
        <Button
          onClick={() => props.setOpenDialog(false)}
          color="primary"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreationForm;
