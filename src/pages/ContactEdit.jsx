import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contactService } from '../services/contactService';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import Loading from '../cmp/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getContactById } from '../store/actions/contactActions';

export const ContactEdit = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule);

  const [contact, setContact] = useState(null);
  const dispatch = useDispatch();

  useEffect(async () => {
    const contactId = props.match.params.contactId;
    const contact = contactId ? await dispatch(getContactById(contactId)) : contactService.getEmptyContact();
    setContact(contact);
  }, []);

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    setContact({ ...contact, [field]: value });
  };

  const onSaveContact = async (ev) => {
    ev.preventDefault();
    if (!loggedInUser.isAdmin) {
      dispatch({
        type: 'USERMSG',
        msg: { txt: `You do not have access to perform the operation.`, typeMsg: 'failure' },
      });
      return;
    }
    await contactService.saveContact({ ...contact });
    props.history.push('/contact');
  };

  if (!contact) return <Loading />;
  return (
    <div className="edit-page">
      <Link className="simple-button back-btn" to="/contact">
        <ArrowBackIosSharpIcon />
        Back
      </Link>
      <h1>{contact._id ? 'Edit' : 'Add'}</h1>
      <form className="simple-form" onSubmit={onSaveContact}>
        <section>
          <label htmlFor="name">Name</label>
          <input placeholder="Name" onChange={handleChange} value={contact.name} type="text" name="name" id="name" />
        </section>
        <section>
          <label htmlFor="phone">Phone</label>
          <input
            placeholder="Phone"
            onChange={handleChange}
            value={contact.phone}
            type="text"
            name="phone"
            id="phone"
          />
        </section>
        <section>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email"
            onChange={handleChange}
            value={contact.email}
            type="text"
            name="email"
            id="email"
          />
        </section>

        <a className="simple-button save-btn" onClick={onSaveContact}>
          Save
        </a>
      </form>
    </div>
  );
};
