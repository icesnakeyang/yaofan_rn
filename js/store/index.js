import {middleware} from "../navigator/AppNavigator";
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import reducers from '../reducer'

const middlewares = [
    middleware,
    thunk
]

export default createStore(reducers, applyMiddleware(...middlewares))