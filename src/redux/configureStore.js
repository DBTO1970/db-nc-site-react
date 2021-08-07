import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState,
        // window.__REDUX_Extension__ && window.__REDUX_DEVTOOLS__Extension__()
    );

    return store;
}