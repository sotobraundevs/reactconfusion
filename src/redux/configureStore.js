import {createStore, combineReducers, applyMiddleware } from 'redux'; //Permite crear el store
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
//configara para guardar el form
import { createForms } from 'react-redux-form';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({    // Permite combinar todo los store de redux
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
            
        }), 
        applyMiddleware(thunk, logger) //
    );

    return store;
}