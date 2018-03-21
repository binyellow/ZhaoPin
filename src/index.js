
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './container/Login/Login';
import Register from './container/Register/Register';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer';
import AuthInfo from './components/AuthInfo/AuthInfo';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():()=>{}
));
const GeniusInfo = ()=>{
    return <div>GeniusInfo</div>
}
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthInfo/>
                <Switch>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/genius-info" component={GeniusInfo}/>
                    <Redirect to="/register"/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
document.getElementById('root'))
