import React from 'react';
import { ContactPreview } from './ContactPreview';
import Loading from './Loading';

export function ContactList({ contacts, selectUser, removeContact, currUser }) {
  if (!contacts || !currUser) return <Loading></Loading>;
  return (
    <div className="contact-list">
      <ul className="clean-list">
        {contacts.map((contact) =>
          currUser.name !== contact.name ? (
            <li key={contact._id} onClick={selectUser}>
              <ContactPreview contact={contact} removeContact={removeContact} />
            </li>
          ) : (
            ''
          )
        )}
      </ul>
    </div>
  );
}
