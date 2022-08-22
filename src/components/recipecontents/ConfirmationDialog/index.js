import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import create from 'zustand';


const useConfirmDialogStore = create((set) => ({
    title:'',
    message:'',
    onSubmit:undefined,
    close:() => set({onSubmit:undefined}),
}));

export const confirmDialog = (title,message, onSubmit) => {
    useConfirmDialogStore.setState({
        title,
        message,
        onSubmit,
    });
};

const ConfirmationDialog = ()=> {

    console.log("confirmation dialog is being called!")
    const { title, message, onSubmit, close } = useConfirmDialogStore();
    console.log("title is ",title)
    console.log("message is ", message)

    return (
        <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm" fullWidth>
            <DialogTitle>
                <span style={{color: 'black'}}>{title}</span>
            </DialogTitle>
            <Box position="absolute" top={0} right={0}>
                <CloseIcon onClick={close}/>
            </Box>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" onClick={close}>
                    Cancel
                </Button>
                <Button color="secondary" variant="contained"
                        onClick={() => {
                            if (onSubmit)
                            {
                                onSubmit();
                            }
                            close();
                }}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>

    );
};

export default ConfirmationDialog;

