import { userService } from '../../services/userService';

export function getLoggingUser() {
  return async () => {
    return userService.getUser();
  };
}

export function setLoggingUser(name) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(name);
      dispatch({ type: 'SET_LOGGING_USER', user });
    } catch (err) {
      console.log(err);
    }
  };
}

export function addMove(move, amount) {
  return async (dispatch) => {
    try {
      const user = await userService.addMove(move, amount);
      dispatch({ type: 'SET_LOGGING_USER', user });
    } catch (err) {
      console.log(err);
    }
  };
}
