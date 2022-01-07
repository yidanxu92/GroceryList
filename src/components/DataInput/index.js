import React,{useState} from 'react';
import './index.css';

const DataInput =({addItem})=>{

    const [userInput,setUserInput] = useState('');

    const handleChange = (e) =>{

        if(e.currentTarget.value !== ""){
            setUserInput(e.currentTarget.value)
        }

    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(userInput!==""){
            addItem(userInput);
            setUserInput("");
        }

    }


    return(
        <form onSubmit={handleSubmit}>
            <input value = {userInput} type = "text" onChange = {handleChange} placeholder ="Enter items..."/>
            <button>Add</button>
        </form>

    )


}




export default DataInput;