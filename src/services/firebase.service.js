import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDI85p52_tMXOcna0mK2d2WpDy4b1au2k8',
  authDomain: 'mister-bitcoin-15.firebaseapp.com',
  projectId: 'mister-bitcoin-15',
  storageBucket: 'mister-bitcoin-15.appspot.com',
  messagingSenderId: '21448580453',
  appId: '1:21448580453:web:3a3ca699cce655089b158c',
  measurementId: 'G-0BBPRRGHQT',
};

initializeApp(firebaseConfig);
const db = getFirestore();
const dataRef = collection(db, 'contacts');
const dataRefUser = collection(db, 'users');

async function query() {
  let querySnapshot = await getDocs(dataRef);
  return querySnapshot.docs.map((doc) => {
    let contact = doc.data();
    contact._id = doc.id;
    return contact;
  });
}

async function add(contact) {
  if (contact._id) {
    update(contact);
  } else {
    const _id = _makeId();
    await addDoc(dataRef, {
      ...contact,
      _id,
    });
  }
}
async function remove(contactId) {
  await deleteDoc(doc(db, 'contacts', contactId));
}

async function getById(contactId) {
  let contacts = await query();
  return contacts.find((t) => t._id === contactId);
}

async function update(contact) {
  const frankDocRef = doc(db, 'contacts', contact._id);
  await setDoc(frankDocRef, {
    email: contact.email,
    img: contact.img,
    name: contact.name,
    phone: contact.phone,
    _id: contact._id,
  });
}

async function getUsers() {
  let querySnapshot = await getDocs(dataRefUser);
  return querySnapshot.docs.map((doc) => {
    let user = doc.data();
    user._id = doc.id;
    return user;
  });
}

async function saveUser(user) {
  if (user._id) {
    updateUser(user);
  } else {
    let users = await getUsers();
    if (users.some((u) => u.name === user.name)) return null;
    const _id = _makeId();
    await addDoc(dataRefUser, {
      ...user,
      _id,
    });
    add(user);
  }
  return user;
}

async function updateUser(user) {
  const currUser = await getByIdUser(user._id);
  const frankDocRef = doc(db, 'users', user._id);
  await setDoc(frankDocRef, {
    coins: user.coins,
    email: user.email,
    name: user.name,
    img: user.img,
    _id: user._id,
    moves: user.moves,
    password: currUser.password,
  });
}

async function removeUser(userId) {
  await deleteDoc(doc(db, 'users', userId));
}

async function getByIdUser(userId) {
  let users = await getUsers();
  return users.find((t) => t._id === userId);
}
async function login(name, password) {
  let users = await getUsers();
  const currUser = users.find((u) => {
    return u.name === name && u.password === password;
  });
  delete currUser.password;
  return currUser;
}

async function checkUserPassword(userId, password) {
  const currUser = await getByIdUser(userId);
  return currUser.password === password;
}

function _makeId(length = 10) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

export default {
  add,
  query,
  remove,
  update,
  getById,
  getUsers,
  saveUser,
  removeUser,
  getByIdUser,
  login,
  checkUserPassword,
};