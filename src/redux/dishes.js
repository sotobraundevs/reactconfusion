import * as ActionTypes from './ActionTypes';

export const Dishes = (state = { //tres nuevas propieadades 
    isLoading: true, // Cuadno se llame a ADD_DISHES pasa a false
    errMess: null,
    dishes:[]},
     action) => {
    switch (action.type) {  //se aregarn las aciones creados en el ActionCreator
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

        case ActionTypes.DISHES_LOADING://...state para modificar el estado futuro el estado
            return {...state, isLoading: true, errMess: null, dishes: []}

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};