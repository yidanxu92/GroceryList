import React, {useEffect, useState} from 'react'
import './index.css';


function SelectionBar({sortArray}){


    const [sortType, setSortType] = useState ('itemSelected')

    useEffect ( () => {
        sortArray(sortType);
    },[sortType]);

    return(
            <div className="sort-table">
                <select className="sort-by" onChange={ (e) => setSortType(e.target.value)}>
                    <option value="">Select One</option>
                    <option value="Unfinished to Finished" onClick ={useEffect}>Unfinished First</option>
                </select>
            </div>

    )

}

export default SelectionBar;