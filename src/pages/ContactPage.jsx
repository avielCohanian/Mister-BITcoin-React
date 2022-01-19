import AddSharpIcon from '@material-ui/icons/AddSharp';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContactFilter } from '../cmp/ContactFilter';
import { ContactList } from '../cmp/ContactList';
import { DeleteModal } from '../cmp/DeleteModel';
import Loading from '../cmp/Loading';
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contactActions';

export const ContactPage = () => {
  const { contacts } = useSelector((state) => state.contactModule);
  const [remove, setRemove] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadContacts());
  }, []);

  const onChangeFilter = useCallback((filterBy) => {
    dispatch(setFilterBy(filterBy));
    dispatch(loadContacts());
  }, []);

  const removeContactModel = (contactId) => {
    setRemove(contactId);
  };

  const onHandleDelete = (val) => {
    if (val) {
      dispatch(removeContact(remove));
    }
    setRemove(null);
  };

  if (!contacts) return <Loading />;
  return (
    <div className=" contact-page">
      <h2>Contacts</h2>
      <div className="add-contact">
        <ContactFilter onChangeFilter={onChangeFilter} />
        <Link className="simple-button add-btn" to="/contact/edit">
          <span title="Add contact">
            <AddSharpIcon />
          </span>
        </Link>
      </div>
      <ContactList removeContact={removeContactModel} contacts={contacts} />
      {remove && <DeleteModal onHandleDelete={onHandleDelete} />}
    </div>
  );
};
