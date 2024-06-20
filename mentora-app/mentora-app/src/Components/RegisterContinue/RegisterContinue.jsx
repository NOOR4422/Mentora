import {React,useState,useRef} from 'react'
import FacebookIcon from '../../assets/FacebookIcon.svg';
import googleIcon from '../../assets/googleIcon.svg';
import registerImage from '../../assets/rafiki.svg';
import invisibleEye from "../../assets/invisible-eye.svg";
import visibleEye from '../../assets/visible-eye.svg';
import exit from "../../assets/exit.png";
import error404 from "../../assets/error404.png"
import error400 from "../../assets/error400.png"
import successSendOtp from "../../assets/successSendOtp.png"
import {Link, useNavigate } from 'react-router-dom';
import "./RegisterContinue.css";
import { connect ,useSelector} from "react-redux";
// import axios from "axios";
import {updateUserData, postUserData} from "../../redux/Register/registerActions";
const RegisterContinue=({ updateUserData, postUserData }) =>{
  const Navigate =useNavigate();
  const userDataRef = useRef(null);
  const userData = useSelector(state => {
    userDataRef.current = state.register.userData;
    return userDataRef.current;
  });
 
  const [focused, setFocused] = useState({
    password:false,
    confirmPassword:false,
     DOB:true,
     country:true,
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

  const [visible,setVisible]=useState({
      passVisible:false,
      confirmPassVisible:false,
    });
    const toggleVisiablityPass=()=>{
      setVisible({
        ...visible,
        passVisible: !visible.passVisible,
      })
    }
    const toggleVisiablityConfirmPass=()=>{
      setVisible({
        ...visible,
        confirmPassVisible: !visible.confirmPassVisible,
      })
    }
    
    const [Value,setValue]=useState({
      password:"",
      confirmPassword:"",
      dateOfBirth:"",
      country:"Egypt",
    })
    // console.log(Value.password)
    const [error,setError]=useState({
      PassError:'',
      ConfirmPassError:'',
      DobError:'',
    })

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name !== "confirmPassword") {
       updateUserData({ [name]: value });
       }
      setValue({
      ...Value,
      [name]: value,
      });
   };
    
   const [showError,setShowError]=useState('');
   const [successOtp,setSuccessOtp]=useState('');
   const [overlay,setOverlay] =useState(false);

    const exitPopupError404 = () => {
      setShowError('')
      setOverlay(false);
    };
    const exitPopupError400 = () => {
      setShowError('')
      setOverlay(false);
      Navigate("/register")
    };
  
   const exitPopupSuccessSendOtp =()=>{
      setSuccessOtp('')
      setOverlay(false)
      Navigate('/verifyRegister')
   }

    // console.log("final showwwwwwwwwww",showError)
    // console.log(overlay)
    const handelCreateAcountButton=(e)=>{
      e.preventDefault();
      const PassError = handelPassError();
      const ConfirmPassError =handelConfirmPassError();
      const DobError=handelDobError();
      setError({
        PassError,
        ConfirmPassError,
        DobError,
      });
     
      if(userData&& userData.firstName&& userData.lastName&& userData.email&&userData.password&&userData.dateOfBirth){
        postUserData(userData,setShowError,setSuccessOtp,setOverlay);
      }
      
      else {
        Navigate('/registerContinue',{replace:true})
      }
      
    }
    const handelPassError=()=>{
      if(Value.password.length===0){
        return 'Please fill out this field';
      }else if (Value.password.length < 8){
        return 'length must be more than or equal 8';
      }else  return '';
    };
    const handelConfirmPassError=()=>{
      if (Value.confirmPassword.length === 0) {
        return 'Please fill out this field';
      } else if (Value.password !== Value.confirmPassword) {
        return 'Oops! Your passwords do not match. Try again';
      } else {
        return '';
      }
    }
    const handelDobError=()=>{
      if(Value.dateOfBirth.length===0){
        return 'Please fill out this field'
      }
      else return ''
    }
  return (
    <div className="Container">
       <div className="RegisterContainer">
         <div className="imageReg">
           <img src={registerImage} alt="not found" />
         </div>
         <div className="contentReg">
           <div className='containTitleForm'> 
            <div className="title">Register</div>
            <form action="">
           <div className="fieldsSection">
               <div className={`input-container ${focused.password ? 'focused' : ''}`}>
                 <input type={visible.passVisible ?"text":"password"} onFocus={handleFocusBlur('password')} onBlur={handleFocusBlur('password')}  onChange={handleChange} name="password" value={Value.password} />
                 <div onClick={toggleVisiablityPass}>{visible.passVisible? <img className="visible" src={visibleEye} alt='not found'/>:<img src={invisibleEye} alt='not found'/>}</div>
                 <label className='label'>Password</label>
                 <p>{error.PassError}</p>
               </div>
               <div className={`input-container ${focused.confirmPassword ? 'focused' : ''}`}>
                 <input type={visible.confirmPassVisible ?"text":"password"} onFocus={handleFocusBlur('confirmPassword')} onBlur={handleFocusBlur('confirmPassword')} onChange={handleChange} name="confirmPassword"  value={Value.confirmPassword} />
                 <div onClick={toggleVisiablityConfirmPass}>{visible.confirmPassVisible ? <img className="visible" src={visibleEye} alt='not found'/>:<img  src={invisibleEye} alt='not found'/>}</div>
                 <label className='label'>Confirm Password</label>
                 <p>{error.ConfirmPassError}</p>
               </div>
               <div className={`input-container ${focused.DOB ? 'focused' : ''}`}>
                 <input type="date" value={Value.Dob} onChange={handleChange} name='dateOfBirth'/>
                 <label className='label'>Date Of Birth</label>
                 <p>{error.DobError}</p>
               </div>
               <div className={`input-container ${focused.country ? 'focused' : ''}`}>
                <label htmlFor="country" >Country</label>
                 <select id="country" name="country" value={Value.country} onChange={handleChange}>
                  <option value="egypt">Egypt</option>
                  <option value="canada">Canada</option>
                  <option value="us">United States</option>
                </select>
               </div>
           </div>
            <div className="continueButton">
              <button onClick={handelCreateAcountButton}>Create Account</button>
             </div>
            </form>
          </div>
           <div className="or">
            <p>or</p>
           </div>
           <div className="social">
             <img src={googleIcon} alt="not found" />
             <img src={FacebookIcon} alt="not found" />
           </div>
           <div className="alreadyHaveAccount">
             <p>Already have an account? <Link to='/loginpage'>Login</Link> </p>
           </div>
         </div>
       </div>
        
           {showError&& 
           <>
                  {showError==="An unexpected error occurred."?  
                    <div className="popup-register">
                       <div className="popup-header">
                         <img src={exit} alt="not found"  onClick={()=>{exitPopupError404()}}/>
                       </div>
                       <img src={error404} alt="not found" />
                       <p style={{ color: 'red', fontFamily: "'Trocchi', serif", fontSize: '16px' }} >{showError}</p>
                     </div>
                  :
                  <div className="popup-register">
                     <div className="popup-header">
                        <img src={exit} alt="not found"  onClick={()=>{exitPopupError400()}}/>
                     </div>
                    <img src={error400} alt="not found" />
                    <p style={{ color: '#206F7E', fontFamily: "'Trocchi', serif", fontSize: '16px' }} >{showError}</p>
                 </div>
                  }
           </>}

           {successOtp&&
              <div className="popup-register">
                   <div className="popup-header">
                          <img src={exit} alt="not found"  onClick={()=>{exitPopupSuccessSendOtp()}}/>
                   </div>
                  <img src={successSendOtp} alt="not found" />
                  <p style={{  color: '#206F7E', fontFamily: "'Trocchi', serif", fontSize: '16px' }} >{successOtp}</p>
              </div>
           }
           {overlay && <div className="overlay"></div>}
     </div>
  )
}

const mapStateToProps = (state) => ({
  userData: state.register.userData,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: (userData) => dispatch(updateUserData(userData)),
  postUserData: (userData, setShowError,setSuccessOtp,setOverlay) => dispatch(postUserData(userData, setShowError,setSuccessOtp,setOverlay)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContinue);