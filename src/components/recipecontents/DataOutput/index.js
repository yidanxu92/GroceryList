import React, {useState} from 'react';
import ContentEditable from 'react-contenteditable';
import  './index.css'

const DataOutput =({userInput,arrayOfUnits,editArray,deleteArray,mainStructure})=> {

    console.log("This is DataOutput");
    console.log("userInput is",userInput);
    console.log("current mainArray under DataOutput is ",mainStructure[userInput]);
    console.log("current  mainStructure is ",mainStructure);


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
                {mainStructure[userInput] && mainStructure[userInput].map((item,index)=>{
                    let keyName = userInput+index;
                    console.log("current item is ",item);
                    console.log("current index is ",index);
                    return(
                        <div key={keyName} className="item-div" style={{background: "#d8caaf"}}>
                            <ContentEditable html={item['ingredient']} className="item-ingredient"
                                             onChange = {(e) => editArray(e,item['ingredient'],index)}></ContentEditable>
                            <ContentEditable html={item['amount']} className="item-amount"
                                             onChange = {(e) => editArray(e,item['amount'],index)}></ContentEditable>
                            <select className="item-unit" onChange = {(e) => editArray(e,item['unit'],index)}>
                                <option key={item['unit']}>{item['unit']}</option>
                                {
                                    arrayOfUnits.map((option) =>{
                                        if(option !== item['unit'])
                                        {
                                            return <option key={option} value={option}>{option}</option>
                                        }

                                    })}
                                </select>

                            <span className="recipe-delete-button" onClick={() => deleteArray(item['ingredient'])}>x</span>


                        </div>
                        )



                })
                }
            </div>

        </div>
    )
}


export default DataOutput;
