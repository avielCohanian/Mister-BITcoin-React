import React, { Component, useState } from 'react';
import { useDispatch } from 'react-redux';

import { connect } from 'react-redux';
import { addMove, getLoggingUser, setLoggingUser } from '../store/actions/userActions';

export const TransferFund = (props) => {
  // state = {
  //   amount: '',
  // };
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const value = target.type === 'number' ? +target.value : target.value;
    setAmount(value);
  };
  const transfer = () => {
    dispatch(addMove(props.currUserName, amount));
    setAmount('');
  };

  return (
    <div className="transfer-fund">
      <h3>Transfer coins to {props.currUserName}</h3>
      <div className="input-container">
        <label htmlFor="amount">Amount:</label>
        <input type="number" name="amount" value={amount} id="amount" onChange={handleChange} />
        <button className="simple-button" onClick={transfer}>
          Transfer
        </button>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     loggedInUser: state.userModule.loggedInUser,
//   };
// };

// const mapDispatchToProps = {
//   getLoggingUser,
//   setLoggingUser,
//   addMove,
// };

// export const TransferFund = connect(mapStateToProps, mapDispatchToProps)(_TransferFund);
