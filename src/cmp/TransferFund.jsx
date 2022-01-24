import React, { Component, useState } from 'react';

export const TransferFund = ({ transfer, currUserName }) => {
  const [amount, setAmount] = useState('');

  const handleChange = ({ target }) => {
    const value = target.type === 'number' ? +target.value : target.value;
    setAmount(value);
  };

  const setTransfer = () => {
    transfer(amount);
    setAmount('');
  };

  return (
    <div className="transfer-fund">
      <h3>Transfer coins to {currUserName}</h3>
      <div className="input-container">
        <label htmlFor="amount">Amount:</label>
        <input type="number" name="amount" value={amount} id="amount" onChange={handleChange} />
        <button className="simple-button" onClick={setTransfer}>
          Transfer
        </button>
      </div>
    </div>
  );
};
