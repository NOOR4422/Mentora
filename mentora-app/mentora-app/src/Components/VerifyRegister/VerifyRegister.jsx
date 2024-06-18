import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyRegister.css";
import image from "../../assets/Verification.png";
import axios from "axios";
import exit from "../../assets/exit.png";
import error404 from "../../assets/error404.png"
import error400 from "../../assets/error400.png"
import successSendOtp from "../../assets/successSendOtp.png"
import { connect } from "react-redux";
const VerifyRegister = ({userData}) => {
  const navigate = useNavigate();
  

  // Rest of your component code...
//   const location = useLocation();
//   const userDataRef = useRef(null);
//   const userData = useSelector(state => {
//     userDataRef.current = state.register.userData;
//     return userDataRef.current;
//   });
//   const emailFromForgetPassword = location.state?.email || "";
  // const isFromForgetPassword = location.state?.fromForgetPassword || false;
  // console.log(isFromForgetPassword)
  // console.log(location);

  const [verificationCode, setVerificationCode] = useState([ "", "","", "", "", ""]);
  const [counter, setCounter] = useState(59);
  const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
     console.log(isLoading)
    const timer = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading]);

  useEffect(() => {
    setIsResendButtonDisabled(counter !== 0);
  }, [counter]);
  

  useEffect(() => {
    const firstInput = document.getElementById("code-input-0");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);
  const handleCodeChange = (index, value) => {
    if ((value.match(/^\d+$/) && value.length <= 1) || value.length === 0) {
      const newCode = [...verificationCode];

      newCode[index] = value;
      setVerificationCode(newCode);

      if (value.length === 0 && index > 0) {
        const previousInput = document.getElementById(
          `code-input-${index - 1}`
        );

        if (previousInput) {
          previousInput.focus();
        }
      } else if (index < 5 && value.length === 1) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);

        if (nextInput) {
          nextInput.focus();
        }
      }

      if (index === 5 && value.length === 1) {
        setIsLoading(true);
        setTimeout(() => {
          const inputField = document.getElementById(`code-input-${index}`);
          if (inputField) {
            inputField.focus();
          }
        }, 0);
        const otpCode = newCode.join("");
        console.log(otpCode);
        const verifyOtp ={
          inputOtp: otpCode,
        }
       verifyRegisterOTP(verifyOtp);
        setOverlay(true);
      }
      
    }
  };

  
  const Navigate =useNavigate();
  const [showError,setShowError]=useState('');
  const [successOtp,setSuccessOtp]=useState('');
  const [overlay,setOverlay] =useState(false);
   const exitPopupError404 = () => {
     setShowError('')
     setOverlay(false);
     setVerificationCode([ "", "","", "", "", "", ])
     const firstInput = document.getElementById("code-input-0");
      if (firstInput) {
      firstInput.focus();
      }
   };
   const exitPopupError400 = () => {
     setShowError('')
     setOverlay(false);
     setVerificationCode([ "", "","", "", "", "", ])
     const firstInput = document.getElementById("code-input-0");
     if (firstInput) {
      firstInput.focus();
    }
   };
 
  const exitPopupSuccessSendOtp =()=>{
     setSuccessOtp('')
     setOverlay(false)
     setVerificationCode([ "", "","", "", "", "", ])
     navigate('/loginpage')
  }


  
  

  const verifyRegisterOTP = async (verifyOtp) => {
    try {
      const response = await axios.post("http://localhost:4000/api/user/verifyRegisterOTP",verifyOtp );
      if (response.status === 200) {
        console.log("Registration completed successfully");
        setSuccessOtp('Registration completed successfully');
      } 
      else {
        console.error("Invalid OTP");
        setShowError("Invalid OTP");
      }
    } catch (error) {
        if (error.response.status === 400) {
            console.error('Error:', error.response.data.error);
            setShowError(error.response.data.error);
          } else {
            console.error("Error verifying OTP:", error);
            setShowError('Error verifying OTP:');
          }
    }
  };
  

  const handleResendCode = () => {
    setIsResendButtonDisabled(true);
    setCounter(59);
    //  resendOTP();
    Navigate('/register')
  };

//   const resendOTP = async () => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/user/register",userData);
//       if (response.data.success) {
//         setCounter(59);
//         setIsResendButtonDisabled(false);
//         console.log('OTP sent Again successfully');
//       } else {
//         console.error("Error resending OTP:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error resending OTP:", error);
//     }
//   };

  return (
    <div className="container">
      <div className="verificationContainer">
        <div className="rightSection">
          <img src={image} alt="Learning" className="learningImage" />
        </div>
        <div className="leftSection">
          <h1 className="verificationPageText">Verification Register</h1>
          <p className="verificationInfoText">
            We have sent a code to your mobile number at
            <strong>{userData.email}</strong>. Please enter the 6-digit
            code you received.
          </p>
          <div className="verificationCodeInputContainer">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`code-input-${index}`}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                maxLength="1"
                className="verificationCodeInput"
              />
            ))}
          </div>
          <p className="verificationInfoText">
            Don't receive the code? Resend code in <strong>{counter} s</strong>
          </p>
          <button
            className="resendCodeButton"
            onClick={handleResendCode}
            style={{
              cursor: isResendButtonDisabled ? "not-allowed" : "pointer",
              opacity: isResendButtonDisabled ? 0.5 : 1,
            }}
            disabled={isResendButtonDisabled}
          >
            Resend Code
          </button>
        </div>
      </div>

      {showError&& 
           <>
                  {showError==="Error verifying OTP:"?  
                    <div className="popup-register">
                       <div className="popup-header">
                         <img src={exit} alt="not found"  onClick={()=>{exitPopupError404()}}/>
                       </div>
                       <img src={error404} alt="not found" />
                       <p style={{ color: 'red', fontFamily: "'Trocchi', serif", fontSize: '16px' }} >{showError}</p>
                     </div>
                  :
                  showError==="Invalid OTP"?
                  <div className="popup-register">
                     <div className="popup-header">
                        <img src={exit} alt="not found"  onClick={()=>{exitPopupError400()}}/>
                     </div>
                    <img src={error400} alt="not found" />
                    <p style={{ color: '#206F7E', fontFamily: "'Trocchi', serif", fontSize: '16px' }} >{showError}</p>
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
  );
};

const mapStateToProps = (state) => ({
    userData: state.register.userData,
  });
  
  
  export default connect(mapStateToProps)(VerifyRegister);