import { useState, useEffect } from "react";
// import { makeStyles } from "@mui/material/styles";
import { Grid, Fab } from "@mui/material";
import React from "react";
import theme from '../../theme';

import AddIcon from "@mui/icons-material/Add";

import ListForms from "../../components/ListForms";
import FormNavigation from "../../components/FormNavigation";

import FormModal from "../../components/formModal/formModal";
import ViewModal from "../../components/viewModal/viewModal";
import AnswersModal from "../../components/answersModal";
import AlertDialog from "../../components/alertDialog";
import ShareModal from "../../components/shareModal";

import loginServices from "../Login/service";
import service from "./service";
import { useNavigate } from "../../../../../node_modules/react-router-dom/index";

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  container: {
    padding: "34px",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
};

function Main({ history, setLoading }) {
  const [state, setState] = useState(service.state);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openAnswersDialog, setOpenAnswersDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [ mode, setMode ] = useState("write");
  const navigate = useNavigate();

  useEffect(async () => {
    if( localStorage.getItem("_scApp") ) {
      init(state.page.title);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <FormNavigation page={state.page} onChangePage={onChangePage} setMode={setMode} init={init} />
        {
        // state.page.id === 0 ? (
          <Grid container spacing={2}>
            {
            state.forms &&
            <ListForms
              state= {state}
              forms={state.forms}
              onSelected={onSelectedForm}
              setOpenShareDialog={setOpenShareDialog}
              setOpenFormDialog={setOpenFormDialog}
              setOpenViewDialog={setOpenViewDialog}
              setOpenAnswersDialog={setOpenAnswersDialog}
              getFormAnswers={getFormAnswers}
              setOpenDeleteAlert={setOpenDeleteAlert}
            />
            }
          </Grid>
        // ) : state.page.id === 1 && (
        //   <></>
        // )
        }
      </div>
      <Fab color="primary" aria-label="add" sx={styles.fab}>
        <AddIcon
          onClick={async () => {
            setOpenFormDialog(true);
            const forms = JSON.parse(localStorage.getItem('ownedForms'));
            let form = {
              formBase: {
                title: "",
                description: ""
              },
              questions: [],
              description: "",
              nFTCol: "None"
            }
            
            if(forms?.length > 0){
                form.id = forms[forms.length-1].id + 1;
            } else {
              form.id = await getNextFTId();
            }
            onSelectedForm(form);
          }}
        />
      </Fab>

      {/* Modals */}
      {
        state.selectedForm &&
        <>
        <FormModal
          mode={mode}
          state={state}
          setState={setState}
          onSelectedForm={onSelectedForm}
          openDialog={openFormDialog}
          setOpenDialog={setOpenFormDialog}
          setLoading={setLoading}
        />
        <ShareModal
          mode={mode}
          onSelectedForm={onSelectedForm}
          state={state}
          openDialog={openShareDialog}
          setOpenDialog={setOpenShareDialog}
          setLoading={setLoading}
        />
        <AnswersModal
          mode={"read"}
          onSelectedForm={onSelectedForm}
          state={state}
          setState={setState}
          openAnswersDialog={openAnswersDialog}
          setOpenAnswersDialog={setOpenAnswersDialog}
          setLoading={setLoading}
        />
        <ViewModal
          mode={"read"}
          onSelectedForm={onSelectedForm}
          state={state}
          setState={setState}
          openViewDialog={openViewDialog}
          setOpenViewDialog={setOpenViewDialog}
          setLoading={setLoading}
        />
        <AlertDialog
          state= {state}
          openDialog={openDeleteAlert}
          setOpenDialog={setOpenDeleteAlert}
          onDelete={onDeleteForm}
        />
        </>
}
    </div>
  );

  async function getFormAnswers(id, statef) {
    setLoading(true);
    const result = await service.getFormAnswers(id, statef);
    setState(result);
    setLoading(false);
    return result;
  };

  async function getNextFTId() {
    setLoading(true);
    const result = await service.getNextFTId();
    setLoading(false);
    return result;
  };
  
  async function init(formType) {
    setLoading(true);
    const result = await service.init(formType, state).then(setState);
    setLoading(false);
    return result;
  }

  async function onSignOut() {
    await service.onSignOut();
    history.replace("/");
  }

  function onSelectedForm(form) {
    return service.onSelectedForm({ state, form }).then(setState);
  }

  async function onDeleteForm(id) {
    setLoading(true);
    const result = await service.onDeleteForm(id, state);

    if(result) {
      Object.assign({}, state, {
        selectedForm: undefined,
        selectedQuestion: undefined,
      });
      location.reload();
    } else {
      window.alert("Form couldn't be deleted, please check and try again.");
      setLoading(false);
    }
  }

  function onChangePage(page) {
    return service.onChangePage({ state, page }).then(setState);
  }

}

export default Main;
