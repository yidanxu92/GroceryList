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

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(userInput!=="" && storeChoice !==""){
            addItem(userInput,storeChoice);
            setUserInput("");
            setStoreChoice("");
        }
    }

    const selectStore = (e)=>{
        if(e.target.value !== "")
        {
            setStoreChoice(e.target.value);
            console.log(storeChoice);
        }

    }


    return(
        <form onSubmit={handleSubmit}>
            <button className="submission-line_btn">+</button>
            <input className="submission-line_input" value = {userInput} type = "text" onChange = {handleChange} placeholder ="Enter new item here..."/>
            <select className="submission-line_select" onChange = {selectStore}>
                <option value="">Select One</option>
                <option value="Aldi">Aldi</option>
                <option value="Asian Market" >Asian Market</option>
                <option value="Trader Joe">Trader Joe</option>
                <option value="Walmart">Walmart</option>
                <option value="Wegmans">Wegmans</option>
                <option value="Others">Others</option>


            </select>
        </form>

    )


}




export default DataInput;