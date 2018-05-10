import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'remote-redux-devtools';

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
// Connect our store to the reducers
export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));