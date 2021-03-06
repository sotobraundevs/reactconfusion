import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

//se importa la url base
import { baseUrl } from '../shared/baseUrl';



//El action type esta listo para retonar el action creator que hemos creado para retonar los datos
// export const addComment = (dishId, rating, author, comment) => ({
//     type: ActionTypes.ADD_COMMENT,
//     payload: {
//         dishId: dishId,
//         rating: rating,
//         author: author,
//         comment: comment
//     }
// });
//add new actions: fetchDishes es un Tunk que setea is lodign a true y crea un timer de 2 segudnos
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
    
});


export const fetchDishes = () => (dispatch) => {

   // dispatch(dishesLoading(true));

    // setTimeout(() => {
    //     dispatch(addDishes(DISHES));
    // }, 2000);
    //return fetch(baseUrl + 'dishes')
    //.then(response => response.json()) //se maneja la respuesta de la promesa
    //.then(dishes => dispatch(addDishes(dishes))); //esta es el callback que se espera
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

//retorna la accion de loading
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});//


export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});


// export const fetchComments = () => (dispatch) => {    
//     return fetch(baseUrl + 'comments')
//     .then(response => response.json())
//     .then(comments => dispatch(addComments(comments)));
// };

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// export const fetchPromos = () => (dispatch) => {
    
//     dispatch(promosLoading());

//     return fetch(baseUrl + 'promotions')
//     .then(response => response.json())
//     .then(promos => dispatch(addPromos(promos)));
// }

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
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


//LEADERS

export const fetchLeaders = () => (dispatch) => {
    
  dispatch(leadersLoading());

  return fetch(baseUrl + 'leaders')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(leaders => dispatch(addLeaders(leaders)))
  .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

//FEEDBACKS
export const addFeedbacks = (feedbacks) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedbacks
  
});


export const feedbacksFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});



export const postFeedback = ( firstname, lastname, telnum, email, agree, contactType,
  message) => (dispatch) => {

  const newFeddback = {
      
      firstname: firstname,
      lastname: lastname,
      telnum: telnum,
      email: email,
      agree: agree,
      contactType: contactType,
      message: message,
      
      
  };
  newFeddback.date = new Date().toISOString();
  
  return fetch(baseUrl + 'feedback', {
      method: "POST",
      body: JSON.stringify(newFeddback),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addFeedbacks(response)))
  .then(response => alert('Thank you for your feedback!\n' + JSON.stringify(response)))
  .catch(error =>  { console.log('post feedback', error.message); alert('Your post could not be posted\nError: '+error.message); });
};


export const fetchFeedbacks = () => (dispatch) => {
    
  //dispatch(leadersLoading());

  return fetch(baseUrl + 'feedback')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(feedbacks => dispatch(addFeedbacks(feedbacks)))
  .catch(error => dispatch(feedbacksFailed(error.message)));
}


