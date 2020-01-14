import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import root from './reducer';

export default (preloadState) => {
    return createStore(root, preloadState, applyMiddleware(thunkMiddleware));
}