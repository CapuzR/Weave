import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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
  shareBtn: {
    marginRight: "auto",
  },
}));

function ListForms(props) {
  const classes = useStyles();

  return props.forms.map((item) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
      <Card>
        <CardMedia
          className={classes.media}
          image={item.image}
          title="Imagen de formulario"
        ></CardMedia>
        <CardContent>{`Informacion del formulario ${item.id}`}</CardContent>

        <CardActions className={classes.cardAction}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            className={classes.shareBtn}
            onClick={() => {
              props.setOpenShareDialog(true);
              props.onSelected(item);
            }}
          >
            Shared
          </Button>
          <IconButton
            size="small"
            color="primary"
            onClick={() => props.onDelete(item.id)}
          >
            <DeleteIcon color="primary" />
          </IconButton>
          <IconButton
            size="small"
            color="primary"
            onClick={() => {
              props.onSelected(item);
              props.setOpenDialog(true);
            }}
            // onClick={() => props.onDelete(item.id)}
          >
            <EditIcon color="primary" />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  ));
}

export default ListForms;
