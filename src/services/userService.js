import firebaseService from './firebase.service';
import { storageService } from './storageService';

export const userService = {
  getUser,
  addMove,
  signup,
  logOut,
};

const USER_KEY = 'yami';

async function getUser() {
  // const users = await firebaseService.getUsers();
  const user = storageService.load(USER_KEY);
  return user.length ? JSON.parse(user) : null;
}

function signup({ name, password, email, imgData }) {
  if (!storageService.load(name).length) {
    const user = {
      name,
      password,
      email,
      img: imgData,
      coins: 100,
      moves: [],
    };
    storageService.store(USER_KEY, user);
  }
  return JSON.parse(storageService.load(USER_KEY));
}
function logOut() {
  storageService.remove(USER_KEY);
}

async function addMove(contact, amount) {
  const user = await getUser();
  if (user.coins - amount < 0) return;
  user.coins = user.coins - amount;
  const move = {
    userId: user._id,
    to: contact,
    at: Date.now(),
    amount: amount,
  };
  user.moves.unshift(move);
  storageService.store(USER_KEY, user);
  return user;
}

function _makeId(length = 10) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
