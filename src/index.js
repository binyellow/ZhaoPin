
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './container/Login/Login';
import Register from './container/Register/Register';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer';
import GeniusInfo from './container/GeniusInfo/GeniusInfo'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
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
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/genius-info" exact component={GeniusInfo}/>
                    <Redirect to="/register"/>
                    {/* 匹配不到就跳转到register */}
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
document.getElementById('root'))
