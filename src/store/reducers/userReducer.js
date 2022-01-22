const INITIAL_STATE = {
  loggedInUser: null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LOGGING_USER':
      // const { loggedInUser } = state;
      console.log(action.user);
      return {
        ...state,
        loggedInUser: action.user,
      };
    case 'LOGOUT':
      // const { loggedInUser } = state;
      return {
        ...state,
        loggedInUser: null,
      };

    default:
      return state;
  }
}
