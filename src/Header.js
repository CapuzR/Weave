import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  icon: {
    color: "#ffffff",
  },
}));

function Header(props) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <IconButton onClick={() => props.onLogout()}>
          <ExitToAppIcon className={classes.icon} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
