import { contactService } from '../../services/contactService';

export function loadContacts() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().contactModule;
    try {
      const contacts = await contactService.getContacts(filterBy);
      dispatch({ type: 'SET_CONTACT', contacts });
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeContact(contactId) {
  return async (dispatch) => {
    try {
      await contactService.remove(contactId);
      dispatch({ type: 'REMOVE_CONTACT', contactId });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy });
  };
}

export function getContactById(contactId) {
  return async () => {
    return await contactService.getContactById(contactId);
  };
}
