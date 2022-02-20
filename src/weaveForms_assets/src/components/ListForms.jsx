// import { makeStyles } from "@mui/material/styles";
import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import React from "react";
import theme from '../theme';

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';

const styles = {
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
};

const randomColors = [
  {
  backgroundColor: "#3B444B",
  height: "250px",
  },
  {
  backgroundColor: "#B2BEB5",
  height: "250px",
  },
  {
  backgroundColor: "#848482",
  height: "250px",
  },
  {
  backgroundColor: "#54626F",
  height: "250px",
  },
  {
  backgroundColor: "#4A646C",
  height: "250px",
  },
  {
  backgroundColor: "#DCDCDC",
  height: "250px",
  },
  {
  backgroundColor: "#5E716A",
  height: "250px",
  },
  {
  backgroundColor: "#6082B6",
  height: "250px",
  },
  {
  backgroundColor: "#00FFFF",
  height: "250px",
  },
  {
  backgroundColor: "#4A646C",
  height: "250px",
  },{
  backgroundColor: "#00FFFF",
  height: "250px",
  },
  {
  backgroundColor: "#0096FF",
  height: "250px",
  },
  {
  backgroundColor: "#00A36C",
  height: "250px",
  },
  {
  backgroundColor: "#5D3FD3",
  height: "250px",
  },
  {
  backgroundColor: "#9FE2BF",
  height: "250px",
  },
  {
  backgroundColor: "#40B5AD",
  height: "250px",
  },
  {
  backgroundColor: "#CCCCFF",
  height: "250px",
  },
  {
  backgroundColor: "#191970",
  height: "250px",
  },
  {
  backgroundColor: "#008080",
  height: "250px",
  },
] 

function ListForms(props) {
  // const classes = useStyles();

  return (
    <>
    {
    props.state.forms &&
    Object.keys(props.state.forms) != 'err' &&
    props.state.forms.map((item, i) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
      <Card>
        <CardMedia
          sx={randomColors[Math.floor(Math.random() * 19)]}
          image={item.image}
          title="Imagen de formulario"
        ></CardMedia>
        <CardContent>{item.formBase.title}</CardContent>
        {
        props.state.page.title == "owned" ?
          <CardActions sx={styles.cardAction}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              sx={styles.shareBtn}
              onClick={() => {
                props.onSelected(item);
                props.setOpenShareDialog(true);
              }}
            >
              Share
            </Button>
            <IconButton
              size="small"
              color="primary"
              key="delete"
              id="delete"
              onClick={() => {
                props.onSelected(item);
                props.setOpenDeleteAlert(true)
              }}
            >
              <DeleteIcon color="primary" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              onClick={async () => {
                const res = await props.getFormAnswers(item.id, props.state);
                await props.onSelected(res.forms);
                props.setOpenAnswersDialog(true);
              }}
            >
              <VisibilityIcon color="primary" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                props.onSelected(item);
                props.setOpenFormDialog(true);
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
          </CardActions>
          :
          props.state.page.title == "answered" &&
          <CardActions sx={styles.cardAction}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                props.onSelected(item);
                props.setOpenViewDialog(true);
              }}
            >
              <VisibilityIcon color="primary" />
            </IconButton>
          </CardActions>
        }
      </Card>
    </Grid>
  ))
}
</>
)
}

export default ListForms;
