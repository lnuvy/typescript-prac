import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory, History } from "history";
import { connectRouter } from "connected-react-router";
// import User from "./modules/user";

export const history: History = createBrowserHistory();

// 리듀서 router 안에 history 넣기
const rootReducer = combineReducers({
  // user: User,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}
const composeEnhancers =
  typeof (window as any) === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = () => createStore(rootReducer, enhancer);

export default store();
