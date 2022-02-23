import React, {useState} from 'react'
import './index.css';


function SelectionBar({sortArray}){


    const [sortType, setSortType] = useState ('')

    const handleSelectChange = (e) =>{
        if(e.target.value !=="")
        {
            setSortType(e.target.value);
            console.log("current sortType is ", sortType);
            sortArray(sortType);
        }


    }

 /*   useEffect ( () => {
        sortArray(sortType);
    },[sortType]);*/

    return(
            <div className="sort-table">
                <select className="sort-by" onChange={ handleSelectChange}>
                    <option value="">Select One</option>
                    <option value="Unfinished to Finished" >Unfinished First</option>
                    <option value="Store Name A-Z" >Store Name A to Z</option>

                </select>
            </div>

    )

}

export default SelectionBar;