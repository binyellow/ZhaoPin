
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './container/Login/Login';
import Register from './container/Register/Register';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import './config';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer';
import BossInfo from './container/BossInfo/BossInfo'
import GeniusInfo from './container/GeniusInfo/GeniusInfo'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import AuthRoute from './components/AuthInfo/AuthInfo';
import DashBoard from './container/DashBoard/DashBoard';
import EditPwd from './container/EditPwd/EditPwd';
import Chat from './components/Chat/Chat';

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():()=>{}
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
				<Switch>
					<Route path='/boss-info' component={BossInfo}></Route>
					<Route path='/genius-info' component={GeniusInfo}></Route>
					<Route path='/login' component={Login}></Route>
                    <Route path='/chat/:username' component={Chat}></Route>
					<Route path='/register' component={Register}></Route>
                    <Route path='/edit-pwd' component={EditPwd}></Route>
					<Route component={DashBoard}></Route>
				</Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
document.getElementById('root'))
