import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import  './index.css'

const DataOutput = ({thisList,handleQuantityIncrease,handleQuantityDecrease,handleSelected,handleOnDragEnd,handleDeleteItem}) =>{

    return(
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="item-list">
                {(provided) => (
                    <ul className="item-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {thisList.map((item) =>{
                            /*
                            must put a container around multiple div
                            */
                            console.log("itemName: ",item.itemName)
                            console.log("itemQuantity:",item.itemQuantity)
                            console.log("itemId: ",item.itemId)
                            return (
                                <Draggable className = "item-container" id={item.itemId} key={item.itemId + item.itemName} draggableId={item.itemName} index ={item.itemId} >
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <div className= {item.itemId %2 === 0?"item-name-quantity-even":"item-name-quantity-odd"}>
                                                <span className="item-delete-button" onClick ={() =>handleDeleteItem(item.itemId)}>x</span>
                                                <span className={item.itemSelected?'isSelected':'notSelected'} onClick ={() => handleSelected(item.itemId)}>{item.itemName}</span>
                                                <span className = "item-quantity-button">
                                                   <button>
                                                       <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(item.itemId)}/>
                                                   </button>
                                                   <span className="item-quantity">{item.itemQuantity}</span>
                                                   <button>
                                                       <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(item.itemId)}/>
                                                   </button>
                                               </span>

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

export default DataOutput;