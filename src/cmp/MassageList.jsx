import React from 'react';

import { MassagePreview } from './MassagePreview';

export function MassageList({ messages, selectMassage, sendAns }) {
  if (!messages.length) return <h3>You have no messages</h3>;
  return (
    <ul className="massage-list clean-list">
      {messages.map((message) => (
        <li key={message.at} onClick={selectMassage}>
          <MassagePreview message={message} sendAns={sendAns}></MassagePreview>
        </li>
      ))}
    </ul>
  );
}
