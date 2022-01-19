import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMove, getLoggingUser, setLoggingUser } from '../store/actions/userActions';

class _TransferFund extends Component {
  state = {
    amount: '',
  };
  handleChange = ({ target }) => {
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState({ amount: value });
  };
  transfer = () => {
    this.props.addMove(this.props.currUserName, this.state.amount);
    this.setState({ amount: '' });
  };
  render() {
    const { amount } = this.state;
    return (
      <div className="transfer-fund">
        <h3>Transfer coins to {this.props.currUserName}</h3>
        <div className="input-container">
          <label htmlFor="amount">Amount:</label>
          <input type="number" name="amount" value={amount} id="amount" onChange={this.handleChange} />
          <button className="simple-button" onClick={this.transfer}>
            Transfer
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  getLoggingUser,
  setLoggingUser,
  addMove,
};

export const TransferFund = connect(mapStateToProps, mapDispatchToProps)(_TransferFund);
