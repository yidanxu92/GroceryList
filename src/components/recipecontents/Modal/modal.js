import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import ModalForm from '../ModalForm/form.js';


const Modal = ({open,handleClose,localInput,arrayOfUnits}) =>{
    console.log("This is from modal ",open);

    return (
        <Dialog open={open} onClose ={handleClose}>
            <ModalForm handleClose={handleClose} localInput={localInput} arrayOfUnits={arrayOfUnits}></ModalForm>
        </Dialog>

    );
};

export default Modal;