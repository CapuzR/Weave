import React from "react";
import Modal from '../modal';

import QAndA from "../../components/q&A/q&A";
import {
    Grid
  } from "@mui/material";

function ViewModal(props) {

    return (
        <Grid container sx={{ maxWidth: "200px" }}>
            <Modal
            mode="read"
            openDialog={props.openViewDialog}
            onSelectedForm={props.onSelectedForm}
            state={props.state}
            onClose={props.setOpenViewDialog}
            >
                <QAndA mode="read" state={props.state} setState={props.setState} />
            </Modal>
        </Grid>
    );


};

export default ViewModal;