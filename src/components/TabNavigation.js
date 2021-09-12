import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "12px",
  },
  paper: {
    width: "fit-content",
    borderRadius: "8px",
  },
}));

function TabNavigation(props) {
  const classes = useStyles();

  const items = [
    {
      id: 0,
      name: "active",
    },
    {
      id: 1,
      name: "inactive",
    },
    {
      id: 2,
      name: "shared",
    },
  ];

  return (
    <div className={classes.container}>
      <Paper square className={classes.paper}>
        <Tabs
          value={props.page.id}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, value) =>
            props.onChangePage(items.find((item) => item.id === value))
          }
          aria-label="disabled tabs example"
        >
          {items.map((item) => (
            <Tab label={item.name} key={item.id} />
          ))}
        </Tabs>
      </Paper>
    </div>
  );
}

export default TabNavigation;
