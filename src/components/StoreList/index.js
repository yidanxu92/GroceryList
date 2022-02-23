import React from 'react'
import './index.css';


function StoreList(){
    return (
        <div className="storeList">
            <button className="storeName">Aldi</button>
            <button className="StoreName">Trader Joe's</button>
            <button className="storeName">Wegmans</button>
            <button className="storeName">Others</button>
        </div>

    )
}

export default StoreList;
