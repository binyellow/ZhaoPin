import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./container/Login/Login";
import Register from "./container/Register/Register";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import "./config";
import { Provider } from "react-redux";
import reducer from "./reducer/reducer";
import BossInfo from "./container/BossInfo/BossInfo";
import GeniusInfo from "./container/GeniusInfo/GeniusInfo";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoute from "./components/AuthInfo/AuthInfo";
import DashBoard from "./container/DashBoard/DashBoard";
import EditPwd from "./container/EditPwd/EditPwd";
import Chat from "./components/Chat/Chat";
import Detail from "./container/Detail/Detail";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div style={{ height: "100%" }}>
        <AuthRoute />
        <Switch>
          <Route path="/boss-info" component={BossInfo} />
          <Route path="/genius-info" component={GeniusInfo} />
          <Route path="/login" component={Login} />
          <Route path="/chat/:username" component={Chat} />
          <Route path="/register" component={Register} />
          <Route path="/edit-pwd" component={EditPwd} />
          <Route path="/detail/:username" component={Detail} />
          <Route component={DashBoard} />
        </Switch>
        {/* <MediaQuery minWidth={800}>
                        <Route component={DashBoardPc}></Route>
                    </MediaQuery>
                    <MediaQuery maxWidth={800}>
                        <Route component={DashBoardMobile}></Route>
                </MediaQuery> */}
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
