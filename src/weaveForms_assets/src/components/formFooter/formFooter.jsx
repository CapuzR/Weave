import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";

import Switch from "@mui/material/Switch";
import service from "./service";

import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function FormFooter(props) {
    const [ NFTList, setNFTList ] = useState();
    const [ selNL, setSelNL ] = useState(props.state.selectedForm.nFTCol);

    useEffect(()=>{
        getNFTList();
    }, []);

    return (
        <Grid container alignItems="center" justifyContent="space-between">
            {
            props.mode == "write" ?
            <>
                <Grid item xs={6}>
                        <Grid component="label" container alignItems="center" justifyContent="center" spacing={0}>
                            <Grid item xs={4} sx={{ textAlign : "right" }}>
                                <Tooltip title="Public">
                                    <PublicIcon fontSize="small" />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign : "center" }}>
                                <Switch
                                checked={ "pub" in props.fType ? false : true }
                                onChange={ e => "pub" in props.fType ? props.setFType({ priv : null }) : props.setFType({ pub : null }) }
                                name="fType"
                                disabled 
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Tooltip title="Private">
                                    <LockIcon fontSize="small" />
                                </Tooltip>
                            </Grid>
                        </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container alignItems="center" textAlign="center">
                        <Grid item xs={6}>
                            <Button
                            variant="outlined"
                            onClick={() => {
                                props.onClose();
                                props.onSelectedForm(undefined);
                            }}
                            color="primary"
                            size="small"
                            >
                            Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>{
                                if(props.state.selectedQuestion) {
                                let form = {
                                    formBase: {
                                        title: props.title,
                                        description: props.description,
                                    },
                                    fType: props.fType,
                                    sharedWith: props.state.selectedForm.sharedWith ? props.state.selectedForm.sharedWith : [{ ppal : JSON.parse(localStorage.getItem('_scApp')).principal, sType : { owner : null } }],
                                    questions: props.state.selectedForm.questions,
                                    nFTCol: selNL
                                }
                                if("id" in props.state.selectedForm) {
                                    form.id = typeof props.state.selectedForm.id == "string" ? parseInt(props.state.selectedForm.id) : props.state.selectedForm.id;
                                }
                                props.onAccept(form);
                                props.setTitle("");
                                props.setDescription("");
                                } else {
                                window.alert("Please include at least 1 question.");
                                }
                            }
                            }
                            color="primary"
                            >
                            Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container alignItems="center" textAlign="center">
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">NFT List</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selNL}
                                label="Age"
                                onChange={(e)=>setSelNL(e.target.value)}
                                >
                                {
                                    NFTList &&
                                    NFTList.map((coll)=> (
                                        <MenuItem value={coll.name}>{coll.name}</MenuItem>
                                    ))
                                }
                                <MenuItem value="None">None</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </> :
            <>
            <h1></h1>
            </>
            }
        </Grid>
    );

    async function getNFTList() {
        const nfts = await service.getNFTList();
        setNFTList(nfts);
    }

};

export default FormFooter;
