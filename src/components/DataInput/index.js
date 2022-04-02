import React, {useState} from 'react';
import './index.css';

const DataInput =({addItem})=>{

    const [userInput,setUserInput] = useState('');
    const [storeChoice,setStoreChoice] = useState('');

    const handleChange = (e) =>{
        const re = /^[A-Za-z0-9 \-\.\?\!]+$/;
        if (e.target.value === "" || re.test(e.target.value))
            setUserInput(e.currentTarget.value)
    }
/*
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(userInput!=="" && storeChoice !==""){
            addItem(userInput,storeChoice);
            setUserInput("");
        }
    }
    */

    const selectStore = (e)=>{
        e.preventDefault();
        if(userInput ==="")return;

        if(e.target.value !== "" && e.target.value !== 'Select Store')
        {
            setStoreChoice(e.target.value);
        }


            addItem(userInput,e.target.value);
            setUserInput("");
            setStoreChoice('');




    }


    return(
        <form >
            <input className="submission-line_input" value = {userInput} type = "text" onChange = {handleChange} placeholder ="Enter new item here..."/>
            <select className="submission-line_select" onChange = {selectStore}>
                <option value="">Select Store</option>
                <option value="Aldi">Aldi</option>
                <option value="AsianMarket" >Asian Market</option>
                <option value="TraderJoe">Trader Joe</option>
                <option value="Walmart">Walmart</option>
                <option value="Wegmans">Wegmans</option>
                <option value="Others">Others</option>


            </select>
        </form>

    )


}


/* <button className="submission-line_btn">+</button>*/

export default DataInput;