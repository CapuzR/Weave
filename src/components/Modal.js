import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import { IconButton, Button, Typography, Grid } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";

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
  switchContainer: {
    marginRight: "auto",
    marginLeft: "20px",
  },
  switchItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "600",
  },
  switch: {
    color: "red",
  },
}));

const CustomSwitch = withStyles({
  switchBase: {
    color: "#3F51B5",
    "&$checked": {
      color: "#3F51B5",
    },
    "&$checked + $track": {
      backgroundColor: "#000000",
    },
  },
  checked: {},
  track: {},
})(Switch);

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
          {!props.isShare &&
          !props.state.forms.find(
            (form) => form.id === props.state.selectedForm?.id
          ) ? (
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
        {props.isShare ? (
          <FormGroup className={classes.switchContainer}>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item className={classes.switchItem}>
                  {`Public `}{" "}
                  <PublicIcon fontSize="small" style={{ color: "#7e7e7e" }} />
                </Grid>
                <Grid item>
                  <CustomSwitch />
                  {/* <AntSwitch
                  checked={state.checkedC}
                  onChange={handleChange}
                  name="checkedC"
                /> */}
                </Grid>
                <Grid item className={classes.switchItem}>
                  {`Private `}{" "}
                  <LockIcon fontSize="small" style={{ color: "#7e7e7e" }} />
                </Grid>
              </Grid>
            </Typography>
          </FormGroup>
        ) : (
          <></>
        )}

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
