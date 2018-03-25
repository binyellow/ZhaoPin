
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './container/Login/Login';
import Register from './container/Register/Register';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer';
import BossInfo from './container/BossInfo'
import GeniusInfo from './container/GeniusInfo/GeniusInfo'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import AuthRoute from './components/AuthInfo/AuthInfo';
const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():()=>{}
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
				<Switch>
					<Route path='/boss-info' component={BossInfo}></Route>
					<Route path='/genius-info' component={GeniusInfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
					{/* <Route component={Dashboard}></Route> */}
				</Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
document.getElementById('root'))
