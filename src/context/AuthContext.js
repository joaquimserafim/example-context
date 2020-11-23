import { AsyncStorage } from "react-native";
import dataContext from "./dataContext";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SIGNIN":
      return { errorMessage: "", token: action.payload };
    case "CLEAR_ERROR_MESSAGE":
      return { ...state, errorMessage: "" };
    case "SIGNOUT":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");

  console.log("trying to do a local signin", token);

  if (token) {
    dispatch({ type: "SIGNIN", payload: token });
    navigate("Account");
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  console.log("CLEAR_ERROR_MESSAGE");
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await Promise.resolve({ data: { token: "123xpto" } });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "SIGNIN", payload: response.data.token });
    navigate("Account");
  } catch (err) {
    dispatch({
      type: "ADD_ERROR",
      payload: "Something went wrong with sign in",
    });
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await Promise.resolve({ data: { token: "123xpto" } });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "SIGNIN", payload: response.data.token });
    navigate("Account");
  } catch (err) {
    dispatch({
      type: "ADD_ERROR",
      payload: "Something went wrong with sign up",
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "SIGNOUT" });
  navigate("LoginFlow");
};

export const { Provider, Context } = dataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    tryLocalSignin,
    clearErrorMessage,
  },
  { token: null, errorMessage: "" }
);
