import axios from "axios";
import * as Types from "./actionTypes";
// import {sessionService} from "redux-react-session"
export const setRegistrationStatus = (payload) => ({
  type: Types.SET_REGISTRATION_STATUS,
  payload:payload,
});
export const updateUserData = (userData) => {
  return {
    type: Types.UPDATE_USER_DATA,
    payload: userData,
  };
};
  export const postUserDataRequest = () => ({
    type: Types.POST_USER_DATA_REQUEST,
  });
  
  export const postUserDataSuccess = () => ({
    type: Types.POST_USER_DATA_SUCCESS,
  });
  
  export const postUserDataFailure = (error) => ({
    type: Types.POST_USER_DATA_FAILURE,
    payload: error,
  });
  
  export const postUserData = (userData,setShowError,setSuccessOtp,setOverlay) => {
    return async (dispatch) => {
      dispatch(postUserDataRequest());
  
      try {
        const response = await axios.post('http://localhost:4000/api/user/register', userData);
        dispatch(postUserDataSuccess(response.data));
        console.log(response)
        dispatch(setRegistrationStatus(true));
  
        if (response.status === 201) {
          console.log('OTP sent successfully');
          setSuccessOtp('OTP sent successfully');
          setOverlay(true)
        } else if (response.status === 400) {
          console.error('Email is already registered');
        } else {
          console.log('Unexpected response:', response.data);
        }
      } catch (error) {
        dispatch(postUserDataFailure(error.message));
        if (error.response && error.response.status === 400) {
          console.error('Error:', error.response.data.error);
          setShowError(error.response.data.error);
          setOverlay(true)
        } else {
          console.error('Error:', error);
          setShowError('An unexpected error occurred.');
          setOverlay(true)
        }
      }
    };
  };
  
  

  // export const loginUser=(credentials,navigate,setLoginError)=>{
  //    axios.post('http://localhost:4000/api/user/login',
  //    credentials,
  //    {
  //      headers:{
  //       'Content-Type': "application/json"
  //      }
  //    }
  //   ).then((res)=>{
  //      const {data}=res;
  //      if(data.status==='FAILED'){
  //        const {message}=data;
  //        if(message.includes('credentials')){
  //         setLoginError('email',message);
  //         setLoginError('password',message);
  //        }
  //        else if(message.includes('password')){
  //         setLoginError('password',message);
  //        }
  //      }
  //      else if(data.status==='SUCCESS'){
  //         const userData = data.data[0];
  //         const token =userData._id;
         
  //      }


  //   }).catch((err)=>{
  //     console.error(err)
  //   })
  // }
  // export const signupUser=()=>{
    
  // }
  // export const logoutUser=()=>{
    
  // }