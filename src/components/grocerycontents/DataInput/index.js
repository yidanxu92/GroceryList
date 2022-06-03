import React, {useState} from 'react';
import './index.css';
const DataInput = ({addItem,thisColumns})=> {

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
    }*/

    const selectStore = (e)=>{
        e.preventDefault();

        let storeName = e.target.value;
        if(userInput ==="")return;
        console.log("selectStore is being called!!")
        console.log("the e.target.value is ",storeName)


        if(storeName !== "")
        {
            storeName = storeName.replace(/ /g, '');
            storeName=storeName.replace("'", "")
            setStoreChoice(storeName);
        }


            addItem(userInput,storeName);
            setUserInput("");
            setStoreChoice("");

    }


    return(
        <form onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }} >
            <input className="submission-line_input" value = {userInput} type = "text" onChange = {handleChange} placeholder ="Enter new item here..."/>
            <select className="submission-line_select" value={storeChoice} onChange = {selectStore}>
                <option>Select</option>
                {
                Object.entries(thisColumns).map(([columnId,column]) =>{
                    return <option key={columnId}>{column.columnName}</option>
                })}

            </select>
        </form>

    )


}


/* <button className="submission-line_btn">+</button>*/

/* <option value="">Select Store</option>
               <option value="Aldi">Aldi</option>
               <option value="AsianMarket" >Asian Market</option>
               <option value="TraderJoe">Trader Joe</option>
               <option value="Walmart">Walmart</option>
               <option value="Wegmans">Wegmans</option>
               <option value="Others">Others</option> */

export default DataInput;