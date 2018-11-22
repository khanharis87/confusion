import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (dishId, rating, author, comment) => {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: { dishId, rating, author, comment }
  };
};

export const postComment = (dishId, rating, author, comment) => dispatch => {
  const newComment = { dishId, rating, author, comment };
  newComment.date = new Date().toISOString();
  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          err.response = response;
          throw err;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
      console.log("post comments", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};
export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading());

  return fetch(baseUrl + "dishes")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      err => {
        var error = new Error(err.message);
        throw error;
      }
    )
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(err => dispatch(dishesFailed(err.message)));
};

export const fetchComments = () => dispatch => {
  return fetch(baseUrl + "comments")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      err => {
        var errMess = new Error(err.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(err => dispatch(commentsFailed(err.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading());

  return fetch(baseUrl + "promotions")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      err => {
        var errMess = new Error(err.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(err => dispatch(promosFailed(err.message)));
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

export const promosFailed = errmess => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});
