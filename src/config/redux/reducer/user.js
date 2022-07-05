const initialState = {
  user: {
    name: "",
    username: "",
    email: "",
  },
  listContact: [],
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        // isLogin: true,
      };

    case "GET_ALL_USERS":
      return {
        ...state,
        listContact: action.payload,
        // isLoading: false,
      };

    case "GET_PROFILE_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PROFILE_SUCCESS":
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
