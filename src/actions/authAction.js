import { GET_ERRORS, SET_CURRENT_USER, GET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/users", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/signin", userData)
    .then(res => {
      //Save to localStorage

      //const { token } = res.data.token;
      console.log("user", res.data.user);
      const session = {
        jwtToken: res.data.token,
        user: res.data.user
      };
      console.log("session: ", session);

      //Set token to localStorage
      localStorage.setItem("session", JSON.stringify(session));
      //Set token to Auth header
      setAuthToken(session.jwtToken);
      // Decode token to get user Data
      // const decoded = jwt_decode(token, "secreto");
      // Set current user
      dispatch(setCurrentUser(session.user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = currentUser => {
  console.log("decoded: ", currentUser);
  return {
    type: SET_CURRENT_USER,
    payload: currentUser
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localstorage
  localStorage.removeItem("session");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// export const getCurrentUser = userId => dispatch => {
//   console.log("El userId en currentUSer es: ", userId);
//   axios
//     .get("/users/", userId)
//     .then(res =>
//       dispatch({
//         type: GET_CURRENT_USER,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_CURRENT_USER,
//         payload: {}
//       })
//     );
// };
