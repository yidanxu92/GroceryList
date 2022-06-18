import React, {useState} from 'react';
import './index.css';
import Popup from '../Popup/popup.js';
import Modal from '../Modal/modal.js';


const DataInput =({handleState,arrayOfUnits,addToArray,open,handleFormOpen,handleClose})=> {
    const [localInput, setLocalInput] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);


    const handleChange = (e) => {
        e.preventDefault();
        console.log("handleChange is called");
        const re = /^[A-Za-z0-9 \-\.\?\!]+$/;
        if (e.target.value === "" || re.test(e.target.value))
            setLocalInput(e.currentTarget.value)
        console.log("localInput is ",localInput);
    }


    const handlePopup = (e) => {
        e.preventDefault();
        console.log("handlePopup is called");
        console.log("current userInput is",localInput);
        if (localInput in localStorage) {
            handleState(localInput);
            console.log(localInput,"does exists!");
        }

        else {
            console.log("button Popup status-before:",buttonPopup);
            setButtonPopup(!buttonPopup);
            console.log("button Popup status-after:",buttonPopup);
            console.log(localInput,"does not exist!")
        }

    }


    const handleOpen = () => {
        console.log("handle open is being called!")
        handleFormOpen();
        setButtonPopup(false);
        console.log("localInput is ",localInput);
        handleState(localInput);
        setLocalInput("");

    }


    return (

        <form>
            <input className="submission-line_input" value={localInput} type="text" onChange={handleChange}
                   placeholder="Enter here..."/>
            <button className="submission-line_select" onClick={handlePopup}>submit</button>
            {buttonPopup && <Popup
                content={<>
                    <h3>{localInput} does not exist in our storage.</h3>
                    <p>Do you want to create your own recipe?</p>
                    <button className='no-btn' onClick={handlePopup}>No</button>
                    <button className='yes-btn' onClick={handleOpen}>Yes</button>
                </>}
                handleClose={handlePopup}
            />}
            {open && <Modal open={open} handleClose={handleClose}
                            arrayOfUnits={arrayOfUnits} addToArray={addToArray}></Modal>}
        </form>


    )
};

export default DataInput