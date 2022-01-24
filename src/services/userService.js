import firebaseService from './firebase.service';
import { storageService } from './storageService';

export const userService = {
  getUser,
  addMove,
  signup,
  logOut,
  login,
  checkUserPassword,
  messageDecision,
};
const USER_KEY = 'yami';

async function getUser() {
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
    messages: [],
  };
  const addUser = await firebaseService.saveUser(user);
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

async function checkUserPassword(password) {
  const currUser = await getUser();
  const isPassword = await firebaseService.checkUserPassword(currUser._id, password);
  return isPassword;
}
async function messageDecision(ans, message) {
  let currUser = await getUser();
  if (ans) {
    currUser.coins += message.amount;
    message.isAccept = true;
  } else {
    message.isAccept = false;
  }

  const messageIdx = currUser.messages.findIndex((m) => m.sendId === message.sendId);
  currUser.messages.splice(messageIdx, 1, message);

  await firebaseService.saveUser(currUser);
  message.isOpening = true;
  storageService.store(USER_KEY, currUser);
  return currUser;
}

async function addMove(contact, amount) {
  const user = await getUser();
  if (user.coins - amount < 0) return;
  user.coins = user.coins - amount;
  const move = {
    userId: user._id,
    to: contact.name,
    at: Date.now(),
    amount: amount,
  };
  user.moves.unshift(move);
  await firebaseService.saveUser(user);
  storageService.store(USER_KEY, user);
  await sendCoins(move, contact);
  return user;
}

async function sendCoins({ userId, at, amount }, contact) {
  const contactTo = await firebaseService.getByIdUser(contact._id);
  const currUser = await getUser();
  const move = {
    sensUserId: currUser._id,
    from: currUser.name,
    at,
    amount: amount,
    isOpening: false,
    sendId: _makeId(),
    isAccept: null,
  };
  contactTo.messages.unshift(move);
  await firebaseService.saveUser(contactTo);
}

function _makeId(length = 10) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
