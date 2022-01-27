import firebaseService from './firebase.service';

export const contactService = {
  getContacts,
  getContactById,
  remove,
  saveContact,
  getEmptyContact,
};

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
  let contactsToReturn = await firebaseService.getContacts();
  if (filterBy) {
    contactsToReturn = await filter(contactsToReturn, filterBy);
  }

  // const contactsToReturn = contacts;
  // contactsToReturn.forEach((c) => {
  //   userService.signup(c);
  // });
  return contactsToReturn;
  return sort(contactsToReturn);
}

function remove(contactId) {
  firebaseService.removeUser(contactId);
}

function getContactById(contactId) {
  return firebaseService.getById(contactId);
}

function saveContact(contact) {
  return firebaseService.saveUser(contact);
}

function getEmptyContact() {
  return {
    name: '',
    email: '',
    phone: '',
  };
}

async function filter(contacts, { filterBy }) {
  return contacts.filter((contact) => {
    if (filterBy) {
      return (
        (contact.name && contact.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())) ||
        (contact.phone && contact.phone.toLocaleLowerCase().includes(filterBy)) ||
        (contact.email && contact.email.toLocaleLowerCase().includes(filterBy))
      );
    } else return contact;
  });
}
