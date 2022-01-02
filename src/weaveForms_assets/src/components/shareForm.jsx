
import {
  Grid,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const styles = {
  urlContainer: {
    width: "100%",
    borderRadius: "8px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
    padding: "5px",
    fontSize: "15px"
  },
  copyIcon: {
    marginLeft: "auto",
  },
  soon: {
    width: "100%",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    marginTop: "24px",
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
};
function ShareForm(props) {
  const items = [
    {
      id: 0,
      email: "Principal 1",
      role: "Read only",
    },
    {
      id: 1,
      email: "Principal 2",
      role: "Read & write",
    },
  ];
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div style={styles.urlContainer}>
          <p>{"7jb66-saaaa-aaaak-aacdq-cai.raw.ic0.app/#/form/" + props.state.selectedForm.id}</p>
          <div style={styles.copyIcon}>
            <IconButton color="primary">
              <FileCopyIcon onClick={()=>{navigator.clipboard.writeText("7jb66-saaaa-aaaak-aacdq-cai.raw.ic0.app/#/form/" + props.state.selectedForm.id)}} color="primary" fontSize="small" />
            </IconButton>
          </div>
        </div>
        <div style={styles.soon}>
          <div style={{ width: "100%" }}>--------------Soon--------------</div>
        </div>
        <div style={styles.containerAddUser}>
          <div style={styles.emailContainer}>
            <TextField
              id="filled-basic"
              label="Principal"
              variant="filled"
              fullWidth
              disabled
            />
          </div>
          <div style={styles.roleContainer}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel disabled id="demo-simple-select-outlined-label">
                Rol
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={10}
                // onChange={(event) => setType(event.target.value)}
                label="Rol"
                disabled
              >
                <MenuItem value={10}>Lectura</MenuItem>
                <MenuItem value={20} disabled>
                  Escritura
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={styles.addUser}>
            <IconButton color="primary" disabled>
              <AddCircleIcon fontSize="small" color="primary" />
            </IconButton>
          </div>
        </div>
        <div style={styles.listSharedContainer}>
          <div style={styles.titleSharedList}>Shared with</div>
          {items.length > 0 ? (
            items.map((item) => (
              <div style={styles.listContainer} key={item.id}>
                <div style={styles.emailContainer}>{item.email}</div>
                <div style={styles.roleContainer}>{item.role}</div>
                <div style={styles.addUser}>
                  <IconButton color="primary" disabled>
                    <HighlightOffIcon fontSize="small" color="primary" />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div sx={styles.containerType}></div>
      </Grid>
    </Grid>
  );
}

export default ShareForm;
