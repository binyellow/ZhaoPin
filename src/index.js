
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/Login';
import DashBoard from './components/DashBoard'
import Test from './Test';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import {Row} from 'antd';

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():()=>{}
));
const A = ()=>{
    return <h4>A</h4>
}
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Row style={{alignItems:"center",flexDirection:'column'}} type="flex">
                <Switch>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/dashboard" exact component={DashBoard}/>
                    <Route path="/test/:a" component={Test}/>{/*：后面是路径参数,?后面是查询参数*/}
                    <Redirect to="/dashboard"/>{/*如果都没匹配到，就跳转到这里*/}
                </Switch>
            </Row>
        </BrowserRouter>
    </Provider>, 
document.getElementById('root'))
