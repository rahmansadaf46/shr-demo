import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducers from './Reducers';

export function configureStore(initialState) {

    const Store = createStore(
        Reducers,
        initialState,
        composeWithDevTools (applyMiddleware(thunk))
    );
    return Store;
}
