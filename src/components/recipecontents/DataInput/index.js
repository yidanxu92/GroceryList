import React, {useState,useEffect} from 'react';
import './index.css';
import Popup from '../Popup/popup.js';
import Modal from '../Modal/modal.js';
import {getWithExpiry} from './../../stateStorageWithTTL';
import ConfirmationDialog from '../ConfirmationDialog/index.js';
import { confirmDialog } from '../ConfirmationDialog/index.js';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


/*const filter = createFilterOptions();
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));*/



const DataInput =({handleState,mainStructure,handleFormOpen,handleFormClose,open})=> {
    console.log("this is dataInput");

    /*This line returns all keys in localStorage to an array, then we can filter */

    let keys = Object.keys(localStorage);
    console.log(keys);

    const [localInput, setLocalInput] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);


    const handleChange = (e) => {
        e.preventDefault();
        console.log("we are in handleChange")


        const re = /^[A-Za-z0-9 \-\.\?\!]+$/;
        if (e.target.value === "" || re.test(e.target.value))
            setLocalInput(e.currentTarget.value)

      /*  if (newValue && newValue.inputValue){
            console.log("we have new input!")
            setLocalInput(newValue.inputValue)
        }
        else{
            setLocalInput(newValue)
        }*/

    }


   /* const handleOption = (option) => {
        console.log("handleOption is being called!")
        // Add "xxx" option created dynamically
        if (option.inputValue) {
            console.log("we found input value. inside if statement")
            return option.inputValue;
        }
        // Regular option
        return option;
    }*/

 /*   const handleFilter = (options, params)=>{
        console.log("handleFilter is being called!")
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== '' && !isExisting) {
            console.log("we found non existing value!")
            filtered.push({inputValue});
        }

        return filtered;

    }*/

    const handleOpen = () => {
        console.log("handleOpen is being called!")
        handleFormOpen();
        setButtonPopup(false);
        handleState(localInput);
        /* setLocalInput("");*/
    }


    const handlePopup = (e) =>{
        e.preventDefault();
        if(open){
            handleFormClose();
        }

        if (localInput in localStorage) {
            handleState(localInput);
            handleFormOpen();
        }

        else {
            setButtonPopup(!buttonPopup);
            confirmDialog('Item Not Found','We cannot find the recipe. Do you want to create a new one?', () => {
                console.log('we are about to call handleOpen()')
                handleOpen();
            })
        }

    }

   /* const handlePopup = (e) => {
        e.preventDefault();
        if (localInput in localStorage) {
            handleState(localInput);
            handleFormOpen();
        }

        else {
            setButtonPopup(!buttonPopup);
        }

    }*/





    return (

        <form>
            <input className="submission-line_input" value={localInput} type="text" onChange={handleChange}
                   placeholder="Enter here..."/>
            <button className="submission-line_select" onClick={handlePopup}>submit</button>

            {buttonPopup &&  <ConfirmationDialog />}

        </form>


        /*{open && <Modal open={open} handleClose={handleClose}
                            arrayOfUnits={arrayOfUnits} addToArray={addToArray}></Modal>}*/

        /*  {buttonPopup && <Popup
               content={<>
                   <h3>{localInput} does not exist in our storage.</h3>
                   <p>Do you want to create your own recipe?</p>
                   <button className='no-btn' onClick={handlePopup}>No</button>
                   <button className='yes-btn' onClick={handleOpen}>Yes</button>
               </>}
               handleClose={handlePopup}
           />}*/

        /* <Stack spacing={2} alignItems="center" direction="row">
         <Item>
             <Autocomplete id="input-textfield" value={localInput} onChange={handleChange}
                           filterOptions = {handleFilter}
                           selectOnFocus
                           clearOnBlur
                           handleHomeEndKeys
                           options={keys}
                           getOptionLabel = {handleOption}
                           renderOption = {(props, option) => <li {...props}>{option}</li>}
                           sx={{ width: 300 }}
                           renderInput={(params) => (
                               <TextField {...params} label="Enter Here..." />
                           )}
             />

         </Item>

          <Item>
              <Button  variant="contained" onClick={handlePopup}>submit</Button>
              {buttonPopup &&  <ConfirmationDialog />}
          </Item>



      </Stack>*/


    )
};

export default DataInput