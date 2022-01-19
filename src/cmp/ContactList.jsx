import React from 'react';
import { ContactPreview } from './ContactPreview';

export function ContactList({ contacts, selectUser, removeContact }) {
  return (
    <div className="contact-list ">
      <ul className="clean-list ">
        {contacts.map((contact) => (
          <li key={contact._id} onClick={selectUser}>
            <ContactPreview contact={contact} removeContact={removeContact} />
          </li>
        ))}
      </ul>
    </div>
  );
}
