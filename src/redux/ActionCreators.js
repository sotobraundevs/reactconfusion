import * as ActionTypes from './ActionTypes';
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