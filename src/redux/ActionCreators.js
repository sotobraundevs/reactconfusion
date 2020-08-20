import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

//se importa la url base
import { baseUrl } from '../shared/baseUrl';



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

    // setTimeout(() => {
    //     dispatch(addDishes(DISHES));
    // }, 2000);
    return fetch(baseUrl + 'dishes')
    .then(response => response.json()) //se maneja la respuesta de la promesa
    .then(dishes => dispatch(addDishes(dishes))); //esta es el callback que se espera

}
//retorna la accion de loading
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});//


export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});


export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});