import { userService } from '../../services/userService';

export function getLoggingUser() {
  return async () => {
    return await userService.getUserForDisplay();
  };
}

export function signupUser(userData, type) {
  return async (dispatch) => {
    try {
      let user;
      switch (type) {
        case 'google':
          user = await userService.signupGoogle();
          break;
        case 'email&password':
          user = await userService.signup(userData);
          break;
        default:
          user = null;
      }
      dispatch({ type: 'SET_LOGGING_USER', user });
      return user;
    } catch (err) {
      console.log(err);
    }
  };
}

export function loginUser(userData, type) {
  return async (dispatch) => {
    try {
      let user;
      switch (type) {
        case 'google':
          user = await userService.loginGoogle();
          break;
        case 'email&password':
          user = await userService.login(userData);
          break;
        default:
          user = null;
      }
      dispatch({ type: 'SET_LOGGING_USER', user });
      return user;
    } catch (err) {
      console.log(err);
    }
  };
}
export function logOut() {
  return async (dispatch) => {
    try {
      const user = await userService.logOut();
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      console.log(err);
    }
  };
}
export function updateUser(user) {
  return async (dispatch) => {
    try {
      const updateUser = await userService.updateUser(user);
      dispatch({ type: 'SET_LOGGING_USER', updateUser });
      return updateUser;
    } catch (err) {
      console.log(err);
    }
  };
}
export function removeUser(user) {
  return async (dispatch) => {
    try {
      await userService.removeUser(user);
      dispatch({ type: 'SET_LOGGING_USER', user: null });
    } catch (err) {
      console.log(err);
    }
  };
}

export function addMove(contact, amount) {
  return async (dispatch) => {
    try {
      const user = await userService.addMove(contact, amount);
      if (!user) {
        dispatch({
          type: 'USERMSG',
          msg: {
            txt: `Transfer failed!`,
            typeMsg: 'failure',
          },
        });
      }
      dispatch({ type: 'SET_LOGGING_USER', user });
      return user;
    } catch (err) {
      console.log(err);
    }
  };
}

export function messageDecision(ans, message) {
  return async (dispatch) => {
    try {
      const user = await userService.messageDecision(ans, message);
      dispatch({ type: 'SET_LOGGING_USER', user });
    } catch (err) {
      console.log(err);
    }
  };
}
