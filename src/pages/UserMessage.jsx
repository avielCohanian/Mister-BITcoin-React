import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../cmp/Loading';
import { MassageList } from '../cmp/MassageList';
import { messageDecision } from '../store/actions/userActions';

export const UserMessage = () => {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const dispatch = useDispatch();

  const sendAns = (ans, message) => {
    dispatch(messageDecision(ans, message));
  };

  if (!loggedInUser) return <Loading />;
  return (
    <div className="main-layout">
      <MassageList messages={loggedInUser.messages} sendAns={sendAns}></MassageList>
    </div>
  );
};
