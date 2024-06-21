import React, { useState, useEffect, useContext } from 'react';
import '../Popup/Popup.css';
import exit from '../../assets/exit.png';
import axios from 'axios';
import { User } from "../Context/userContext";
// PopupCommint component to handle editing comments
const PopupReply = ({
    ShowPopup,
    showEditReply,
    editCommintData,
    handleShowPopup,
    idPost
}) => {
    const { auth } = useContext(User);
    // Initialize state for textarea and selected option
    const [textarea, setTextarea] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    // Effect to set the textarea content when editCommintData changes
    useEffect(() => {
        if (editCommintData) {
            setTextarea(editCommintData.content);
        }
    }, [editCommintData]);

    // Reset function to clear textarea
    const reset = () => {
        setTextarea('');
        showEditReply(false); // Close the popup on reset
    };
    console.log(auth.Token);
    console.log(editCommintData);

    // Handle the edit action
    const handleEdit = async (e) => {
        e.preventDefault();

        // Add your API endpoint here
        const response = await axios.put(`http://localhost:4000/api/post/${idPost}/${editCommintData._id}/updateComment`,{
            content: textarea
        }, {
            headers: {
                Authorization: `Bearer ${auth.Token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Handle successful edit (e.g., close popup, refresh comments)
            handleShowPopup(false);
        } else {
            // Handle error
            console.error('Failed to edit comment');
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
                    <span>Edit a Reply</span>
                    <img src={exit} alt="Close" onClick={reset} />
                </div>
                <div className="popup-user-info">
                    <span>{editCommintData.authorName}</span>
                </div>
                <textarea
                    placeholder='What do you want to talk about?'
                    className='textarea'
                    autoFocus
                    value={textarea}
                    onChange={(e) => setTextarea(e.target.value)}
                />
                <div className="popup-footer">
                    <button
                        disabled={!textarea}
                        className={textarea.length !== 0 ? "" : "disabled"}
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </div>
            </div>
        )
    );
};

export default PopupReply;
