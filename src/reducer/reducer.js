import {combineReducers} from 'redux';
import {login} from './login';
import {UserList} from './UserList-redux';
import {ChatList} from './ChatList-redux'
import {CollectionList} from './Collection-redux'

export default combineReducers({login,UserList,ChatList,CollectionList});