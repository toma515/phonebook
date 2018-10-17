import { combineReducers } from 'redux';

import logReducer from './logReducer';
import phoneReducer from './phoneReducer';

const reducers = combineReducers({
  logReducer, phoneReducer
});

export default reducers;
