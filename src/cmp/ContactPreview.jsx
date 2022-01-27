import React from 'react';
import { Link } from 'react-router-dom';

import anonymous from '../assets/imgs/anonymous.png';
import CloseIcon from '@material-ui/icons/Close';
import EditSharpIcon from '@material-ui/icons/EditSharp';

export function ContactPreview({ contact, removeContact }) {
  const imgData = () => {
    return contact.img || anonymous;
  };

  return (
    <div className="contact-preview">
      <Link className="contact-preview-container" to={`/contact/${contact._id}`}>
        <img src={imgData()} alt="" />
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
