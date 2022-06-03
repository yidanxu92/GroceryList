import React, {useState} from 'react';
import ContentEditable from 'react-contenteditable';
import  './index.css'

const DataOutput =({userInput,arrayOfUnits})=> {

    console.log("This is DataOutput");
    console.log("userInput is",userInput);
    const arr = JSON.parse(localStorage.getItem(userInput))===null?[]:JSON.parse(localStorage.getItem(userInput));
    console.log("the length of arr is ",arr.length);

    const submitEdit = (e) =>{
        const re = /^[A-Za-z0-9 \-\.\?\!]+$/;
        if (re.test(e.target.value))
            console.log(re.test(e.target.value))
    }

    return (
        <div
            className="recipeColumn"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >

            <div className="titleSection">
                <h2>{userInput}</h2>

            </div>
            <div className = "contentSection">
                {arr.map((item,index)=>{
                    let keyName = userInput+index;
                    let itemUnit = item['unit'];
                    console.log(itemUnit);
                    return(
                        <div key={keyName} className="item-div" style={{background: "#d8caaf"}}>
                            <ContentEditable html={item['ingredient']} className="item-ingredient"
                                             onChange = {(e) => submitEdit(e)}></ContentEditable>
                            <ContentEditable html={item['amount']} className="item-amount"></ContentEditable>
                            <select className="item-unit">
                                <option key={item['unit']}>{item['unit']}</option>
                                {
                                    arrayOfUnits.map((option) =>{
                                        if(option !== item['unit'])
                                        {
                                            return <option key={option} value={option}>{option}</option>
                                        }

                                    })}
                                </select>


                        </div>
                        )



                })
                }
            </div>

        </div>
    )
}


export default DataOutput;
