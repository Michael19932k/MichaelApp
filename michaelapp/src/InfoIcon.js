import React, { useState, useEffect } from 'react';
import './InfoIcon.css';

function Info() {
    const [visibility, Setvisibility] = useState({ visibility: "hidden" })
    const [ClickedForVisibilty, SetClickedForVisibilty] = useState(false)
    function HoverToshowIT() {
        Setvisibility({ visibility: "visible" })

    }
    function ClickedToShow() {
        SetClickedForVisibilty(true)
        Setvisibility({ visibility: "visible" })

    }
    function ClickedToClose() {
        SetClickedForVisibilty(false)
        Setvisibility({ visibility: "hidden" })

    }
    function hideIT() {
        if (ClickedForVisibilty === true) {
            Setvisibility({ visibility: "visible" })
        }
        Setvisibility({ visibility: "hidden" })

    }

    return (
        <div>
            <div className='infoWrapper'>
                <div className="bubble" style={visibility}>
                    <div className='infoContentWrapper'>
                        <div className='infoText'>You and the person you want to chat with need to have the same token. Press "Generate" to create a room and make sure your friend insert the same token you got. If you want to enter to existing chat simply type your nickname and insert the token of the room you want to get in.
                        All nicknames, room tokens and chats automatically deleted from the data base every 24 hours from the moment of creation of the said room or a nickname.</div>
                        <div className='CloseButton' onClick={ClickedToClose}>&#215;</div>
                    </div>
                </div>
                <div className='info' onClick={ClickedToShow} onMouseOver={HoverToshowIT} onMouseOut={hideIT}><i className="material-icons">info</i></div>
            </div>
        </div>

    );
}

export default Info;