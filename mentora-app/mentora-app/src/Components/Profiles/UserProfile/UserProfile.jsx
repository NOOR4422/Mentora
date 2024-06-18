import React from 'react'
import Navbar from '../../Navbar/Navbar'
import "./UserProfile.css"
import avatar from "../../../assets/Default_avatar.png"
import edit from "../../../assets/edit.png"
import Apply from "../../../assets/ApplyAsMentor.png"
import info from "../../../assets/infoImage.png"
import email from "../../../assets/email.png"
import country from "../../../assets/country.png"
import age from "../../../assets/age.png"
import gender from "../../../assets/gender.png"
import Language from "../../../assets/language.png"
import Interests from "../../../assets/interests.png"
import Sidebar from '../../Sidebar/Sidebar'
export const UserProfile = () => {
  return (
    <>
     
      <div className="profile-container">
      <Navbar/>
        <div className="profile-content">
          <Sidebar/>
          <div className="userData">
            <div className="leftSide">
              <img src={avatar} alt="not found" className='userImage'/>
               <h2 className='userName'>nour akram</h2>
               <p className='bio'>web developer  with react</p>
               <div className="followers-following">
                 <div className="no-posts">
                   <span>0</span>
                   <p>Posts</p>
                 </div>
                 <div className="followers">
                   <span>0</span>
                   <p>Followers</p>
                 </div>
                 <div className="following">
                   <span>0</span>
                   <p>Following</p>
                 </div>
               </div>
               <div className="buttons">
                 <div className="editProfile">
                  <button>
                   <p>Edit profile</p>
                   <img src={edit} alt="not found" />
                  </button>
                 </div>
                 <div className="Apply-as-mentor">
                  <button>
                   <p>Apply as Mentor</p>
                   <img src={Apply} alt="not found" />
                  </button>
                </div>
               </div>
               <div className="line1"></div>
            </div>
            <div className="info">
               <h2>info</h2>
               <div className="img">
                <img src={info} alt="not found" />
               </div> 
               <div className="line"></div>
               <div className="Data">
                 <div className="item">
                   <div className="nameIcon">
                     <img src={email} alt="not found" />
                      <p>Email :</p>
                   </div>
                   <div className="value">
                     <p>nourakram286@gmail.com</p>
                   </div>
                 </div>
                 <div className="item">
                   <div className="nameIcon">
                     <img src={country} alt="not found" />
                      <p>Country :</p>
                   </div>
                   <div className="value">
                     <p>Egypt</p>
                   </div>
                 </div>
                 <div className="item">
                   <div className="nameIcon">
                     <img src={age} alt="not found" />
                      <p>Age :</p>
                   </div>
                   <div className="value">
                     <p>22</p>
                   </div>
                 </div>
                 <div className="item">
                   <div className="nameIcon">
                     <img src={gender} alt="not found" />
                      <p>Gender :</p>
                   </div>
                   <div className="value">
                     <p>Female</p>
                   </div>
                 </div>
               </div>
               <div className="line"></div>
               <div className="Languages">
                 <img src={Language} alt="not found" />
                  <p>Languages</p>
               </div>
               <ul className='listofLanguages'>
                <li>Arabic</li>
                <li>English</li>
               </ul>
               <div className="line"></div>
               <div className="Interests">
                 <img src={Interests} alt="not found" />
                  <p>Interests</p>
               </div>
               <ul className='listofInterests'>
                <li>programming</li>
                <li>programming</li>
               </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
