import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc, addDoc } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInWithCustomToken,
  updateProfile,
  reauthenticateWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';

const firebaseConfig = {
  apiKey: 'AIzaSyDI85p52_tMXOcna0mK2d2WpDy4b1au2k8',
  authDomain: 'mister-bitcoin-15.firebaseapp.com',
  projectId: 'mister-bitcoin-15',
  storageBucket: 'mister-bitcoin-15.appspot.com',
  messagingSenderId: '21448580453',
  appId: '1:21448580453:web:3a3ca699cce655089b158c',
  measurementId: 'G-0BBPRRGHQT',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
auth.languageCode = 'he';

export const user = auth.currentUser;
export let currUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currUser = formattingUser(user);
  } else {
    console.log('logout');
  }
});

const db = getFirestore();
const dataRefUser = collection(db, 'users');

const formattingUser = (user) => {
  const { email, phoneNumber, photoURL, displayName, uid } = user.user || user;
  const userDetails = { email, phone: phoneNumber, imgData: photoURL, name: displayName, password: null };
  return userDetails;
};

const signInWithGoogle = async () => {
  try {
    const user = await signInWithPopup(auth, provider);
    return formattingUser(user);
  } catch (err) {
    console.log(err);
  }
};
const loginWithGoogle = async () => {
  try {
    const user = await signInWithGoogle();
    return user;
  } catch (err) {
    console.log(err);
  }
};
const logOut = async () => {
  try {
    const user = await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};
const restPassword = (email) => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      return false;
    });
};

async function getUsers() {
  let querySnapshot = await getDocs(dataRefUser);
  return querySnapshot.docs.map((doc) => {
    let user = doc.data();
    user._id = doc.id;
    return user;
  });
}

async function saveUser(user, type) {
  let newUser = user;
  if (user._id) {
    updateUser(user);
  } else {
    newUser = await addUser(user, type);
  }
  return newUser;
}

async function addUser(user, type) {
  try {
    let users = await getUsers();
    if (users.some((u) => u.email === user.email)) return null;
    const _id = _makeId();
    await addDoc(dataRefUser, {
      ...user,
      _id,
    });
    if (!type) {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
    }
    return { ...user, _id };
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(user) {
  const currUser = await getByIdUser(user._id);
  if (user.password !== currUser.password) {
    const password = user.password ? user.password : currUser.password;
    await updateUserPassword(password);
  }
  await setProfileUser(user);
  setDocUser(user);
}

async function setDocUser(user) {
  try {
    const frankDocRef = doc(db, 'users', user._id);
    await setDoc(frankDocRef, {
      coins: user.coins,
      email: user.email,
      name: user.name,
      img: user.img,
      _id: user._id,
      moves: user.moves,
      messages: user.messages,
      phone: user.phone,
      password: user.password ? user.password : currUser.password,
    });
  } catch (err) {
    console.log(err);
  }
}

async function setProfileUser(user) {
  await updateProfile(auth.currentUser, {
    displayName: user.name,
    photoURL: user.img,
    phoneNumber: user.phone,
  });
}

async function updateUserPassword(newPassword) {
  try {
    const credential = await EmailAuthProvider.credential(currUser.email, currUser.newPassword);
    reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  } catch (err) {
    console.log(err);
  }
}

async function removeUser(userId) {
  return await deleteDoc(doc(db, 'users', userId));
}

async function getByIdUser(userId) {
  let users = await getUsers();
  return users.find((t) => t._id === userId);
}
async function getByEmailUser(email) {
  let users = await getUsers();
  return users.find((t) => t.email === email);
}
async function login(email, password) {
  let users = await getUsers();
  const currUser = users.find((u) => {
    return u.email === email && u.password === password;
  });
  // delete currUser.password;
  return currUser;
}
async function loginUser(email, password) {
  const currUser = await signInWithEmailAndPassword(auth, email, password);
  return formattingUser(currUser);
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
  getUsers,
  saveUser,
  removeUser,
  getByIdUser,
  getByEmailUser,
  login,
  checkUserPassword,
  signInWithGoogle,
  logOut,
  loginUser,
  loginWithGoogle,
  updateUserPassword,
  restPassword,
};
