import React from 'react'
import './popup.css'

const Popup = props =>{
    console.log("popup is being called!")
    return  (
        <div className='popup-box'>
            <div className='popup-inner'>
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );

}

export default Popup