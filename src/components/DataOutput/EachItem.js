import React from 'react';

const EachItem = ({eachItem}) =>{
    return (
        <div className={eachItem.complete?"strike":""}>
            {eachItem.item}
        </div>
    );

};

export default EachItem;