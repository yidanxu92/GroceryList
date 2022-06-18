import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import ModalForm from '../ModalForm/form.js';


const Modal = ({open,handleClose,arrayOfUnits,addToArray}) =>{
    console.log("This is from modal ",open);

    return (
        <Dialog open={open} onClose ={handleClose}>
            <ModalForm handleClose={handleClose} arrayOfUnits={arrayOfUnits}
                       addToArray={addToArray}></ModalForm>
        </Dialog>

    );
};

export default Modal;