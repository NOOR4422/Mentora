import * as Types from "./actionTypes"
const initialState={
      userData:{},
      loading: false,
      error: null,
      registrationCompleted: false,
}
const registerReducer=(state=initialState,action)=>{
  switch(action.type){
    case Types.SET_REGISTRATION_STATUS:
      return {
        ...state,
        registrationCompleted: action.payload,
      };
      case Types.UPDATE_USER_DATA:
        const updatedUserData = {
          ...state.userData,
          ...action.payload,
        };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        return {
          ...state,
          userData: updatedUserData,
        };
    case Types.POST_USER_DATA_REQUEST:
        return{
            ...state,
            loading:true,
            error:null,
        };
    case Types.POST_USER_DATA_SUCCESS:
        return{
            ...state,
            loading:false,
        };
    case Types.POST_USER_DATA_FAILURE:
        return{
            ...state,
            loading:false,
            error:"faild to post data",
        };
     default:
        return state
  }
};
export default registerReducer;