import React, {useState} from 'react';

import Header from './components/Header/index';
import DataInput from './components/DataInput';
import SelectionBar from'./components/SelectionBar';
import DataOutput from './components/DataOutput';
import './App.css';



const App = () =>{
    const [thisList, setThisList] = useState( [])

    const addItem=(userInput,storeChoice) => {
        let logoMap = {"Aldi":"/logo_aldi.png","Asian Market":"/logo_koreanmarket.jpeg","Others":"logo_others.jpeg",
            "Trader Joe":"/logo_traderjoe.png","Walmart":"/logo_walmart.png","Wegmans":"/logo_wegmans.png"};

        userInput = userInput.toUpperCase();
        let copy = [...thisList];
        const itemNameExist= (item) => item.itemName === userInput;
        if (copy.some(itemNameExist)){
            alert("This item already exists.");
            copy.find(x=>x.itemName === userInput).itemQuantity++;
        }
        else{
            copy = [...copy, {itemId:thisList.length,itemName:userInput,itemQuantity:1,itemSelected:false,
                itemStore:storeChoice,itemLogo:logoMap[storeChoice]}];

            localStorage.setItem(thisList.length.toString(),userInput);
        }

        setThisList(copy);

    }


    const sortArray = (type) => {
        const types = {
            'Unfinished to Finished':'itemSelected','Store Name A-Z':'itemStore'
        };

        const sortProperty = types[type];
        console.log ("the current sortProperty is ",sortProperty);

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

    const handleDeleteItem = (id) =>{
        let copy = [...thisList];
        copy = copy.length===1?[]:copy.filter(item =>item.itemId !==copy[id].itemId);
        setThisList(copy);
    }

    const handleQuantityIncrease = (id) =>{
        let copy = [...thisList];
        copy[id].itemQuantity++;
        setThisList(copy);
    }

    const handleQuantityDecrease = (id) =>{
        let copy = [...thisList];
        copy[id].itemQuantity=(copy[id].itemQuantity>1) ? (copy[id].itemQuantity-1) : 1
        //copy[id].itemQuantity=copy[id].itemQuantity-1
        setThisList(copy);
    }


    const handleSelected = (id) =>{
        let copy = [...thisList];
        copy[id].itemSelected = !copy[id].itemSelected;
        setThisList(copy);
    }


    const handleOnDragEnd =(result)=> {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) {
            return;
        }

        const items = Array.from(thisList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setThisList(items);
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
                            />
            </main>
        </React.Fragment>
    )


};



export default App;
