import React, { useState } from "react";
import Modal from './modal';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import QAndA from "./q&A/q&A";

function AnswersModal(props) {
    const [ page, setPage ] = useState(1);
    return (
        <Modal
          mode="multi"
          formPage={page-1}
          openDialog={props.openAnswersDialog}
          onSelectedForm={props.onSelectedForm}
          state={props.state}
          onClose={props.setOpenAnswersDialog}
        >
            <>
                <Stack spacing={2}>
                    <Pagination count={props.state.selectedForm.length} onChange={(e, v)=>{setPage(v)}} page={page} color="primary" />
                </Stack>
                <QAndA mode="multi" state={props.state} formPage={page-1} setState={props.setState} />
            </>
        </Modal>
    );


};

export default AnswersModal;