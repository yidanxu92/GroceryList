import React,{useState} from 'react';
import './index.css';

const DataInput =({addItem})=>{

    const [userInput,setUserInput] = useState('');

    const handleChange = (e) =>{
        const re = /^[A-Za-z0-9 \-\.\?\!]+$/;
        if (e.target.value === "" || re.test(e.target.value))
            setUserInput(e.currentTarget.value)
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
            <input className="submission-line_input" value = {userInput} type = "text" onChange = {handleChange} placeholder ="Enter new item here..."/>
            <button className="submission-line_btn">Add</button>
        </form>

    )


}




export default DataInput;