import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';




const Form = ({handleClose,arrayOfUnits,addToArray}) =>{
    const [itemName,setItemName] = useState('')
    const [itemAmount, setItemAmount] = useState("")
    const [itemUnit, setItemUnit] = useState('')

    /*
    This function will run after user clicks "finish". it first calls handleAdd ( the function below) which generate a new
    object based on user's input and add the object into the itemArray that stores each item of the recipe, then it closes the
    form(window).

    My current problem is that it seems like the last item user enters ( the one they entered right before they clicked
    "finish") never gets added to itemArray, even though console.log shows that handleAdd has been successfully called
    and the new object has been successfully created.

    Since everything else has been added successfully through handleAdd, I doubt it is handleAdd's problem.

    Right now it would work fine if I click "add more" each time I need to add a new item, then when it is empty, click
    "finish" just to close the window.

    The quickest way to fix is just have user click "add more" (maybe rename it to "add") when they need to add anything,
    then make them click "finish" to close window.

    But i really am curious what is wrong with my current functions.
     */
    const handleSubmit = (e) =>{
        e.preventDefault();
        handleClose();
    }

    /*
    This function will run after the user clicks "add more". It takes the three inputs the user typed in the form (itemName,
    itemAmount, itemUnit), then create a new object {itemName,itemAmount,itemUnit} and add it to the itemArray that stores
    each item of the recipe.

    In the end, it sets the form to empty so users can enter more items later.(since the user clicked "add more" instead of
    "finish", meaning they will add more later.
     */

    const handleAdd = () =>{

        console.log("handleSAdd is called!")
        console.log("itemName: ",itemName);
        console.log("itemAmount: ",itemAmount);
        console.log("itemUnit: ",itemUnit);
        let itemObj = {ingredient:"",amount:"",unit:""}
        itemObj.ingredient = itemName;
        itemObj.amount = itemAmount;
        itemObj.unit = itemUnit;
        console.log("itemObj is ",itemObj);
        addToArray(itemObj);
        setItemName('');
        setItemAmount('');
        setItemUnit('');

    }


    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}} >
               <FormControl variant = "outlined">
                   <OutlinedInput
                       id="outlined-adornment-name"
                       value = {itemName}
                       onChange={(e) => setItemName(e.target.value)}
                       aria-describedby="component-helper-text"
                   />
                   <FormHelperText id="component-helper-text">
                       item name
                   </FormHelperText>

               </FormControl>

            <FormControl  variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={itemAmount}
                    onChange={e => setItemAmount(e.target.value)}
                    aria-describedby="outlined-weight-helper-text"
                />
                <FormHelperText id="outlined-weight-helper-text">amount</FormHelperText>
            </FormControl>

                <TextField
                    id="outlined-select-unit"
                    select
                    label="select"
                    value={itemUnit}
                    onChange={e => {setItemUnit(e.target.value);}}
                    helperText="unit"

                    >
                    {arrayOfUnits.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

            </Box>

            <div>
                <Button variant="contained" onClick = {handleAdd}>
                    Add
                </Button>
                <Button type="submit" variant="contained" color="primary" >
                    Finish
                </Button>
            </div>



        </form>
    )

};


export default Form;

