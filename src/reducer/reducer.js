import {combineReducers} from 'redux';
import {login} from './login';
import {note} from './note';

export default combineReducers({login,note});