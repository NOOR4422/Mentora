import { combineReducers } from 'redux';
import registerReducer from './Register/registerReducer';
import articlesReducer from './Articles/articlesReducer';

const rootReducer = combineReducers({
  register: registerReducer,
  articles: articlesReducer,
});

export default rootReducer;