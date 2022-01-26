import firebaseService, { currUser, user } from './firebase.service';
import { storageService } from './storageService';

export const userService = {
  getUser,
  addMove,
  signup,
  logOut,
  login,
  checkUserPassword,
  messageDecision,
  updateUser,
  getUserForDisplay,
  removeUser,
  loginGoogle,
  signupGoogle,
  restPass,
};
const USER_KEY = 'yami';

async function getUser() {
  const user = currUser;
  return user ? await firebaseService.getByEmailUser(user.email) : null;
}
async function getUserForDisplay() {
  let currUser = await getUser();
  delete currUser?.password;
  return currUser;
}
async function restPass(email) {
  return await firebaseService.restPassword(email);
}

function _makeUser({ name, password, email, imgData, phone }) {
  return {
    name,
    password,
    email,
    img: imgData,
    coins: 100,
    moves: [],
    messages: [],
    phone,
  };
}

async function signup(user, type) {
  const userToSave = _makeUser(user);
  const addUser = await firebaseService.saveUser(userToSave, type);
  storageService.store(USER_KEY, addUser);
  return addUser;
  return addUser ? await login(userToSave) : null;
}

async function signupGoogle() {
  let user = await firebaseService.signInWithGoogle();
  user = await signup(user, 'google');
  return user;
}

async function loginGoogle() {
  let user = await firebaseService.loginWithGoogle();
  user = await firebaseService.getByEmailUser(user.email);
  storageService.store(USER_KEY, user);
  return user;
}
async function login({ email, password }) {
  let user = await firebaseService.loginUser(email, password);
  user = await firebaseService.getByEmailUser(user.email);
  storageService.store(USER_KEY, user);
  return user;
}
function logOut() {
  firebaseService.logOut();
  storageService.remove(USER_KEY);
}

async function updateUser(user) {
  let currUser = await getUser();
  currUser = { ...currUser, ...user };
  await firebaseService.saveUser(currUser);
  return currUser;
}

async function removeUser(user) {
  let currUser = await getUser();
  await firebaseService.removeUser(currUser._id);
  logOut();
  return currUser;
}

async function checkUserPassword(password) {
  const currUser = await getUser();
  if (!currUser.password) {
    return 'no-password';
  }
  let isPassword = await firebaseService.checkUserPassword(currUser._id, password);
  console.log(isPassword);
  return isPassword;
}
async function messageDecision(ans, message) {
  let currUser = await getUser();
  if (ans) {
    currUser.coins += message.amount;
    message.isAccept = true;
  } else {
    moneyReturn(message);
    message.isAccept = false;
  }

  const messageIdx = currUser.messages.findIndex((m) => m.sendId === message.sendId);
  currUser.messages.splice(messageIdx, 1, message);

  await firebaseService.saveUser(currUser);
  message.isOpening = true;
  storageService.store(USER_KEY, currUser);
  return currUser;
}

async function moneyReturn(transferDetails) {
  const user = await firebaseService.getByIdUser(transferDetails.sensUserId);
  user.coins += transferDetails.amount;
  await firebaseService.saveUser(user);
}

async function addMove(contact, amount) {
  const user = await getUser();
  if (user.coins - amount < 0 || amount <= 0) return;
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

async function sendCoins({ at, amount }, contact) {
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
