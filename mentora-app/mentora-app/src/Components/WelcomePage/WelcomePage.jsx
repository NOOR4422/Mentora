import React from 'react'
import "./Welcome.css";
import { useNavigate } from 'react-router';
import image1 from '../../assets/unsplash_1.png';
import image2 from '../../assets/unsplash_2.png';
import image3 from '../../assets/unsplash_3.png';
import image4 from '../../assets/unsplash_4.png';
import image5 from '../../assets/unsplash_5.png';
import image6 from '../../assets/unsplash_6.png';
import image7 from '../../assets/unsplash_7.png';
import image8 from '../../assets/unsplash_8.png';
import variety from '../../assets/finding-variety.png';
import experts from '../../assets/experts.png';
import efforts from '../../assets/efforts.png';
function WelcomePage() {
  const Navigate=useNavigate();
  return (
    <div className='WelcomePageContainer'>
      <div className="WelcomePageContent">
        <div className="firstSection">
          <div className="leftSection">
            <h1>We Help People Connect With Their Right Mentor</h1>
            <p>We Have the Right Mentors For any Job,we will Find You The Right Mentor Help You Connect With Themeasily and Effectively</p>
            <button onClick={()=>{Navigate('/register',{replace:true})}} > Get Start</button>
          </div>
          <div className="rightSection">
              <div className="verticalImages">
                <img src={image1} alt="not found" />
                <img src={image3} alt="not found" />
              </div>
              <div className="horizentalImages">
                <img src={image2} alt="not found" />
                <img src={image4} alt="not found" />
              </div>
          </div>
        </div>
        <div className="secondSection">
          <div className="leftSection">
            <img src={image5} alt="not found" />
          </div>
          <div className="rightSection">
            <h2>Find Right Mentor Now</h2>
            <p>Stay Connected With a Monthly Or Yearly Subscription </p>
            <div className="card">
              <div className="imageCard">
                <img src={image6} alt="not found" />
              </div>
              <div className="contentCard">
                <h4>Ring or Message Your Mentor Anytime</h4>
                <p>We Have the Right Mentors For any Job,we will Find You The Right Mentor Help You Connect With Them easily and Effectively</p>
              </div>
            </div>
            <div className="card">
              <div className="imageCard">
                <img src={image7} alt="not found" />
              </div>
              <div className="contentCard">
                <h4>Become a Mentor and Help Out People</h4>
                <p>We Have the Right Mentors For any Job,we will Find You The Right Mentor Help You Connect With Them easily and Effectively</p>
              </div>
            </div>
          </div>
        </div>
        <div className="thirdSection">
          <div className="leftSection">
            <img src={image8} alt="not found" />
          </div>
          <div className="rightSection">
            <h3>Hiring for a bigger project?</h3>
            <p>Mentora helps you find senior developers for both permanent full-time roles and 40+ hour contract projects.</p>
          </div>
        </div>
        <div className="fourthSection">
          <h2>What you'll find on Mentora</h2>
          <div className="nestedSection">
            <div className="card">
              <img src={variety} alt="" />
              <h4>A variety of technologies</h4>
              <p>From JavaScript and React to Swift and Go, our developers cover it all.</p>
            </div>
            <div className="card">
              <img src={experts} alt="" />
              <h4>Code help from experts</h4>
              <p>From JavaScript and React to Swift and Go, our developers cover it allOur developers go through a strict application and vetting process, leaving only the best.</p>
            </div>
            <div className="card">
              <img src={efforts} alt="" />
              <h4>Effortless setup</h4>
              <p>Take advantage of our easy set up and billing process to connect with a developer right away.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
