import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./LoginPage.css";
import image from "../../assets/login.png";
import googleIcon from "../../assets/googleIcon.svg"
import FacebookIcon from "../../assets/FacebookIcon.svg"
import invisibleEye from "../../assets/invisible-eye.svg";
import visibleEye from '../../assets/visible-eye.svg';
import axios from 'axios';
import exit from "../../assets/exit.png";
import error404 from "../../assets/error404.png"
import error400 from "../../assets/error400.png"
import successSendOtp from "../../assets/successSendOtp.png"
import Cookies from 'universal-cookie';
import { User } from "../Context/userContext";
import { useDispatch } from "react-redux";
import { SaveIdUser ,SaveNameUser, SavePhotoUser} from "../../redux/User/userSlice";

const LoginPage = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();

    const cookies = new Cookies();
    const user=useContext(User)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors,setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };
 const handleFormSubmit = async (e) => {
   e.preventDefault();

   
   if (!formData.email.trim()) {
     setErrors({
      ...errors,
      email:"Email is required",
     })
   }
   if (!formData.password.trim()) {
     setErrors({
      ...errors,
      password:"Password is required",
     })
   }
   setFormErrors(errors);

   if (formData.email && formData.password) {
   try {
     const response = await axios.post(
       process.env.REACT_APP_URL + "user/login",
       formData,
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );

     const { Token, refreshToken } = response.data;
     console.log(response.data);
     const CurrentUser = await axios.get(
      process.env.REACT_APP_URL + "user/",
      
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(CurrentUser);
      if (response.status === 200) {
        cookies.set('Bearer', Token);
        // user.setAuth({Token,refreshToken})
        console.log(user, "contex")
        user.setAuth(response.data);
        console.log(response.data.message);
        setOverlay(true)
        setSuccessOtp(response.data.message);
        dispatch(SaveIdUser(CurrentUser.data.data.user._id))
        dispatch(SaveNameUser(CurrentUser.data.data.user.name))
        dispatch(SavePhotoUser(CurrentUser.data.data.user.profilePicture))

      } else {
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
        if (error.response.data){
           if (error.response.status === 401) {
               console.error('Incorrect password');
               setOverlay(true)
               setShowError("Incorrect password");
           } else if (error.response.status === 404) {
               console.error( error.response.data.error);
               setOverlay(true)
               setShowError(error.response.data.error);
           } 
        }
        else {
        console.error('Error:', error.message);
        }
    }
   }

  
  };
  
 const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showError,setShowError]=useState('');
   const [successOtp,setSuccessOtp]=useState('');
   const [overlay,setOverlay] =useState(false);

    const exitPopupError404 = () => {
      setShowError('')
      setOverlay(false);
      navigate("/register")
    };
    const exitPopupError401 = () => {
      setShowError('')
      setOverlay(false);
    };
  
   const exitPopupSuccessSendOtp =()=>{
      setSuccessOtp('')
      setOverlay(false)
      navigate('/home')
   }


  return (
    <div className="container">
      <div className="loginContainer">
        <div className="rightSection">
          <img src={image} alt="img" className="learningImage" />
        </div>
        <div className="leftSection">
          <h1 className="loginPageText">Login</h1>
          
          <form className="loginForm" onSubmit={handleFormSubmit}>
            <label className="label">Email:</label>
            <input
              type="email"  
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className={`inputField ${formErrors.email ? "error" : ""}`}
            />
            {formErrors.email && (
              <div className="errorText">{formErrors.email}</div>
            )}


            <label>Password:</label>
            <div className="passwordInputContainer">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className={`inputField ${formErrors.password ? "error" : ""}`}
              />
              {formErrors.password && (
                <div className="errorText">{formErrors.password}</div>
              )}

                 <div onClick={togglePasswordVisibility}>
                      {showPassword ? (
                       <img className="eyeIcon" src={visibleEye} alt="Visible" />
                       ) : (
                      <img className="eyeIcon" src={invisibleEye} alt="Invisible" />
                     )}
                   </div>
            </div>

            <div className="forgotPassword">
              <Link to="/forgetPassword" className="forgetpass-link">
                Forget Password?
              </Link>
            </div>

            <button type="submit" className="loginButton">
              Login
            </button>
          </form>

          <div className="or">
            <p>or</p>
           </div>
           <div className="social">
             <img src={googleIcon} alt="not found" />
             <img src={FacebookIcon} alt="not found" />
           </div>

          <div className="Register">
            <p>Don't have an account?<Link to='/register' className="registerLink">Sign Up</Link> </p>
          </div>
        </div>
      </div>
      {showError&& 
           <>
                  {showError==="Incorrect password"?  
                    <div className="popup-register">
                       <div className="popup-header">
                         <img src={exit} alt="not found"  onClick={()=>{exitPopupError401()}}/>
                       </div>
                       <img src={error400} alt="not found" />
                       <p style={{ color: 'red', fontFamily: "'Trocchi', serif", fontSize: '16px' }} >{showError}</p>
                     </div>
                  :
                  <div className="popup-register">
                     <div className="popup-header">
                        <img src={exit} alt="not found"  onClick={()=>{exitPopupError404()}}/>
                     </div>
                    <img src={error404} alt="not found" />
                    <p style={{ color: 'red', fontFamily: "'Trocchi', serif", fontSize: '16px' }} >{showError}</p>
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
  );
};


export default LoginPage;