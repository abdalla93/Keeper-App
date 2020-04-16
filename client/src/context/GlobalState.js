import React, { createContext, useReducer, useState } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
const initialState = {
  user: {
    username: "",
    email: "",
    password: "",
    notes: [],
  },
  error: false,
  loading: true,
  token: "",
  isAuthenticated: false,
};
export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [myNotes, setMyNotes] = useState([]);
  function logout() {
    dispatch({
      type: "REMOVETOKEN",
      payload: "",
    });
  }

  async function loginUser(user) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/login", user, config);
      if (!res.data.message.msgError) {
        dispatch({
          type: "TOKEN",
          payload: res.data.token,
        });
        state.user.username = user.username;
        return res.data;
      }
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err,
      });
      return err.response.data;
    }
  }

  async function registerUser(user) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/register", user, config);
      dispatch({
        type: "TOKEN",
        payload: res.data.token,
      });
      state.user.username = user.username;
      return res.data;
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error,
      });
      return error.response.data;
    }
  }
  async function getNotes() {
    try {
      const { token } = state;
      const config = {
        headers: {
          "X-Auth-Token": token,
          "content-type": "application/json",
        },
      };
      const res = await axios.get("/notes/", config);

      setMyNotes(res.data.myNotes);

      // dispatch({
      //   type: "GET_NOTES",
      //   payload: res.data.myNotes,
      // });
      return res.data.myNotes;
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response,
      });
    }
  }

  async function AddNote(note) {
    const { token } = state;
    const config = {
      headers: {
        "X-Auth-Token": token,
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/notes", note, config);
      setMyNotes(res.data.myNotes);
      // dispatch({
      //   type: "ADD_NOTE",
      //   payload: res.data.data,
      // });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error,
      });
    }
  }

  async function deleteTransaction(id) {
    const { token } = state;
    const config = {
      headers: {
        "X-Auth-Token": token,
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.delete(`/notes/${id}`, config);
      setMyNotes(res.data.myNotes);

      // dispatch({
      //   type: "DELETE_TRANSACTION",
      //   payload: id,
      // });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        notes: myNotes,
        error: state.error,
        loading: state.loading,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loginUser,
        registerUser,
        getNotes,
        AddNote,
        deleteTransaction,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
