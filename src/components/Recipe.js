import React,{useState} from 'react';
import Header from './recipecontents/Header/index';
import DataInput from "./recipecontents/DataInput";
import DataOutput from "./recipecontents/DataOutput";


const Recipe = () =>{
    const [userInput,setUserInput] = useState('');
    const handleState = (e) =>{
        setUserInput(e);
    }

    const [arrayOfUnits,setArrayOfUnits] = useState(["g","kg","oz","lbs","ml","l","tsp","tbsp","cup","qt","pt"]);

    return(
        <React.Fragment>
            <Header />
            <main>
                <DataInput handleState = {handleState} arrayOfUnits = {arrayOfUnits}/>
                <DataOutput userInput={userInput} arrayOfUnits = {arrayOfUnits}/>



            </main>
        </React.Fragment>
    )

};

export default Recipe;