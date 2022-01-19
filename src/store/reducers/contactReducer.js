const INITIAL_STATE = {
  contacts: null,
  filterBy: null,
};

export function contactReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CONTACT':
      return {
        ...state,
        contacts: [...action.contacts],
      };

    case 'REMOVE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((c) => c._id !== action.contactId),
      };
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: action.filterBy,
      };

    default:
      return state;
  }
}
