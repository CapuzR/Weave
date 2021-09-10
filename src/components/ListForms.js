import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    padding: "24px",
  },
  media: {
    height: "250px",
  },
  cardAction: {
    justifyContent: "flex-end",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ListForms(props) {
  const classes = useStyles();

  return props.forms.map((item) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
      <Card>
        <Link style={{ textDecoration: "none" }} to={`/main/${item.id}`}>
          <CardActionArea
            onClick={() => {
              props.onSelected(item);
              props.setOpenDialog(true);
            }}
          >
            <CardMedia
              className={classes.media}
              image={item.image}
              title="Imagen de formulario"
            ></CardMedia>
            <CardContent>{`Informacion del formulario ${item.id}`}</CardContent>
          </CardActionArea>
        </Link>

        <CardActions className={classes.cardAction}>
          <Button
            size="small"
            color="primary"
            onClick={() => props.onDelete(item.id)}
          >
            Delete
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));
}

export default ListForms;
