export default (state, action) => {
  switch (action.type) {
    case "TOKEN":
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case "REMOVETOKEN":
      return {
        user: {
          username: "",
          email: "",
          password: "",
          notes: [],
        },
        error: null,
        loading: true,
        token: "",
        isAuthenticated: false,
      };
    case "GET_NOTES":
      return {
        ...state,
        loading: false,
        notes: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
