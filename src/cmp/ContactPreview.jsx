import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import EditSharpIcon from '@material-ui/icons/EditSharp';

export function ContactPreview({ contact, removeContact }) {
  return (
    <div className="contact-preview">
      <Link className="contact-preview-container" to={`/contact/${contact._id}`}>
        <img src={contact.img} alt="" />
        <p className="contact-name">{contact.name}</p>
      </Link>
      <a className="delete-btn" onClick={() => removeContact(contact._id)}>
        <CloseIcon />
      </a>

      <Link to={`/contact/edit/${contact._id}`} className="edit-btn">
        <EditSharpIcon />
      </Link>
    </div>
  );
}
