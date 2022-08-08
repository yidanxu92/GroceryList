import React, {useState} from 'react';

import Header from './grocerycontents/Header/index';
import DataInput from './grocerycontents/DataInput';
import DataOutput from './grocerycontents/DataOutput';
import './ShoppingList.css';

const ShoppingList = () =>{
    /*listStatus is a dictionary of dictionary,
    each object contains a store name and items bought from the store,
    eventually that is what will be printed out to screen as store Columns  */
    const listStatus = {
        Aldi:{
            columnName:"Aldi",
            background:"#a56c41",
            logoAddress:"/logo_aldi.png",
            columnItems:[]
        },

        AsianMarket:{
            columnName:"Asian Market",
            background:"#b17a7d",
            logoAddress:"/logo_koreanmarket.jpeg",
            columnItems:[]
        },

        TraderJoes:{
            columnName:"Trader Joe's",
            background:"#7a6747",
            logoAddress:"/logo_traderjoe.png",
            columnItems:[]
        },

        Walmart:{
            columnName:"Walmart",
            background:"#a68782",
            logoAddress:"/logo_walmart.png",
            columnItems:[]
        },

        Wegmans:{
            columnName:"Wegmans",
            background:"#adaeb2",
            logoAddress:"/logo_wegmans.png",
            columnItems:[]
        },

        Others:{
            columnName:"Others",
            background:"#69647b",
            logoAddress:"/logo_others.jpeg",
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
            "TraderJoes":"/logo_traderjoe.png","Walmart":"/logo_walmart.png","Wegmans":"/logo_wegmans.png"};
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


    const sortArray = (type,columnName) => {
        console.log("sortArray is called!")
        const types = {
            'Sort':'itemId','Unfinished to Finished':'itemSelected','Store Name A-Z':'itemStore'
        };

        const sortProperty = types[type];
        console.log("type is",type)
        console.log("type is mapped to",types[type])

        let thisArray = thisColumns[columnName].columnItems;
        if(types[type] === 'itemSelected' || types[type] === 'itemId')
        {
            thisArray.sort((a, b) => a[sortProperty] - b[sortProperty]);
        }

        if(types[type] === 'itemStore')
        {
            thisArray.sort((a, b) => a[sortProperty].localeCompare( b[sortProperty]));

        }

        let copyThisColumns = {...thisColumns}
        setThisColumns(copyThisColumns);

    }

    /*
    handleDeleteItem takes name and store of the selected item and delete it from the date structure.
    The reason we use name is because 1. it is unique 2.unlike index it is fixed.
    when delete the actual item, use filter instead of splice, as the latter returns the deleted item,which would cause
    problems when you assign it to the original array which you are supposed to do with set Usestate
     */

    const handleDeleteItem = (name,store) =>{
        console.log ("handleDeleteItem is being called!!")
        /* let copy = columnToList();
         let index = copy.findIndex(item => item.itemName === name);
         copy = copy.length===1?[]:copy.filter(item =>item.itemName !==copy[index].itemName);*/


        let copyThisColumns = {...thisColumns}
        let currentColor = copyThisColumns[store].background;
        let currentLogo = copyThisColumns[store].logoAddress;
        let copyThisColumnsArray = copyThisColumns[store].columnItems
        console.log("the item we are about to delete is ",name)
        console.log("the length of the array we are looking at is ",copyThisColumnsArray.length)
        console.log("Current items in this list BEFORE delete is: ")
        copyThisColumnsArray.forEach(item => {
            console.log(item.itemName)
        })
        let index = copyThisColumnsArray.findIndex(item => item.itemName === name);
        copyThisColumnsArray=copyThisColumnsArray.length === 1?[]:copyThisColumnsArray.filter(item =>item.itemName
            !==copyThisColumnsArray[index].itemName);
        console.log("the length of the array after filtering is ",copyThisColumnsArray.length)
        console.log("Current items in this list AFTER delete is: ")
        copyThisColumnsArray.forEach(item => {
            console.log(item.itemName)
        })

        /*
        question: can I write [store]:{...copyThisColumnsArray}instead? since all I did there is to delete an item,
        there is no new value assigned.
        * */
        setThisColumns({
            ...thisColumns,
            [store]:{
                ...copyThisColumnsArray,
                columnName: store,
                background:currentColor,
                logoAddress:currentLogo,
                columnItems:copyThisColumnsArray
            }
        })

        console.log("now let's print out the column!")
        Object.entries(thisColumns).forEach(([columnId,column]) =>{
            column.columnItems.forEach((item)=>{
                console.log(item.itemName,item.itemStore)

            })
        });

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
        console.log("handleSelected is called")
        let copy = columnToList();
        let index = copy.findIndex(item => item.itemName === name);
        console.log("the index is",index)
        copy[index].itemSelected = !copy[index].itemSelected;
        let copyThisColumns = {...thisColumns}
        setThisColumns(copyThisColumns);
        console.log("the current selected one is ",copy[index].itemName);
    }

    /* contentEdible allows user to edit the item name they entered.When user make changes and hits enter, this function is called
    * to update item name.*/

    const finalEdit = (newName,oldName,store) =>{
        console.log("Final Edit is being called!!")
        newName = newName.toUpperCase();

        let copy = columnToList();
        const itemNameExist= (item) => item.itemName === newName;

        /*if the new item user entered already existed, we increased the existing item's quantity.*/
        if (copy.some(itemNameExist)){
            alert("This item already exists.");
            copy.find(x=>x.itemName === newName).itemQuantity++;
            handleDeleteItem(oldName,store)
        }

        /*if the item does not exist, we change the previous name to the new name and update the list. */

        else{
            let index = copy.findIndex(item => item.itemName === oldName);
            copy[index].itemName = newName;
            let copyThisColumns = {...thisColumns};
            setThisColumns(copyThisColumns);
        }





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


        console.log("now let's print out the column!")
        Object.entries(thisColumns).forEach(([columnId,column]) =>{
            console.log("current columnId is",columnId);
            column.columnItems.forEach((item)=>{
                console.log(item.itemName,item.itemStore,thisColumns[item.itemStore].columnItems.length)

            })
        });
    }



    return(
        <React.Fragment>
            <Header />
            <main>
                <DataInput addItem ={addItem} thisColumns={thisColumns} />

                <DataOutput handleQuantityIncrease = {handleQuantityIncrease}
                            handleQuantityDecrease = {handleQuantityDecrease}
                            handleSelected ={handleSelected}
                            handleOnDragEnd ={handleOnDragEnd}
                            handleDeleteItem = {handleDeleteItem}
                            handlePrintOut = {handlePrintOut}
                            thisColumns = {thisColumns}
                            finalEdit = {finalEdit}
                            sortArray = {sortArray}
                />
            </main>
        </React.Fragment>
    )


};



export default ShoppingList;
