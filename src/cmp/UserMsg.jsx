import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function UserMsg() {
  const { userMsg } = useSelector((state) => state.userModule);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userMsg) {
      setTimeout(() => {
        dispatch({ type: 'USERMSG', msg: '' });
      }, 3000);
    }
  }, [userMsg]);

  // if (!userMsg) return <div></div>;
  return <h3 className={(userMsg ? 'fadein' : 'fadeout') + ' ' + 'user-msg'}>{userMsg}</h3>;
}
