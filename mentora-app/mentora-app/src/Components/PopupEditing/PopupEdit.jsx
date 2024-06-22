import { React, useContext, useEffect, useState } from 'react'
import "../Popup/Popup.css"
import { User } from "../Context/userContext";
import exit from "../../assets/exit.png";
import defaultimage from "../../assets/Default_avatar.png"

import axios from 'axios';
const PopupEdit = ({ type, ShowPopup, handleShowPopup, editArticleData, handlePopupType, handleOverlay }) => {
  const { auth } = useContext(User);
  const [textarea, setTextarea] = useState('');
  const {_id}=editArticleData || ""
  console.log(_id);
  //
  useEffect(() => {
    if (editArticleData) {
      setTextarea(editArticleData.content);
    }
  }, [editArticleData]);
  const rest = () => {
    setTextarea('');
    handleShowPopup();
    handleOverlay(false);
  }


  const handleEdit = async (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    rest(e)
    // Add your API endpoint here
    const response = await axios.put(`https://mentora-5s1z.onrender.com/api/post/${_id}/updatePost`, {
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
    handleShowPopup();
    handleOverlay(false);

  }

  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    ShowPopup &&
    <>
      <div className='popup-container'>
        <div className="popup-header">
          <span>Edite Post</span>
          <img src={exit} alt="not found" onClick={rest} />
        </div>
        <div className="popup-user-info">
          <img src={defaultimage} alt="not found" />
          <span>{editArticleData.author.firstName + " " + editArticleData.author.lastName}</span>
        </div>
        <textarea placeholder='what do you want  to talk about ?' value={textarea} className='textarea' autoFocus={true} onChange={(e) => { setTextarea(e.target.value) }} />

        <div className="popup-footer">
          <button disabled={!textarea ? true : false} className={textarea.length !== 0 ? "" : "disabled"} onClick={handleEdit}>edit</button>
        </div>
      </div>
    </>
  )
}

export default PopupEdit; 
