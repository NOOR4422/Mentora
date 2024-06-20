import { React, useState, useRef } from "react";
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';
import emailIcon from '../../assets/emailIcon.svg';
import FacebookIcon from '../../assets/FacebookIcon.svg';
import googleIcon from '../../assets/googleIcon.svg';
import registerImage from '../../assets/rafiki.svg';
import { connect, useSelector } from "react-redux";
import { updateUserData, postUserData } from "../../redux/Register/registerActions";
const Register = ({ updateUserData }) => {

  const navigate = useNavigate();

  const userDataRef = useRef(null);
  const userData = useSelector(state => {
    userDataRef.current = state.register.userData;
    return userDataRef.current;
  });
  // const registrationCompleted = useSelector(state => state.register.registrationCompleted);

  //  useEffect(()=>{
  //   if( registrationCompleted){
  //     navigate('/home',{replace:true})
  //   }
  //  })

  const [Error, setError] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
  })
  const [Value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })



  const handelContinueButton = (e) => {
    e.preventDefault();
    const firstNameError = CheckFirstNameValue();
    const lastNameError = CheckLastNameValue();
    const emailError = CheckEmailValue();
    setError({
      firstNameError,
      lastNameError,
      emailError,
    });
    if (userData && userData.firstName && userData.lastName && userData.email) {
      navigate('/registerContinue', { replace: true })
    }
    else navigate('/register', { replace: true })
  };
  const CheckFirstNameValue = () => {
    if (Value.firstName.length === 0) {
      return 'Please fill out this field';
    } else if (Value.firstName.length < 3) {
      return 'first name must be more than 3 characters';
    } else {
      return '';
    }
  };

  const CheckLastNameValue = () => {
    if (Value.lastName.length === 0) {
      return 'Please fill out this field';
    } else if (Value.lastName.length < 3) {
      return 'last name must be more than 3 characters';
    } else {
      return '';
    }
  };
  const CheckEmailValue = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = regex.test(Value.email);
    if (Value.email.length === 0) {
      return 'Please fill out this field';
    }
    else if (!isValid) {
      return 'Please enter a valid email';
    } else {
      return '';
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...Value,
      [name]: value,
    });
    updateUserData({ [name]: value });
  };
  const [focused, setFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
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



  return <>
    <div className="Container">
      <div className="RegisterContainer">
        <div className="FirstSection">
          <div className="title">Register</div>
          <form action="">
            <div className="fieldsSection">
              <div className={`input-container ${focused.firstName ? 'focused' : ''}`}>
                <input type="text" name="firstName" value={Value.firstName} onFocus={handleFocusBlur('firstName')} onBlur={handleFocusBlur('firstName')} onChange={handleChange} />
                <label className='label'>First Name</label>
                <p>{Error.firstNameError}</p>
              </div>
              <div className={`input-container ${focused.lastName ? 'focused' : ''}`}>
                <input type="text" name="lastName" value={Value.lastName} onFocus={handleFocusBlur('lastName')} onBlur={handleFocusBlur('lastName')} onChange={handleChange} />
                <label className='label'>Last Name</label>
                <p>{Error.lastNameError}</p>
              </div>
              <div className={`input-container ${focused.email ? 'focused' : ''}`}>
                <input type="email" name="email" value={Value.email} onFocus={handleFocusBlur('email')} onBlur={handleFocusBlur('email')} onChange={handleChange} />
                <div className="vector"><img src={emailIcon} alt="not found" /></div>
                <label className='label'>Email</label>
                <p>{Error.emailError}</p>
              </div>
            </div>
            <div className="continueButton">
              <button onClick={handelContinueButton}>Continue</button>
            </div>
          </form>
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
        <div className="SecondSection">
          <img src={registerImage} alt="not found" />
        </div>
      </div>
    </div>
  </>
}


const mapStateToProps = (state) => ({
  userData: state.register.userData,
  registrationCompleted: state.register.registrationCompleted,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: (userData) => dispatch(updateUserData(userData)),
  postUserData: (userData) => dispatch(postUserData(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);