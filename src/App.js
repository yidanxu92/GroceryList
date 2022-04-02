import React, {useState} from 'react';

import Header from './components/Header/index';
import DataInput from './components/DataInput';
import SelectionBar from'./components/SelectionBar';
import DataOutput from './components/DataOutput';
import './App.css';

const App = () =>{
    /*ThisList is the array where all items are stored.*/
    const [thisList, setThisList] = useState( [])

    /*listStatus is a dictionary of dictionary,
    each object contains a store name and items bought from the store,
    eventually that is what will be printed out to screen as store Columns  */
    const listStatus = {
        Aldi:{
            columnName:"Aldi",
            columnItems:[]
        },

        AsianMarket:{
            columnName:"Asian Market",
            columnItems:[]
        },

        TraderJoe:{
            columnName:"Trader Joe's",
            columnItems:[]
        },

        Walmart:{
            columnName:"Walmart",
            columnItems:[]
        },

        Wegmans:{
            columnName:"Wegmans",
            columnItems:[]
        },

        Others:{
            columnName:"Others",
            columnItems:[]
        },

    }

    /*thisColumns is our main data structure. Its initial status is listStatus */
    const [thisColumns,setThisColumns] = useState(listStatus);

    /*This function converts items in each column into array, then return .the array.*/

    const columnToList = () =>{
        let arr =[];

        Object.entries(thisColumns).forEach(([columnId,column]) =>{
            column.columnItems.forEach((item)=>{
                arr.push(item)
            })
        });

      /*  for (let key in thisColumns){
            console.log("current key is",key)
            thisColumns[key].forEach(item=>arr.push(item))
        }*/

        return(arr);

    }

    /* This function takes a userInput (string) passed from DataInput and add it to theColumn */
    const addItem=(userInput,storeChoice) => {
        let logoMap = {"Aldi":"/logo_aldi.png","AsianMarket":"/logo_koreanmarket.jpeg","Others":"logo_others.jpeg",
            "TraderJoe":"/logo_traderjoe.png","Walmart":"/logo_walmart.png","Wegmans":"/logo_wegmans.png"};
        /* All userInput are converted to uppercase to make it easier to check duplication */
        userInput = userInput.toUpperCase();

        /*here we call the function columnToList, which returns the array of all the items currently in the column. */
        let copy = columnToList();
        const itemNameExist= (item) => item.itemName === userInput;

        /* if the userInput already existed as an item in the array, a warning message will be printed to screen,
        and the corresponded item's quantity will be increased by 1 */
        if (copy.some(itemNameExist)){
            alert("This item already exists.");
            copy.find(x=>x.itemName === userInput).itemQuantity++;
            let copyThisColumns = {...thisColumns}
            setThisColumns(copyThisColumns);
        }
        else{

            let newItem = {itemId:copy.length,itemName:userInput,itemQuantity:1,itemSelected:false,
                itemStore:storeChoice}
                newItem['itemLogo'] = logoMap[newItem.itemStore]

          /*  copy = [...copy, newItem];*/

           /* localStorage.setItem(thisList.length.toString(),userInput);*/


            console.log("The item that has been created is",newItem.itemName)
            console.log("The store of ",newItem.itemName, " is ", newItem.itemStore)

            let newColumnCopy = thisColumns[newItem.itemStore];
            let newColumnContent = [...newColumnCopy.columnItems,newItem];
            setThisColumns({
                ...thisColumns,
                [newItem.itemStore]:{
                    ...newColumnCopy,columnItems:newColumnContent
                }


            })
        }


    }


    const sortArray = (type) => {
        const types = {
            'Unfinished to Finished':'itemSelected','Store Name A-Z':'itemStore'
        };

        const sortProperty = types[type];

        let sorted = [...thisList];
        if(types[type] === 'itemSelected')
        {
            sorted.sort((a, b) => a[sortProperty] - b[sortProperty]);
        }

        if(types[type] === 'itemStore')
        {
            sorted.sort((a, b) => a[sortProperty].localeCompare( b[sortProperty]));

        }

        setThisList(sorted);

    }

    const handleDeleteItem = (name,store) =>{
        console.log ("handleDeleteItem is being called!!")
       /* let copy = columnToList();
        let index = copy.findIndex(item => item.itemName === name);
        copy = copy.length===1?[]:copy.filter(item =>item.itemName !==copy[index].itemName);*/


        let copyThisColumns = {...thisColumns}
        let copyThisColumnsArray = copyThisColumns[store].columnItems
        console.log("the length of the array we are looking at is ",copyThisColumnsArray.length)
        let index = copyThisColumnsArray.findIndex(item => item.itemName === name);
        copyThisColumnsArray=copyThisColumnsArray.length === 1?[]:copyThisColumnsArray.filter(item =>item.itemName !==copyThisColumnsArray[index].itemName);
        console.log("the length of the array after filtering is ",copyThisColumnsArray.length)
        setThisColumns(copyThisColumns);

        setThisColumns({
            ...thisColumns,
            [store]:{
                ...copyThisColumnsArray,
                columnName: store,
                columnItems:copyThisColumnsArray
            }
        })
    }

    const handleQuantityIncrease = (name) =>{

        let copy = columnToList();
        let index = copy.findIndex(item => item.itemName === name);

        copy[index].itemQuantity++;


        Object.entries(thisColumns).forEach(([columnId,column]) =>{
            column.columnItems.forEach((item)=>{
                if (item.itemName === name){
                    console.log("we found the item ",item.itemName ,"in the column",columnId)
                    console.log ("the item",item.itemName,"'s current quantity is",item.itemQuantity)
                }
            })
        });

        let copyThisColumns = {...thisColumns}

        setThisColumns(copyThisColumns);



    }

    const handleQuantityDecrease = (name) =>{
        let copy = columnToList();
        let index = copy.findIndex(item => item.itemName === name);
        copy[index].itemQuantity=(copy[index].itemQuantity>1) ? (copy[index].itemQuantity-1) : 1
        //copy[id].itemQuantity=copy[id].itemQuantity-1
        let copyThisColumns = {...thisColumns}
        setThisColumns(copyThisColumns);
    }


    const handleSelected = (name) =>{
        let copy = [...thisList];
        let index = copy.findIndex(item => item.itemName === name);
        copy[index].itemSelected = !copy[index].itemSelected;
        setThisList(copy);
        console.log("the current selected one is ",index.itemName);
    }


    const handleOnDragEnd =(result)=> {


        if (!result.destination) return;
        if (result.destination.droppableId === result.source.droppableId) {
           const column = thisColumns[result.source.droppableId];
           const copiedItems = Array.from(column.columnItems);
           const [removed] = copiedItems.splice(result.source.index, 1);
           copiedItems.splice(result.destination.index, 0, removed);
           setThisColumns({
               ...thisColumns,
               [result.source.droppableId]:{
                   ...column,
                   columnItems: copiedItems
               }
           })
        }
        else{
            const sourceColumn = thisColumns[result.source.droppableId];
            const destColumn = thisColumns[result.destination.droppableId];
            const sourceItems = [...sourceColumn.columnItems];
            const destItems = [...destColumn.columnItems];
            const [removed] = sourceItems.splice(result.source.index, 1);
            destItems.splice(result.destination.index, 0, removed);

            removed.itemStore = result.destination.droppableId;


            setThisColumns({
                ...thisColumns,
                [result.source.droppableId]:{
                    ...sourceColumn,
                    columnItems: sourceItems
                },
                [result.destination.droppableId]:{
                    ...destColumn,
                    columnItems:destItems
                }

            })

        }



        /*const items = Array.from(thisList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setThisList(items);*/
    }


    const handlePrintOut =(id,n,s,logo,logo2)=>{
        console.log("the id you just clicked is ",id)
        console.log("the item name you just clicked is ",n)
        console.log("the item store is",s)
        console.log("the item logo,according to itemlogo, is",logo)
        console.log("the item logo,according to map, is",logo2)
    }



    return(
        <React.Fragment>
            <Header />
            <main>
                <DataInput addItem ={addItem} />
                <SelectionBar sortArray = {sortArray}/>
                <DataOutput thisList={thisList} handleQuantityIncrease = {handleQuantityIncrease}
                            handleQuantityDecrease = {handleQuantityDecrease}
                            handleSelected ={handleSelected}
                            handleOnDragEnd ={handleOnDragEnd}
                            handleDeleteItem = {handleDeleteItem}
                            handlePrintOut = {handlePrintOut}
                            thisColumns = {thisColumns}
                            />
            </main>
        </React.Fragment>
    )


};



export default App;
