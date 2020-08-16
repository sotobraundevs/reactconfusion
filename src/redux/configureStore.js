import {createStore} from 'redux'; //Permite crear el store
import { Reducer, initialState } from './reducer'

export const ConfigureStore = () => {
    const store = createStore(
        Reducer, // reducer
        initialState, // our initialState
    );

    return store;
}