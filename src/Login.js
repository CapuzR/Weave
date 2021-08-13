import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  TextField,
  Container,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Login(props) {
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
          onSubmit={(event) => {
            event.preventDefault();
            props.onLogin();
          }}
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
}

export default Login;
