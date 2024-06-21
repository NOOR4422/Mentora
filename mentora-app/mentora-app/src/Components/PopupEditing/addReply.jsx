import React, { useState, useEffect, useContext } from 'react';
import '../Popup/Popup.css';
import exit from '../../assets/exit.png';
import axios from 'axios';
import { User } from "../Context/userContext";
// PopupCommint component to handle editing comments
const AddReply = ({
    type,
    ShowPopup,
    showEditCommint,
    editCommintData,
    handleShowPopup,
    editArticleData,
    handlePopupType,
    handleOverlay,
    idPost
}) => {
    const { auth } = useContext(User);
    // Initialize state for textarea and selected option
    const [textarea, setTextarea] = useState('');
    const [selectedOption, setSelectedOption] = useState('');


    // Reset function to clear textarea
    const reset = () => {
        setTextarea('');
        showEditCommint(false); // Close the popup on reset
    };
    console.log(editCommintData);

    // Handle the edit action
    const handleadd = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:4000/api/post/${idPost}/${editCommintData}/replyComment`, {
                content: textarea
            }
                , {
                    headers: {
                        Authorization: `Bearer ${auth.Token}`,
                        "Content-Type": "application/json"
                    }
                });
            if (response.status === 200) {
                console.log('Comment add Reply successfully');
                // Optionally, update your state here
            }
        } catch (error) {
            console.error('Error add Reply the comment:', error);
        }
    };

    // Handle option change
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        ShowPopup && (
            <div className='popup-container'>
                <div className="popup-header">
                    <span>add Reply</span>
                    <img src={exit} alt="Close" onClick={reset} />
                </div>
                <div className="popup-user-info">
                    <span>{editCommintData.authorName}</span>
                </div>
                <textarea
                    placeholder='What do you want to talk about?'
                    className='textarea'
                    autoFocus
                    onChange={(e) => setTextarea(e.target.value)}
                />
                <div className="popup-footer popup-footer-1">
                    <button
                        disabled={!textarea}
                        className={textarea.length !== 0 ? "" : "disabled"}
                        onClick={handleadd}
                    >
                        Add Reply
                    </button>
                </div>
            </div>
        )
    );
};

export default AddReply;
