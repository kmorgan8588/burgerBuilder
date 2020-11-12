import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import burgerReducer from './reducers/burderBuilder';
import orderReducer from './reducers/order';
import authRecuder from './reducers/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({
    burger: burgerReducer,
    order: orderReducer,
    auth: authRecuder
}), composeEnhancers(
    applyMiddleware(thunk)
))

export default store;

