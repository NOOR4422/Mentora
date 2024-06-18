import {React,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV ,faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import "./CommunityRightSection.css";
import CommunityPageBody from './CommunityPageBody'
import community  from "../../../assets/communityIcon.png";
import exit from "../../../assets/exitWhite.png"
import name from "../../../assets/communityname.png"
import axios from "axios";
import Cookies from "universal-cookie";

const CommunityRightSection = ({showCreatePopup,handelshowCreatePopup,overlay,showFindPopup,handelshowFindPopup}) => {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleOptionsClick = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };
  const handleDeleteOptionClick = () => {
    setIsOptionsMenuOpen(false);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    localStorage.removeItem("chatMessages");
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const [focused, setFocused] = useState({
    communityName:false,
    discription:false,
    track:false,
    communityfind:false,
  });
  const handleFocusBlur = (field) => (e) => {
    if (e.type === "focus") {
      setFocused({
        ...focused,
        [field]: true,
      });
    } else if (e.type === "blur") {
      if (e.target.value === "") {
        setFocused({
          ...focused,
          [field]: false,
        });
      } else {
        setFocused({
          ...focused,
          [field]: true,
        });
      }
    }
  };
  
  const [selectedOption, setSelectedOption] = useState('Name');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  const [createCommunity,setCreateCommunity]=useState({
    communityName:"",
    description:"",
    track:"",
  })
  const handelchange=(e)=>{
    const { name, value } = e.target;
    setCreateCommunity({
      ...createCommunity,
      [name]: value,
    });
  }
  const cookies = new Cookies();
  const token = cookies.get("Bearer")
  console.log(token);
  const createmodel ={
    name:createCommunity.communityName,
    description:createCommunity.description,
    track:createCommunity.track
  }
  // const postCreateCommunity = async () => {
  //   try {
  //     const response = await axios.post("http://10.170.240.179:4000/api/communities/createNewCommunity",createmodel,
  //     {
  //       headers:{
  //         Authorization:"Bearer" ${Token};
  //       }
  //     }
  //    );
  //     if (response.status === 201) {
  //       console.log(response);
       
  //     } 
  //   } catch (error) {
  //       if (error.response.status === 400) {
  //           console.error('Error:', error.response.data.error);
          
  //         } else {
  //           console.error("Error ", error);
           
  //         }
  //   }
  // };

  const postCreateCommunity = async () => {
    try {
        const response = await axios.post(
            "http://localhost:4000/api/communities/createNewCommunity",
            createmodel,
            {
                headers: {
                  Authorization: 'Bearer ' + token
                }
            }
        );
       console.log(response);
       
    } catch (error) {
          console.error('Error:');
       
    }
};


  const handelButtonCreate =(e)=>{
    e.preventDefault();
    postCreateCommunity()
  }








  const [findCommunity,setFindCommunity]=useState({
    byname:"",
    bytrack:"",
  })
  const handelChageFindCommunity=(e)=>{
    const { name, value } = e.target;
     if(name==="byname"){
      setFindCommunity({
        [name]:value
      })
     }
     else setFindCommunity({
      [name]:value,
     })
  }

 





  return (
    <div className="right-section">
      <div className="top-bar">
        <div className="community-details">
          <h3 className="communityName"> develpers</h3>
           <span className="communityMembers"> 10 members </span>
        </div>
        <div className="options-chat">
          <FontAwesomeIcon icon={faEllipsisV} onClick={handleOptionsClick} />
          {isOptionsMenuOpen && (
            <div className="options-menu">
              <div onClick={handleDeleteOptionClick} >
                <div>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
                <div>Leave</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <CommunityPageBody />
      {isDeleteModalOpen && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <p>Are you sure you want to delete this chat?</p>
            <div className="delete-modal-buttons">
              <button onClick={handleDeleteConfirm}>OK</button>
              <button onClick={handleDeleteCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showCreatePopup&&
       <div className="popupCreateCommunity">
       <div className="header-create-community">
          <div>
             <img src={community} alt="not found" />
             <p>Create community</p>
          </div>
          <img src={exit} alt="not found" className="exit-popup" onClick={handelshowCreatePopup}/>
       </div>
       <div className="all-form">
         <div className="form">
          <div className={`input-container ${focused.communityName ? 'focused' : ''}`}>
            <input type="text" name="communityName" className="input-community-name"   onFocus={handleFocusBlur('communityName')} onBlur={handleFocusBlur('communityName')}  onChange={handelchange}/>
            <img src={name} className="communityNameIcon" alt="not found" />
            <label className='label'>community Name</label>
          </div>

          <div className={`input-container ${focused.discription ? 'focused' : ''}`}>
            <input type="textarea" name="description" className="input-community-name"   onFocus={handleFocusBlur('discription')} onBlur={handleFocusBlur('discription')} onChange={handelchange}/>
            <label className='label'>description</label>
          </div>

          <div className={`input-container ${focused.track ? 'focused' : ''}`}>
            <input type="text" name="track" className="input-community-name"   onFocus={handleFocusBlur('track')} onBlur={handleFocusBlur('track')} onChange={handelchange}/>
            <label className='label'>track</label>
          </div>

         </div>
         <div className="createCommunityButton">
           <button onClick={handelButtonCreate} >Create Commmunity</button>
         </div>
       </div>
         

       </div>
      }
       {showFindPopup&& 
          <div className="popupCreateCommunity">
           <div className="header-create-community">
            <div>
               <img src={community} alt="not found" />
               <p>Find community</p>
            </div>
            <img src={exit} alt="not found" className="exit-popup" onClick={handelshowFindPopup}/>
           </div>
           <div className="twoOptions">
                 <label>
                   <input type="radio" value="Name" checked={selectedOption === 'Name'} onChange={handleOptionChange} />
                   <p>Name</p> 
                 </label>
                 
                 <label>
                     <input type="radio"  value="Track" checked={selectedOption === 'Track'} onChange={handleOptionChange}/>
                     <p>Track</p>
                 </label>
              </div>

          {selectedOption === 'Name'&&
           <div className="all-form">
           <div className="form-find">
            
            <div className={`input-container ${focused.communityfind ? 'focused' : ''}`}>
              <input type="text" name="byname" className="input-community-name"   onFocus={handleFocusBlur('communityfind')} onBlur={handleFocusBlur('communityfind')} onChange={handelChageFindCommunity} />
              <label className='label'>Enter your community name to be fined</label>
            </div>
            <div className="createCommunityButton">
             <button>Find Commmunity</button>
           </div>
         </div>
           
  
           </div>
          }
           {selectedOption === 'Track'&&
           <div className="all-form">
           <div className="form-find">
            
            <div className={`input-container ${focused.communityfind ? 'focused' : ''}`}>
              <input type="text" name="bytrack" className="input-community-name"   onFocus={handleFocusBlur('communityfind')} onBlur={handleFocusBlur('communityfind')} onChange={handelChageFindCommunity} />
              <label className='label'>Enter your community track to be fined</label>
            </div>
            <div className="createCommunityButton">
             <button>Find Commmunity</button>
           </div>
         </div>
           
  
           </div>
          }
        </div>
       }

      {overlay && <div className="overlay"></div>}
    </div>
  );
};

export default CommunityRightSection;
