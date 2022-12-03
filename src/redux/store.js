import { createStore, combineReducers, applyMiddleware, } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from "redux-thunk";


import uiReducer from "./reducers/uiReducer";
import userReducer from "./reducers/userReducer";

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
  });

const initialState = {};
const middleware = [thunk];
const reducers = combineReducers({
    // add reducer here
    ui: uiReducer,
    user: userReducer,
});

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

 const enhancer = composeEnhancers(applyMiddleware(...middleware));
 const store = createStore(reducers, initialState, enhancer);

 export default store;