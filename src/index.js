
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './container/Login/Login';
import Register from './container/Register/Register';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():()=>{}
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Redirect to="/login"/>
            </Switch>
        </BrowserRouter>
    </Provider>, 
document.getElementById('root'))
