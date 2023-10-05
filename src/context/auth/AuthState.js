import React, { useReducer } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const AuthReducer = (state, action) => {
    if (action.type === "SET_AUTH") {
      localStorage.setItem("token", action.payload.authToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        token: action.payload.authToken,
        user: action.payload.user,
      };
    }
    if (action.type === "REMOVE_AUTH") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        token: null,
        user: null,
      };
    }
  };

  const [auth, dispatch] = useReducer(AuthReducer, {
    token: null,
    user: null,
  });

  // set auth token
  const setAuth = (token) => {
    dispatch({ type: "SET_AUTH", payload: token });
  };

  const removeAuth = () => {
    dispatch({ type: "REMOVE_AUTH" });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, removeAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
