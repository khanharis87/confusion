import * as ActionTypes from "./ActionTypes";
import { DISHES } from "../shared/dishes";

export const addComment = (dishId, rating, author, comment) => {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: { dishId, rating, author, comment }
  };
};

export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading());

  setTimeout(() => {
    dispatch(addDishes(DISHES));
  }, 2000);
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
