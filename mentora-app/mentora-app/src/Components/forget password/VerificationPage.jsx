import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./VerificationPage.css";
import image from "../../assets/Verification.png";
import axios from "axios";

const VerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromForgetPassword = location.state?.email || "";
  // const isFromForgetPassword = location.state?.fromForgetPassword || false;
  // console.log(isFromForgetPassword)
  // console.log(location);

  const [verificationCode, setVerificationCode] = useState([ "", "","", "", "", "", ]);
  const [counter, setCounter] = useState(59);
  const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsResendButtonDisabled(counter !== 0);
  }, [counter]);

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
        const otpCode = verificationCode.join("");
       
      }
    }
  };

  // const verifyAndProceed = async (otpCode) => {
  //   try {
  //     const response = await axios.post("http://localhost:4000/api/verifyPasswordResetOTP", {
  //       email: emailFromForgetPassword,
  //       otp: otpCode,
        
  //     });

  //     if (response.data.success) {
  //       navigate("/createNewPass");
  //     } else {
  //       console.error("Incorrect OTP");
  //     }

  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error("Error verifying OTP:", error);
  //   }
  // };

  const handleResendCode = () => {
    setIsResendButtonDisabled(true);
    setCounter(59);
    const email = emailFromForgetPassword;
    resendOTP(email);
  };

  const resendOTP = async (email) => {
    try {
      const response = await axios.post("http://localhost:4000/api/resend-otp", { email });

      if (response.data.success) {
        setCounter(59);
        setIsResendButtonDisabled(false);
      } else {
        console.error("Error resending OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <div className="container">
      <div className="verificationContainer">
        <div className="rightSection">
          <img src={image} alt="Learning" className="learningImage" />
        </div>
        <div className="leftSection">
          <h1 className="verificationPageText">Verification</h1>
          <p className="verificationInfoText">
            We have sent a code to your mobile number at{" "}
            <strong>{emailFromForgetPassword}</strong>. Please enter the 6-digit
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
    </div>
  );
};

export default VerificationPage;
