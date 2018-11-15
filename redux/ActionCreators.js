import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

///////////////////////////////////////////////
////////////////////COMMENTS/////////////////////
///////////////////////////////////////////////

export const fetchComments = () => (dispatch) => {
    return(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
              var error = new Error('Error ' + response.status + ': ' + responseStatusText);
              error.response = response;
              throw error;
            }
        },
        error => {
          var errMess = new Error(error.message)
            throw errMess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload:comments
});

///////////////////////////////////////////////
////////////////////DISHES/////////////////////
///////////////////////////////////////////////

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
              var error = new Error('Error ' + response.status + ': ' + responseStatusText);
              error.response = response;
              throw error;
            }
        },
        error => {
          var errMess = new Error(error.message)
            throw errMess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = (errmess) => ({
    type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload:dishes
});

///////////////////////////////////////////////
////////////////////LEADERS/////////////////////
///////////////////////////////////////////////

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
              var error = new Error('Error ' + response.status + ': ' + responseStatusText);
              error.response = response;
              throw error;
            }
        },
        error => {
          var errMess = new Error(error.message)
            throw errMess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addLeaders(dishes)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = (errmess) => ({
    type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload:leaders
});

///////////////////////////////////////////////
////////////////////PROMOS/////////////////////
///////////////////////////////////////////////

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
              var error = new Error('Error ' + response.status + ': ' + responseStatusText);
              error.response = response;
              throw error;
            }
        },
        error => {
          var errMess = new Error(error.message)
            throw errMess;
        })
        .then(response => response.json())
        .then(promotions => dispatch(addPromos(promotions)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = (errmess) => ({
    type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload:promotions
});
