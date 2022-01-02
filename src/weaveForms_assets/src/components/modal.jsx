
import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import FormHeader from "./formHeader";
import FormFooter from "./formFooter/formFooter";

function Modal(props) {
  // const [ title, setTitle ] = useState(props.mode == "multi" ? props.state.selectedForm[props.formPage].formBase.title : props.state.selectedForm.formBase.title);
  const [ title, setTitle ] = useState(Array.isArray(props.state.selectedForm) ? props.state.selectedForm[props.formPage || 0].formBase.title : props.state.selectedForm.formBase.title);

  const [ description, setDescription ] = useState(Array.isArray(props.state.selectedForm) ? props.state.selectedForm[props.formPage || 0].formBase.description : props.state.selectedForm.formBase.description);

  const [ fType, setFType ] = useState(Array.isArray(props.state.selectedForm) ? props.state.selectedForm[props.formPage || 0].formBase.fType : props.state.selectedForm.fType || { pub : null });


  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.onClose();
        props.onSelectedForm(undefined);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle sx={{ width: "90%", padding: 2 }} id="alert-dialog-title">
        <FormHeader mode={props.mode} title={title} description={description} setTitle={setTitle} setDescription={setDescription} />
      </DialogTitle>
      <DialogContent
        sx={{ width: "95%", padding: 1 }}
        id="creation-forms-container"
      >
        {props.children}
      </DialogContent>
      {
        props.mode == "write" &&
        <DialogActions sx={{ width: "95%", padding: 1 }}>
          <FormFooter 
          mode={props.mode} 
          fType={fType} 
          setFType={setFType} 
          onClose={props.onClose} 
          state={props.state} 
          onAccept={props.onAccept} 
          setTitle={setTitle} 
          setDescription={setDescription}
          title={title}
          description={description}
          onSelectedForm={props.onSelectedForm}
          />
        </DialogActions>
      }
    </Dialog>
  );
}

export default Modal;
