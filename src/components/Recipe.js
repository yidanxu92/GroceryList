import React,{useState} from 'react';
import Header from './recipecontents/Header/index';
import DataInput from "./recipecontents/DataInput";
import DataOutput from "./recipecontents/DataOutput";


const Recipe = () =>{
    const [mainStructure, setMainStructure] = useState({});
    const [userInput, setUserInput]=useState('');
    /*This one opens the input form*/
    const [open, setOpen] = useState(false);


    const handleFormOpen = () =>{
        setOpen(true);
    }

    /*This one closes the input form*/
    const handleClose = () => {
        console.log("handle close is being called!")
        setOpen(false);
    }


    const handleState = (localInput) =>{
        console.log("handleState is called!")
        console.log("handleState:current localInput is ", localInput);
        setUserInput(localInput);
        console.log("handleState: current userInput is ",userInput);
        mainStructure[localInput] = [];
        setMainStructure(mainStructure);
       /* setMainStructure({...mainStructure, [userInput]:[]} );*/
        console.log("current mainStructure is ",mainStructure);
        console.log("mainStructure[userInput] after userInput update is ", mainStructure[localInput]);
        console.log("mainStructure after userInput update is ",mainStructure);
    }


   const addToArray = (newObj) =>{
        console.log("addToArray is called!");
        console.log("userInput is ",userInput);
        console.log("mainStructure[userInput] is ", mainStructure[userInput]);
        let copy = mainStructure[userInput];
        const itemNameExist= (item) => item.ingredient === newObj.ingredient;
        if (copy.some(itemNameExist)){
            alert("This item already exists!");
        }
        else{
            setMainStructure({...mainStructure,[userInput]:[...mainStructure[userInput],newObj]});
        }
        console.log("current array is ", mainStructure[userInput]);
        console.log("current main structure is ",mainStructure);
   }

    const editArray = (e,name,index) =>{
        console.log("submitEdit is called!");
        let copy = mainStructure[userInput];
        const itemNameExist= (item) => item.ingredient === name;
        if (copy.some(itemNameExist)){
            alert("This item already exists!");
        }
        else{
            let currentObj = mainStructure[userInput][index];
            let currentKey = Object.keys(currentObj).find(key => currentObj[key] === name);
            currentObj[currentKey] = e.target.value;
            console.log("currentObj is ",currentObj);
            console.log("mainArray is ",mainStructure[userInput]);
        }

    }

    const deleteArray = (itemName) =>{
        console.log("deleteArray is called!");
        console.log("current ingredient is ",itemName);
        let copyArr = mainStructure[userInput];
        let index = copyArr.findIndex(item => item['ingredient'] === itemName);
        copyArr = copyArr.length === 1?[]:copyArr.filter(item => item['ingredient'] !== copyArr[index]['ingredient'])
        setMainStructure({[userInput]:[...copyArr]});
        console.log("mainArray after delete is ",mainStructure[userInput]);
        console.log("mainStructure after delete is ", mainStructure);
    }


    const [arrayOfUnits,setArrayOfUnits] = useState(["g","kg","oz","lbs","ml","l","tsp","tbsp","cup","qt","pt"]);

    return(
        <React.Fragment>
            <Header />
            <main>
                <DataInput handleState = {handleState} arrayOfUnits = {arrayOfUnits}
                           addToArray={addToArray} open={open} handleFormOpen={handleFormOpen} handleClose={handleClose}/>
                <DataOutput userInput={userInput} arrayOfUnits = {arrayOfUnits} editArray={editArray} deleteArray={deleteArray}
                            mainStructure={mainStructure}/>



            </main>
        </React.Fragment>
    )

};

export default Recipe;