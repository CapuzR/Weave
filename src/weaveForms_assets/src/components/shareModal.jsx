import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";

import ShareForm from './shareForm';
import Modal from './modal';



function ShareModal(props) {

    return (
        <Modal
          mode={"read"}
          openDialog={props.openDialog}
          onClose={() => {
            props.setOpenDialog(false);
            props.onSelectedForm(undefined);
          }}
          onAccept={() => {
            props.setOpenDialog(false);
          }}
          state={props.state}
        >
          <ShareForm
            state={props.state} 
          />
        </Modal>
    );

};

export default ShareModal;