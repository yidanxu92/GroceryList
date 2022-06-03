import React, {useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import ContentEditable from 'react-contenteditable';
import ToggleButton from 'react-toggle-button'
import { Checkmark } from 'react-checkmark'
import  './index.css'



const DataOutput = ({handleQuantityIncrease,handleQuantityDecrease,handleSelected,handleOnDragEnd,handleDeleteItem,handlePrintOut,thisColumns,finalEdit,sortArray}) => {

    const newEdit = useRef('');

    const submitEdit = (e,name) =>{
        const re = /^[A-Za-z0-9 \-\.\?\!]+$/;

        console.log("submitEdit is being called!")
        console.log("current newEdit ", newEdit)
        console.log("current name",name)
        console.log("e.target.value is",e.target.value)

        if (re.test(e.target.value))
            console.log(re.test(e.target.value))
            newEdit.current = e.target.value
    }


    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            {Object.entries(thisColumns).map(([columnId, column], index) => {
                    return (
                        <div
                            className = "storeSection"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <div className = "headerSection">
                                <h2 >{column.columnName}</h2>
                                <div className="itemAndButton0" style={{margin: 8}}>
                                    <div className="sort-table">
                                        <select className="sort-by-each-store" onChange = {(e) => sortArray(e.target.value,columnId)} >
                                            <option value="Sort">Sort</option>
                                            <option value="Unfinished to Finished" >Unfinished First</option>
                                        </select>
                                    </div>

                            </div>
                            </div>

                            <Droppable droppableId={columnId} key={columnId}>
                                    {(provided) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="itemAndButton1"
                                            >

                                                {column.columnItems.map((item, index) => {

                                                    return (

                                                        <Draggable
                                                            key={item.itemName}
                                                            draggableId={item.itemName}
                                                            index={index}
                                                        >

                                                            {(provided) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="itemAndButtonContainer"
                                                                    >

                                                                            <div
                                                                                /*className={item.itemId % 2 === 0 ? "item-name-quantity-even" : "item-name-quantity-odd"}*/
                                                                                className = {"item-store"}
                                                                                style={{background:thisColumns[item.itemStore].background}}
                                                                                onClick={() => handlePrintOut(item.itemId, item.itemName,item.itemStore,item.itemLogo,thisColumns[item.itemStore].logoAddress)}>
                                                                            <span className="item-delete-button"
                                                                                  onClick={() => handleDeleteItem(item.itemName,item.itemStore)}>x</span>
                                                                                <ContentEditable html={item.itemName}
                                                                                    className={item.itemSelected ? 'isSelected' : 'notSelected'}
                                                                                                 onChange = {(e) => submitEdit(e,item.itemName)}
                                                                                                onKeyDown={(e) => { e.key === 'Enter' && finalEdit(newEdit.current,item.itemName,item.itemStore) }}
                                                                                   /* onClick={() => handleSelected(item.itemName) }*/></ContentEditable>
                                                                                <span className="item-logo-section"><img
                                                                                    src ={thisColumns[item.itemStore].logoAddress}/></span>
                                                                                <span className="item-quantity-button">
                                                   <button className="quantity-update-button">
                                                       <FontAwesomeIcon icon={faChevronLeft}
                                                                        onClick={() => handleQuantityDecrease(item.itemName)}/>
                                                   </button>
                                                   <span className="item-quantity">{item.itemQuantity}</span>
                                                   <button className="quantity-update-button">
                                                       <FontAwesomeIcon icon={faChevronRight}
                                                                        onClick={() => handleQuantityIncrease(item.itemName)}/>
                                                   </button>
                                               </span>
                                                                            </div>


                                                                        <div className = "toggleButton" >
                                                                            <ToggleButton
                                                                                inactiveLabel={'X'}
                                                                                activeLabel={<Checkmark size='small'/>}
                                                                                value={item.itemSelected || false}
                                                                                onToggle = {() =>handleSelected(item.itemName)}></ToggleButton>

                                                                        </div>

                                                                    </div>


                                                                )
                                                            }

                                                            }
                                                        </Draggable>
                                                    );
                                                })
                                                }
                                                {provided.placeholder}
                                            </div>

                                        )
                                    }
                                    }
                                </Droppable>

                            </div>


                    )
                }
            )}
        </DragDropContext>)
}


/*

            <Droppable droppableId="item-list">
                {(provided) => (
                    <ul className="item-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {thisList.map((item) =>{

                            must put a container around multiple div


                            return (
                                <Draggable className = "item-container" id={item.itemId} key={item.itemId + item.itemName}
                                           draggableId={item.itemName} index ={item.itemId} >
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <div className = {item.itemStore}>
                                            <div className= {item.itemId %2 === 0?"item-name-quantity-even":"item-name-quantity-odd"} onClick ={()=>handlePrintOut(item.itemId,item.itemName)}>
                                                <span className="item-delete-button" onClick ={() =>handleDeleteItem(item.itemName)}>x</span>
                                                <span className={item.itemSelected?'isSelected':'notSelected'} onClick ={() => handleSelected(item.itemName)}>{item.itemName}</span>
                                                <span className="item-logo-section"><img src={item.itemLogo}/></span>
                                                <span className = "item-quantity-button">
                                                   <button className = "quantity-update-button">
                                                       <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(item.itemName)}/>
                                                   </button>
                                                   <span className="item-quantity">{item.itemQuantity}</span>
                                                   <button className= "quantity-update-button">
                                                       <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(item.itemName)}/>
                                                   </button>
                                               </span>

                                            </div>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>


    )

}
*/

export default DataOutput;