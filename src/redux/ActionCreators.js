import * as ActionTypes from "./ActionTypes";
import { DISHES } from "../shared/dishes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (dishId, rating, author, comment) => {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: { dishId, rating, author, comment }
  };
};

export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading());

  return fetch(baseUrl + "dishes")
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)));
};

export const fetchComments = () => dispatch => {
  return fetch(baseUrl + "comments")
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading());

  return fetch(baseUrl + "promotions")
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
};
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = errmessage => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmessage
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const commentsFailed = errmess => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});
