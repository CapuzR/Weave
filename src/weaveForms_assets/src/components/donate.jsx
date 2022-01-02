import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Donate() {
    const navigate = useNavigate();    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
  return (
    // <Grid item xs={3}>
    //     <Box sx={style}>
            <Grid container spacing={3} sx={{ width: '100%', textAlign: "center", width: 400, position: 'relative', padding:0 , margin: 0 }}>
                <Grid item xs={12} sx={{ padding:0 , margin: 0 }}>
                    <Button 
                        variant="contained"
                        onClick={(e)=>{handleOpen()}}
                        sx={{
                            backgroundImage: "linear-gradient(to right, #7474BF 0%, #348AC7  51%, #7474BF  100%)",
                            boxShadow: '0 0 20px #eee',
                            color: "#fff", 
                            padding: 0, 
                            margin: 0,
                            width: 200,
                            height: 75,
                            borderRadius: 10
                        }}
                        >
                           ♥  Donate
                    </Button>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thanks!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        This will help us develop more functionalities to improve the IC ecosystem and create awesome projects. Roadmap soon.
                    </Typography>
                    <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Tip:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Feel free to transfer whatever amount you consider to this address: mlvdq-eg2nv-zsiyw-gc5yk-mvwsn-wd3m6-a2d2i-tf2lf-xbpvu-yhfzb-sqe
                    </Typography>
                    </Box>
                </Modal>
            </Grid>
    //     </Box>
    // </Grid>
  );

}
