import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import  './index.css'



const DataOutput = ({thisList,handleQuantityIncrease,handleQuantityDecrease,handleSelected,handleOnDragEnd,handleDeleteItem,handlePrintOut,thisColumns}) => {
    let logoMap = {"Aldi":{ logoAddress:"/logo_aldi.png"},
        "AsianMarket":{logoAddress:"/logo_koreanmarket.jpeg"},
        "Others": {logoAddress:"/logo_others.jpeg"},
        "TraderJoe": {logoAddress: "/logo_traderjoe.png"},
        "Walmart":{logoAddress: "/logo_walmart.png"},
        "Wegmans":{logoAddress: "/logo_wegmans.png"}};


    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            {Object.entries(thisColumns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <h2>{column.columnName}</h2>
                            <div style={{margin: 8}}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
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
                                                                    >
                                                                        <div className={item.itemStore}>
                                                                            <div
                                                                                /*className={item.itemId % 2 === 0 ? "item-name-quantity-even" : "item-name-quantity-odd"}*/
                                                                                className = {"item-store-"+item.itemStore}
                                                                                onClick={() => handlePrintOut(item.itemId, item.itemName,item.itemStore,item.itemLogo,logoMap[item.itemStore])}>
                                                                            <span className="item-delete-button"
                                                                                  onClick={() => handleDeleteItem(item.itemName,item.itemStore)}>x</span>
                                                                                <span
                                                                                    className={item.itemSelected ? 'isSelected' : 'notSelected'}
                                                                                    onClick={() => handleSelected(item.itemName)}>{item.itemName}</span>
                                                                                <span className="item-logo-section"><img
                                                                                    src ={logoMap[item.itemStore].logoAddress}/></span>
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