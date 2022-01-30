import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc, addDoc, onSnapshot } from 'firebase/firestore';
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
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { firebaseConfigData } from './firebaseConfig';

// global
const firebaseConfig = firebaseConfigData;
const app = initializeApp(firebaseConfig);

// contacts
const db = getFirestore();
const dataRefUser = collection(db, 'users');

// user
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const user = auth.currentUser;
export let currUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currUser = formattingUser(user);
  } else {
    console.log('logout');
  }
});

// Google Auth
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

async function loginUser(email, password) {
  const currUser = await signInWithEmailAndPassword(auth, email, password);
  return formattingUser(currUser);
}

// Formatting Google obj
const formattingUser = (user) => {
  const { email, phoneNumber, photoURL, displayName, uid } = user.user || user;
  const userDetails = { email, phone: phoneNumber, imgData: photoURL, name: displayName, password: null };
  return userDetails;
};

// With email
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

// Add/Update
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
    let users = await getContacts();
    if (users.some((u) => u.email === user.email)) return null;
    const _id = _makeId();
    if (!type) {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
    }
    await addDoc(dataRefUser, {
      ...user,
      _id,
    });
    return { ...user, _id };
  } catch (err) {
    console.log(err);
  }
}
async function updateUser(user) {
  const currUser = await getById(user._id);
  if (user.password !== currUser.password) {
    const password = user.password ? user.password : currUser.password;
    await _updateUserPassword(password, currUser);
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
      isAdmin: user.isAdmin ? user.isAdmin : false,
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
async function _updateUserPassword(newPassword, lastUser) {
  try {
    const credential = await EmailAuthProvider.credential(lastUser.email, lastUser.password);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  } catch (err) {
    console.log(err);
  }
}

const logOut = async () => {
  try {
    const user = await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};

// Contacts
async function getContacts() {
  let querySnapshot = await getDocs(dataRefUser);
  return querySnapshot.docs.map((doc) => {
    let user = doc.data();
    user._id = doc.id;
    return user;
  });
}

async function removeUser(userId) {
  return await deleteDoc(doc(db, 'users', userId));
}
async function getById(userId) {
  let users = await getContacts();
  return users.find((t) => t._id === userId);
}
async function getByEmailUser(email) {
  let users = await getContacts();
  return users.find((t) => t.email === email);
}
async function checkUserPassword(userId, password) {
  const currUser = await getById(userId);
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
  getContacts,
  saveUser,
  removeUser,
  getById,
  getByEmailUser,
  checkUserPassword,
  signInWithGoogle,
  logOut,
  loginUser,
  loginWithGoogle,
  restPassword,
};
