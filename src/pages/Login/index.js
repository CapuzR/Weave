import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  TextField,
  Container,
  Button,
  Typography,
} from "@material-ui/core";

import service from "./service";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Login({ history }) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Ingresa
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => onSignIn(event)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="Usuario"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="Contrase;a"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
        </form>
      </div>
    </Container>
  );

  function onSignIn(event) {
    event.preventDefault();
    service.onSignIn();
    history.replace("/main");
  }
}

export default Login;
