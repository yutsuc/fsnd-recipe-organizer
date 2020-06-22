import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./components/App";
import reducers from "./reducers";
import middlewares from "./middleware";
import { Auth0Provider } from "./utils/react-auth0-spa";
import config from "./auth_config.json";

const store = createStore(reducers, middlewares);
const history = createBrowserHistory();

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
    <Provider store={store}>
        <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Auth0Provider>
    </Provider>,
    document.getElementById("root")
);