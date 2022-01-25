import React, { useEffect, useRef, useState } from 'react';
import { PhotoCapture } from '../cmp/photo-capture';
import anonymous from '../assets/imgs/anonymous.png';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';
import CameraEnhanceSharpIcon from '@mui/icons-material/CameraEnhanceSharp';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useDispatch } from 'react-redux';

export const Register = ({ signup, login }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(true);

  const [user, setUser] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    imgData: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setUser({
      name: '',
      password: '',
      imgData: '',
    });
  }, []);

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    setUser({ ...user, [field]: value });
  };

  const imgData = () => {
    return user.imgData || anonymous;
  };

  const isValid = () => {
    return user.name && user.password;
  };
  const showCamera = () => {
    setIsCameraVisible(true);
  };
  const capturePhoto = (imgData) => {
    setUser({ ...user, imgData });
    setIsCameraVisible(false);
  };

  const register = async (ev) => {
    ev.preventDefault();
    if (user.name && user.password && user.email) {
      setIsProcessing(true);
      const userImg = imgData();
      await setUser({ ...user, imgData: userImg });
      setTimeout(() => {
        if (
          !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
            user.email
          )
        ) {
          dispatch({
            type: 'USERMSG',
            msg: { txt: `The email is invalid`, typeMsg: 'failure' },
          });
          return;
        }
        signup(user);
      }, 1200);
    }
  };

  return (
    <div className="register-container simple-form">
      <form onSubmit={register} className="form-register">
        <div className={(isCameraVisible && 'show') + ' ' + 'capture-container'}>
          {isCameraVisible && <PhotoCapture onDone={capturePhoto} />}
        </div>
        <div className="img-container">
          <div className="img-preview" style={{ backgroundImage: 'url(' + imgData() + ')' }} onClick={showCamera}>
            {!isProcessing && <CameraEnhanceSharpIcon className="material-icons btn-set-photo simple-button" />}
            {isProcessing && <CheckSharpIcon className="material-icons btn-set-photo simple-button" />}
            {isProcessing && <div className="background verify-image"></div>}
          </div>
        </div>

        <div className="field">
          <label className="field-icon">
            <AccountCircleSharpIcon className="material-icons" />
          </label>
          <input
            type="text"
            className="field-input"
            onChange={handleChange}
            value={user.name}
            name="name"
            id="name"
            placeholder="Name"
            required
          />
        </div>

        <div className="field">
          <label className="field-icon">
            <PasswordSharpIcon className="material-icons" />
          </label>
          <input
            type="password"
            className="field-input"
            onChange={handleChange}
            value={user.password}
            name="password"
            id="password"
            placeholder="Password"
            required
            autoComplete="on"
          />
        </div>

        <div className="field">
          <label className="field-icon">
            <AlternateEmailSharpIcon className="material-icons" />
          </label>
          <input
            type="email"
            className="field-input"
            onChange={handleChange}
            value={user.email || ''}
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="on"
            required
          />
        </div>
        <div className="field">
          <label className="field-icon">
            <LocalPhoneIcon className="material-icons" />
          </label>
          <input
            type="tel"
            className="field-input"
            onChange={handleChange}
            value={user.phone || ''}
            name="phone"
            id="phone"
            placeholder="Phone number"
            autoComplete="on"
            minLength="9"
            maxLength="14"
            required
          />
        </div>

        <div className="footer">
          <button disabled={!isValid && isProcessing} type="submit" className="btn-identify simple-button">
            Verify Identity
          </button>
        </div>
      </form>
    </div>
  );
};
