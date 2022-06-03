import React from 'react';
import './index.css';


const DataColumn = () => {
    let arr = ['Aldi','Asian Market','Trader Joe','Wegmans','Walmart','Others'];
    let arr_output = arr.map((item) => <div className={item}> {item} </div>)

    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20}}>
            {arr_output}
        </div>
    )
}

export default DataColumn;




