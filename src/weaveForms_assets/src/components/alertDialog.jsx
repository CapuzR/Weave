
import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';

function AlertDialog(props) {

  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.setOpenDialog(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
      sx={{ zIndex: 0 }}
    >
      <DialogTitle sx={{ width: "90%", padding: 2 }} id="alert-dialog-title">
        Alert
      </DialogTitle>
      <DialogContent
        sx={{ width: "95%", padding: 1 }}
        id="creation-forms-container"
      >
          Are you sure you want to delete permanently this Form?
      </DialogContent>
      <DialogActions sx={{ width: "95%", padding: 1 }}>
        <Button
        size="small"
        variant="outlined"
        color="primary"
        >
        Cancel
        </Button>
        <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={() => props.onDelete(props.state.selectedForm.id, props.state)}
        >
        Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
