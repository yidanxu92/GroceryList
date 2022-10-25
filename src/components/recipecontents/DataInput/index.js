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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Axios from "axios";


/*const filter = createFilterOptions();*/
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const filter = createFilterOptions();

const DataInput =({handleState,mainStructure,handleFormOpen,handleFormClose,open})=> {
    console.log("this is dataInput");

    /*This line returns all keys in localStorage to an array, then we can filter */

    let keysFromStorage = Object.keys(localStorage);
    console.log("keysFromStorage is ",keysFromStorage)
    keysFromStorage = keysFromStorage.filter(data =>{return data !=='lastOpen'})
    console.log("keys (aka all the options) is", keysFromStorage);
    const menuOptions = []
    keysFromStorage.forEach((data) => menuOptions.push({name:data}) )
    console.log("menuOptions is", menuOptions);


    /* value is the food object user searched*/
    const [value, setValue] = useState(null);
    const [buttonPopup, setButtonPopup] = useState(false);
    console.log("current value is ",value)

    const APP_ID = "bbcd4249";
    const APP_KEY = "9e8db8688d1cfc220a5ce2b9df27c849";
    const url = `https://api.edamam.com/search?q=${value?.name}&app_id=${APP_ID}&app_key=${APP_KEY}&&health=alcohol-free`;
    const config = {
        url,
        headers:{
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    }

    const getData = async () => {
        console.log("we are in getData!")
        if (value.name !== "" || null){
            const result = await Axios.get(url);
            if (!result.data.more) {
                setButtonPopup(!buttonPopup);
                confirmDialog('Item Not Found','We cannot find the recipe. Do you want to create a new one?', () => {
                    console.log('we are about to call handleOpen()')
                    handleOpen();
                })

            }

            else{
                console.log("The result is ",result)
            }
        }



    }



    /* const handleChange = (e,newValue) => {
         e.preventDefault();
         console.log("we are in handleChange")
         console.log("newValue is ", newValue)


         const re = /^[A-Za-z0-9 \-\.\?\!]+$/;
         if (e.target.value === "" || re.test(e.target.value))
             setLocalInput(e.currentTarget.value)
         if(typeof newValue === 'string'){
             setLocalInput(newValue)
         }

         else if (newValue && newValue.inputValue){
             console.log("we have new input!")
             console.log("newValue.inputValue is ", newValue.inputValue)
             setLocalInput(newValue.inputValue)
         }
         else{
             setLocalInput(newValue)
         }

     }*/


   /* const handleChange = (e,newValue) => {
        e.preventDefault();
        console.log("handleChange is called!")
        console.log("newValue is ",newValue)
        setLocalInput(newValue)
    }*/
/*
    const handleOption = (option) => {
        console.log("handleOption is being called!")
        console.log("option is ",option)
        console.log("is the type of option a string?" ,(typeof option === 'string')?"yes":"no");

        if (typeof option === 'string') {
            console.log("we are inside option == string")
            return option;
        }

        // Add "xxx" option created dynamically


        if (option.inputValue) {
            console.log("we found input value. inside if statement")
            console.log("option.inputValue is ",option.inputValue);
            console.log("is the type of inputValue a string?" ,(typeof option.inputValue === 'string')?"yes":"no");
            return option.inputValue;
        }
        // Regular option

        console.log("we did not hit either option === string or option.inputvalue")
        return option;
    }

    /*const handleFilter = (keysFromStorage, params)=>{
        console.log("handleFilter is being called!")
        const filtered = filter(keysFromStorage, params);
        console.log("filtered is ", filtered)
        const {inputValue} = params;
        console.log("current params is ", params)
        console.log("current {inputValue} is ",{inputValue})

        // Suggest the creation of a new value
        const isExisting = keysFromStorage.some((option) => inputValue === option);
        if (inputValue !== '' && !isExisting) {
            filtered.push({inputValue});
            console.log("after push, filtered  array is ",filtered)
        }

        return filtered;

    }*/

    const handleOpen = () => {
        console.log("handleOpen is being called!")
        handleFormOpen();
        setButtonPopup(false);
        console.log("we are calling handleState with value: ",value.name)
        handleState(value.name);
        /* setLocalInput("");*/
    }


    const handlePopup = (e) =>{

        e.preventDefault();
        if(open){
            handleFormClose();
        }

        console.log("We are inside handlePopup. value is ", value?.name)
        if (value?.name in localStorage) {
            handleState(value.name);
            handleFormOpen();
        }

        else {
            getData();

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

       /* <form>
            <input className="submission-line_input" value={localInput} type="text" onChange={handleChange}
                   placeholder="Enter here..."/>
            <button className="submission-line_select" onClick={handlePopup}>submit</button>

            {buttonPopup &&  <ConfirmationDialog />}

        </form>*/


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

         <Stack spacing={2} alignItems="center" justifyContent="center" direction="row">
         <Item>
             <Autocomplete value={value}
                           freeSolo
                           options={menuOptions}
                           onChange={(e,newValue)=>{
                               console.log("we are in handleChange");
                               console.log("newValue is ", newValue);
                               if(typeof newValue === 'string')
                               {
                                   setValue({
                                       name:newValue,
                                   })
                               }
                               else if(newValue && newValue.inputValue)
                               {
                                   setValue({
                                       name:newValue.inputValue,
                                   })
                               }
                               else{
                                   setValue(newValue);
                               }

                           }}
                           
                           filterOptions = {(options,params) =>{
                               const filtered = filter(options, params);
                               const { inputValue } = params;
                               const isExisting = options.some((option)=> inputValue === option.name);
                               if (inputValue !== '' && !isExisting) {
                                   filtered.push({
                                       inputValue,
                                       name: `Add "${inputValue}"`,
                                   });
                               }
                               return filtered;

                           }}
                           selectOnFocus
                           clearOnBlur
                           handleHomeEndKeys
                           sx={{ width: 300 }}
                           getOptionLabel={(option) => {
                               // Value selected with enter, right from the input
                               if (typeof option === 'string') {
                                   return option;
                               }
                               // Add "xxx" option created dynamically
                               if (option.inputValue) {
                                   return option.inputValue;
                               }
                               // Regular option
                               return option.name;
                           }}
                           renderOption={(props, option) => <li {...props}>{option.name}</li>}
                           renderInput={(params) => (
                               <TextField {...params} label="Enter here..." />
                           )}




             />

         </Item>


             <Item>
                 <Button  variant="contained" onClick={handlePopup} disabled={value?false:true} sx={{color:"white",backgroundColor:"#511f1e"}}>submit</Button>
                 {buttonPopup &&  <ConfirmationDialog />}


             </Item>







      </Stack>


    )
};

export default DataInput