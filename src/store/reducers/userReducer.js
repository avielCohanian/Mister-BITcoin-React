const INITIAL_STATE = {
  loggedInUser: null,
  userMsg: null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LOGGING_USER':
      // const { loggedInUser } = state;
      return {
        ...state,
        loggedInUser: action.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedInUser: null,
      };
    case 'USERMSG':
      return {
        ...state,
        userMsg: action.msg,
      };

    default:
      return state;
  }
}
