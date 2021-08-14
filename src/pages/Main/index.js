import { makeStyles } from "@material-ui/core/styles";
import { Grid, Fab } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import Header from "../../components/Header";
import ListForms from "../../components/ListForms";

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

function Main() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header onLogout={() => console.log} />
      <div className={classes.container}>
        <Grid container spacing={2}>
          <ListForms />
        </Grid>
      </div>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon onClick={() => alert("create not working yet!!")} />
      </Fab>
    </div>
  );
}

export default Main;
