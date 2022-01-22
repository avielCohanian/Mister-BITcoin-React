import firebaseService from './firebase.service';
import { storageService } from './storageService';

export const userService = {
  getUser,
  addMove,
  signup,
  logOut,
  login,
};

const USER_KEY = 'yami';

async function getUser() {
  // const users = await firebaseService.getUsers();
  const user = storageService.load(USER_KEY);
  return user.length ? JSON.parse(user) : null;
}

async function signup({ name, password, email, imgData }) {
  const user = {
    name,
    password,
    email,
    img: imgData,
    coins: 100,
    moves: [],
  };
  const addUser = await firebaseService.addUser(user);
  return addUser ? await login(user) : null;
}

async function login({ name, password }) {
  const user = await firebaseService.login(name, password);
  if (user) storageService.store(USER_KEY, user);
  return user;
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
