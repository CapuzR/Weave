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
            <Tab label={item.name} />
          ))}
        </Tabs>
      </Paper>
    </div>
  );
}

export default TabNavigation;
