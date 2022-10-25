import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import Header from './recipecontents/Header/index';
import DataInput from "./recipecontents/DataInput";
import DataOutput from "./recipecontents/DataOutput";
import {getWithExpiry, setWithExpiry} from "./stateStorageWithTTL"



const Recipe = () =>{
    /*data is the data that will be used and displayed in dataOutput*/
    /*As a result, it must 1. be in UseState(for update&refresh) 2.contain a valid value (otherwise page will break)*/
    /* const[data,setData] = useState(Boolean(userInput) ? (userInput in localStorage ? JSON.parse(localStorage.getItem(userInput))
       :mainStructure[userInput]) : []);*/
    /*Main Idea: when userInput is null,data is [];when userInput is entered but does not exist in localStorage,
    data is mainStructure[userInput]; when userInput is entered and exists in localStorage, then data is JSON.parse*/

    console.log("this is Recipe");


   /*mainStructure[userInput] is the data for new Input, functions as a key-value pair where key is userInput( name of food)
   value is the content of the menu*/
   const [mainStructure, setMainStructure] = useState({});
   const [userInput, setUserInput]=useState('');
   /*The reason we cannot use mainStrucutre[userInput] directly is that set up causes too many recalls,
   * crushes the page. That is why we need a second, helper dataStructure for now.  */

   /*setMainStructure( {...mainStructure,[userInput]:[]});*/

    /*data will function as mainStructure[userInput] */


   console.log("current  mainStructure is ",mainStructure);
   console.log("current mainStructure[userInput] is ",mainStructure[userInput]);
   console.log("current lastOpen is ",getWithExpiry());
   console.log("current localStorage for userInput is ",JSON.parse(localStorage.getItem(userInput))||null);

   /*This one opens the input form*/
    const [open, setOpen] = useState(false);

    const handleFormOpen = () =>{
        setOpen(true);
    }

    const handleFormClose = () =>{
        setOpen(false);
        if(getWithExpiry()){
            localStorage.removeItem("lastOpen");
        }

        if(mainStructure[userInput])
        {
            delete(mainStructure[userInput]);
           /* setMainStructure(mainStructure => ({...mainStructure,[userInput]:[]}));*/
        }

    }

   /* const handleFormOpen = () =>{
        setOpen(!open);
    }*/




    /*here we have a function that stores the page content, so when user refresh the page it doesnt lose information.*/
    /*putting an [] in dependency means useEffect will only run once ( the first time) */
    useEffect(()=>{
            console.log("we are in useEffect for refresh! this should only be called once when the page is being refreshed")
            /* here we check if we have a page stored under the key 'lastOpen' in localStorage*/
            let storedValue = "";
            if(userInput === "" && getWithExpiry())
            {
                /*if we have a page stored, we will set localInput as that input value, and open the form.*/
                console.log("we are here because storedValue/lastOpen is not null!")
                storedValue = Object.keys(getWithExpiry('lastOpen'))[0];
                console.log ("the stored value is",storedValue);
                setUserInput(storedValue);
                handleState(storedValue);
                handleFormOpen();
            }


        }
        /* console.log("we are in useEffect")
         const itemStr = localStorage.getItem("lastOpen")
         if (itemStr)
         {
             console.log("last open exists, we are in if(itemStr)")
             const item = JSON.parse(itemStr)
             console.log("item after JSON.parse is ", item)
             const now = new Date()
             console.log("current time is",now.getTime())

             // compare the expiry time of the item with the current time
             if (now.getTime() > item.expiry)
             {
                 console.log("item expired!")
                 // If the item is expired, delete the item from storage
                 // and return null
                 localStorage.removeItem("lastOpen")
             }
             else {
                 setLocalInput(item.value);
                 handleState(item.value);
                 handleFormOpen();
             }

         }
     }*/,[])



    /*This one closes the input form*/
  /*  const handleClose = () => {
        console.log("handle close is being called!")
        setOpen(false);
    }*/


    const handleState = (localInput) =>{
        console.log("handleState is called!")
        console.log("handleState:current localInput is ", localInput);
        setUserInput(localInput);
        /*check if the input already exists in localStorage, if it exists, load the stored information.
        If not,create a new array*/

        /*let tempArr = localInput in localStorage ? (JSON.parse(localStorage.getItem(localInput)))
            :[];*/

        let tempArr = [];

        if ('lastOpen' in localStorage)
        {
            console.log("lastOpen exists!")
            let keyName = Object.keys(getWithExpiry('lastOpen'))[0];
            console.log("lastOpen's keyName is ", keyName);
            tempArr = JSON.parse(localStorage.getItem(keyName));

        }
        else if ( localInput in localStorage )
        {
            console.log("lastOpen does not exists! localInput exists!")
            tempArr = JSON.parse(localStorage.getItem(localInput));
        }

        console.log("temp arr (future mainStructure) is", tempArr);
        /*mainStructure[localInput] = [];*/
       /* setMainStructure(mainStructure);*/
        console.log("setMainStructure is being called here, useEffect for mainStructure should be called soon too!")
        setMainStructure(mainStructure => ({...mainStructure,[localInput]:tempArr}));
        /*Question: what if I do mainStructure[localInput] = tempArr instead????*/
        console.log("current mainStructure is ",mainStructure);
        console.log("mainStructure[userInput] after userInput update is ", mainStructure[localInput]);
        console.log("handleState: current userInput is ",localInput);

/*call export function to set up localStorage with key, value and ttl*/
       /* setWithExpiry('lastOpen',mainStructure,60000);
        localStorage.setItem(userInput,JSON.stringify(mainStructure[userInput]))*/

        /*here we set up localstorage to store the current content when page is refreshed*/
       /* if(localStorage.getItem("lastOpen") && (JSON.parse(localStorage.getItem("lastOpen"))).value!==localInput)
        {*/
           // const now = new Date();
            // `item` is an object which contains the original value
            // as well as the time when it's supposed to expire (in this case,1 min aka 60000 ms)

            //const item = {
                //value: localInput,
               // expiry: now.getTime() + 60000,
         //   }

         //   localStorage.setItem("lastOpen",JSON.stringify(item));


    }

   /* const handleUpdate = () =>{
        setMainStructure({...mainStructure,[userInput]:[...mainStructure[userInput]]});
        console.log("handleUpdate,after set :",mainStructure[userInput]);
    }*/


   const addToArray = (newObj) =>{
        let copy = mainStructure[userInput];
        console.log("inside addToArray, copy (mainStructure userInput) is before add is ", copy);
        const itemNameExist= (item) => item['ingredient'] === newObj['ingredient'];
        if (copy.some(itemNameExist)){
            alert("This item already exists!");
        }

        else{
            console.log("setMainStructure is being called here, useEffect for mainStructure should be called soon too!")
           setMainStructure(mainStructure => ({...mainStructure,[userInput]:[...mainStructure[userInput],newObj]}));
           console.log("inside addToArray, array after add newObject:",mainStructure[userInput]);
        }

   }

    const editArray = (oldData,newData) =>{

        let copy = mainStructure[userInput];

        let oldDataIndex = copy.indexOf(oldData);

        const itemNameExist = (item) => item.ingredient === newData.ingredient;

        if (mainStructure[userInput].some(itemNameExist)){
            let obj = copy.find(item => item.ingredient === newData.ingredient);
            let currentIndex = copy.indexOf(obj);
            if(oldDataIndex !== currentIndex)
            {
                alert("This item already exists!");
                return;}
            }


        copy.splice(oldDataIndex, 1);

        /* setMainStructure(mainStructure => ({...mainStructure,[userInput]:[...copy,newData]}));*/

        let newArray = [...copy];
        newArray.splice(oldDataIndex, 0, newData);


        console.log("setMainStructure is being called here, useEffect for mainStructure should be called soon too!")
        setMainStructure(mainStructure => ({...mainStructure, [userInput]: newArray}));
        console.log("current mainStructure[userInput] after edit is ", mainStructure[userInput]);


    }

    const deleteArray = (oldData) =>{
        let copy = mainStructure[userInput];
        copy = copy.length === 1?[]:copy.filter(item => item['ingredient'] !== oldData['ingredient']);
        console.log("we are in delete array.copy after delete function is ", copy);
        console.log("setMainStructure is being called here, useEffect for mainStructure should be called soon too!")
        setMainStructure(mainStructure => ({...mainStructure,[userInput]:[...copy]}));
        console.log("MainStructure is (after setMainStructure) :",mainStructure);
        console.log("mainArray is (after setMainStructure) : ",mainStructure[userInput]);


    }

  /*  const deleteArray = (itemName) =>{
        console.log("deleteArray is called!");
        console.log("current ingredient is ",itemName);
        let copyArr = mainStructure[userInput];
        let index = copyArr.finlo'ca'ldIndex(item => item['ingredient'] === itemName);
        copyArr = copyArr.length === 1?[]:copyArr.filter(item => item['ingredient'] !== copyArr[index]['ingredient'])
        setMainStructure({[userInput]:[...copyArr]});
        console.log("mainArray after delete is ",mainStructure[userInput]);
        console.log("mainStructure after delete is ", mainStructure);
    }*/


    const checkObjectInLocal = () =>{
        console.log("checkObjectInLocal is called!");
        console.log("current userInput is ",userInput);
        console.log("check localStorage inside action ",JSON.parse(localStorage.getItem(userInput)));
    }


    const [arrayOfUnits,setArrayOfUnits] = useState(["g","kg","oz","lbs","ml","l","tsp","tbsp","cup","qt","pt"]);

    return(
        <React.Fragment>
            <Header />
            <main>
                <DataInput handleState = {handleState} mainStructure={mainStructure}
                           handleFormOpen={handleFormOpen} handleFormClose = {handleFormClose} open={open}
                           />
                <DataOutput mainStructure={mainStructure} userInput={userInput} arrayOfUnits = {arrayOfUnits}
                            open={open} addToArray={addToArray} editArray={editArray} deleteArray={deleteArray}
                checkObjectInLocal={checkObjectInLocal} handleFormClose={handleFormClose} />
            </main>
        </React.Fragment>
    )

};

export default Recipe;