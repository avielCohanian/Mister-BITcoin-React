import React from 'react';

import plusImg from '../assets/imgs/plus.png';
import minusImg from '../assets/imgs/minus.png';

export function MassagePreview({ message, sendAns }) {
  return (
    <article className="massage-preview">
      <div className="massage-user">
        <b className="from">{message.from}</b>
        <p className="at">{new Date(message.at).toLocaleString()}</p>
      </div>
      {!message.isOpening && (
        <div className="btn-container">
          <a className="accept" onClick={() => sendAns(true, message)}>
            Accept
          </a>
          <a className="cancel" onClick={() => sendAns(false, message)}>
            Cancel
          </a>
        </div>
      )}
      <div className="massage-amount">
        <h3>{message.amount}</h3>
        <img className="is-open" src={message.isAccept ? plusImg : minusImg} alt="" />
      </div>
    </article>
  );
}
