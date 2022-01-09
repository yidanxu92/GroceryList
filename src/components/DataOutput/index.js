import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import DraggableList from "react-draggable-lists";
import  './index.css'

const DataOutput = ({thisList,handleQuantityIncrease,handleQuantityDecrease,handleSelected}) =>{

    return(

        <div className="item-list">
            {thisList.map((item) =>{
                /*
                must put a container around multiple div
                 */
                console.log(item.itemName)
                console.log(item.itemQuantity)
                console.log(item.itemId)

               return (
                   <DraggableList rowSize={1} width={200} height={50}>
                   <div className="item-container" id={item.itemId} key={item.itemId + item.itemName} onClick ={() => handleSelected(item.itemId)}>

                       <div className="item-name">
                        <span className={item.itemSelected?'isSelected':'notSelected'}>{item.itemName}</span>
                    </div>

                    <div className="item-quantity" >
                        <button>
                            <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(item.itemId)}/>
                        </button>
                        <span>{item.itemQuantity}</span>
                        <button>
                            <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(item.itemId)}/>
                        </button>

                    </div>

                </div>
                   </DraggableList>


               )

                })}

        </div>

    )

}

export default DataOutput;