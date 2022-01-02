// import { makeStyles } from "@mui/material/styles";
import { Paper, Tabs, Tab } from "@mui/material";
import React from "react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "12px",
  },
  paper: {
    width: "fit-content",
    borderRadius: "8px",
  },
};

function FormNavigation(props) {

  const items = [
    {
      id: 0,
      name: "owned",
      disabled: false
    },
    {
      id: 1,
      name: "answered",
      disabled: false
    },
    {
      id: 2,
      name: "Shared with me",
      disabled: true
    },
  ];

  return (
    <div style={styles.container}>
      <Paper square sx={styles.paper}>
        <Tabs
          value={props.page.id}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, value) =>
            {
              props.init(items.find((item) => item.id === value).name);
              props.onChangePage(items.find((item) => item.id === value))
              props.setMode(props.mode ==="write" ? "read" : "write");
            }
          }
          aria-label="disabled tabs example"
        >
          {items.map((item) => (
            <Tab label={item.name} key={item.id} disabled={item.disabled} />
          ))}
        </Tabs>
      </Paper>
    </div>
  );
}

export default FormNavigation;
