import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

//El action type esta listo para retonar el action creator que hemos creado para retonar los datos
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});
//add new actions: fetchDishes es un Tunk que setea is lodign a true y crea un timer de 2 segudnos

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
}
//retorna la accion de loading
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});
//
export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});