import axios from 'axios';
import { storageService } from './storageService';
import firebaseService from './firebase.service';

export const contactService = {
  getContacts,
  getContactById,
  remove,
  saveContact,
  getEmptyContact,
};

const contacts = [
  {
    _id: '5a566402abce24c6bfe4699d',
    name: 'Dominique Soto',
    email: 'dominiquesoto@renovize.com',
    phone: '+1 (807) 551-3258',
    img: 'https://randomuser.me/api/portraits/thumb/men/10.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/men/10.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
  {
    _id: '5a566402f90ae30e97f990db',
    name: 'Faulkner Flores',
    email: 'faulknerflores@renovize.com',
    phone: '+1 (952) 501-2678',
    img: 'https://randomuser.me/api/portraits/thumb/men/3.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/men/3.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    _id: '5a566402abb3146207bc4ec5',
    name: 'Floyd Rutledge',
    email: 'floydrutledge@renovize.com',
    phone: '+1 (807) 597-3629',
    img: 'https://randomuser.me/api/portraits/thumb/women/10.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/10.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
  {
    _id: '5a56640298ab77236845b82b',
    name: 'Glenna Santana',
    email: 'glennasantana@renovize.com',
    phone: '+1 (860) 467-2376',
    img: 'https://randomuser.me/api/portraits/thumb/men/94.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/men/94.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/men/94.jpg',
  },
  {
    _id: '5a56640298500fead8cb1ee5',
    name: 'Grace James',
    email: 'gracejames@renovize.com',
    phone: '+1 (959) 525-2529',
    img: 'https://randomuser.me/api/portraits/thumb/women/36.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/36.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/women/36.jpg',
  },
  {
    _id: '5a5664025f6ae9aa24a99fde',
    name: 'Hallie Mclean',
    email: 'halliemclean@renovize.com',
    phone: '+1 (948) 464-2888',
    img: 'https://randomuser.me/api/portraits/thumb/women/10.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/10.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
  {
    _id: '5a5664027bae84ef280ffbdf',
    name: 'Holder Bean',
    email: 'holderbean@renovize.com',
    phone: '+1 (989) 503-2663',
    img: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/2.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    _id: '5a5664025c3abdad6f5e098c',
    name: 'Lilly Conner',
    email: 'lillyconner@renovize.com',
    phone: '+1 (842) 587-3812',
    img: 'https://randomuser.me/api/portraits/thumb/men/68.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/men/68.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/men/68.jpg',
  },
  {
    _id: '5a56640208fba3e8ecb97305',
    name: 'Malone Clark',
    email: 'maloneclark@renovize.com',
    phone: '+1 (818) 565-2557',
    img: 'https://randomuser.me/api/portraits/thumb/women/19.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/19.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/women/19.jpg',
  },
  {
    _id: '5a5664026c53582bb9ebe9d1',
    name: 'Nguyen Walls',
    email: 'nguyenwalls@renovize.com',
    phone: '+1 (963) 471-3181',
    img: 'https://randomuser.me/api/portraits/thumb/men/99.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/men/99.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/men/99.jpg',
  },
  {
    _id: '5a56640269f443a5d64b32ca',
    name: 'Ochoa Hyde',
    email: 'ochoahyde@renovize.com',
    phone: '+1 (968) 593-3824',
    img: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/1.jpg',
    imgLarge: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    _id: '5a5664028c096d08eeb13a8a',
    name: 'Ollie Christian',
    email: 'olliechristian@renovize.com',
    phone: '+1 (977) 419-3550',
    img: 'https://randomuser.me/api/portraits/thumb/men/99.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/61.jpg',
  },
  {
    _id: '5a56640272c7dcdf59c3d411',
    name: 'Pamela Nolan',
    email: 'pamelanolan@renovize.com',
    phone: '+1 (986) 545-2166',
    img: 'https://randomuser.me/api/portraits/thumb/men/6.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/men/14.jpg',
  },
  {
    _id: '5a56640252d6acddd183d319',
    name: 'Parsons Norris',
    email: 'parsonsnorris@renovize.com',
    phone: '+1 (958) 502-3495',
    img: 'https://randomuser.me/api/portraits/thumb/women/33.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/50.jpg',
  },
  {
    _id: '5a566402ed1cf349f0b47b4d',
    name: 'Rachel Lowe',
    email: 'rachellowe@renovize.com',
    phone: '+1 (911) 475-2312',
    img: 'https://randomuser.me/api/portraits/thumb/women/56.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/3.jpg',
  },
  {
    _id: '5a566402e3b846c5f6aec652',
    name: 'Rosanne Shelton',
    email: 'rosanneshelton@renovize.com',
    phone: '+1 (968) 454-3851',
    img: 'https://randomuser.me/api/portraits/thumb/women/83.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/47.jpg',
  },
  {
    _id: '5a5664029a8dd82a6178b15f',
    name: 'Roy Cantu',
    email: 'roycantu@renovize.com',
    phone: '+1 (929) 571-2295',
    img: 'https://randomuser.me/api/portraits/thumb/men/88.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/23.jpg',
  },
  {
    _id: '5a566402a6499c1d4da9220a',
    name: 'Shana Pope',
    email: 'shanapope@renovize.com',
    phone: '+1 (970) 527-3082',
    img: 'https://randomuser.me/api/portraits/thumb/men/78.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/women/8.jpg',
  },
  {
    _id: '5a56640243427b8f8445231e',
    name: 'Tanner Gates',
    email: 'tannergates@renovize.com',
    phone: '+1 (978) 591-2291',
    img: 'https://randomuser.me/api/portraits/thumb/women/65.jpg',
    imgMedium: 'https://randomuser.me/api/portraits/med/men/55.jpg',
  },
];

function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }

    return 0;
  });
}

async function getContacts(filterBy = null) {
  let contactsToReturn = await firebaseService.query();
  if (filterBy) {
    contactsToReturn = await filter(filterBy);
  }
  return sort(contactsToReturn);
}

async function _addContact(contact) {
  const img = await axios.get('https://randomuser.me/api/?results=1');
  contact.img = img.data.results[0].picture.thumbnail;
  contact.imgMedium = img.data.results[0].picture.medium;
  contact.imgLarge = img.data.results[0].picture.large;
  firebaseService.add(contact);
}

function remove(contactId) {
  firebaseService.remove(contactId);
}

function getContactById(contactId) {
  console.log(contactId);
  return firebaseService.getById(contactId);
}

function _updateContact(contact) {
  return firebaseService.update(contact);
}

function saveContact(contact) {
  return contact._id ? _updateContact(contact) : _addContact(contact);
}

function getEmptyContact() {
  return {
    name: '',
    email: '',
    phone: '',
  };
}

async function filter({ filterBy }) {
  let contacts = await firebaseService.query();
  return contacts.filter((contact) => {
    if (filterBy) {
      return (
        contact.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase()) ||
        contact.phone.toLocaleLowerCase().includes(filterBy) ||
        contact.email.toLocaleLowerCase().includes(filterBy)
      );
    } else return contact;
  });
}
