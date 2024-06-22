import { combineReducers } from 'redux';
import registerReducer from './Register/registerReducer';
import articlesReducer from './Articles/articlesReducer';
import userReducer from './User/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  register: registerReducer,
  articles: articlesReducer,
});

export default rootReducer;