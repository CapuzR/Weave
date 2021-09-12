import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import FileCopyIcon from "@material-ui/icons/FileCopy";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles(() => ({
  urlContainer: {
    width: "100%",
    borderRadius: "8px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
    padding: "4px",
  },
  copyIcon: {
    marginLeft: "auto",
  },
  containerAddUser: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "24px",
  },
  emailContainer: {
    width: "45%",
    marginRight: "4px",
  },
  roleContainer: {
    width: "45%",
  },
  addUser: {
    marginLeft: "auto",
  },
  listSharedContainer: {
    marginTop: "24px",
  },
  titleSharedList: {
    fontSize: "14px",
    fontWeight: "600",
  },
  listContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
  },
}));
function ShareForm(props) {
  const classes = useStyles();
  const items = [
    {
      id: 0,
      email: "test@test.com",
      role: "Lectura",
    },
    {
      id: 1,
      email: "test2@test2.com",
      role: "Escritura",
    },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className={classes.urlContainer}>
          <div>Aqui el url</div>
          <div className={classes.copyIcon}>
            <IconButton color="primary">
              <FileCopyIcon color="primary" fontSize="small" />
            </IconButton>
          </div>
        </div>
        <div className={classes.containerAddUser}>
          <div className={classes.emailContainer}>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              fullWidth
            />
          </div>
          <div className={classes.roleContainer}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Rol
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={10}
                // onChange={(event) => setType(event.target.value)}
                label="Rol"
              >
                <MenuItem value={10}>Lectura</MenuItem>
                <MenuItem value={20} disabled>
                  Escritura
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.addUser}>
            <IconButton color="primary">
              <AddCircleIcon fontSize="small" color="primary" />
            </IconButton>
          </div>
        </div>
        <div className={classes.listSharedContainer}>
          <div className={classes.titleSharedList}>Titulo</div>
          {items.length > 0 ? (
            items.map((item) => (
              <div className={classes.listContainer} key={item.id}>
                <div className={classes.emailContainer}>{item.email}</div>
                <div clssName={classes.roleContainer}>{item.role}</div>
                <div className={classes.addUser}>
                  <IconButton color="primary">
                    <HighlightOffIcon fontSize="small" color="primary" />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className={classes.containerType}></div>
      </Grid>
    </Grid>
  );
}

export default ShareForm;
