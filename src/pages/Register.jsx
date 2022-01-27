import React, { useEffect, useState } from 'react';
import { PhotoCapture } from '../cmp/photo-capture';
import { useDispatch } from 'react-redux';
import anonymous from '../assets/imgs/anonymous.png';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';
import CameraEnhanceSharpIcon from '@mui/icons-material/CameraEnhanceSharp';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import GoogleIcon from '@mui/icons-material/Google';
import firebaseService from '../services/firebase.service';
import { useInput } from '../hooks/useInput';

export const Register = ({ signup, googleSignup }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
  const [confirmPassword, bindConfirmPassword, resatConfirmPassword] = useInput('');

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
      email: '',
      phone: '',
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
    if (ev) ev.preventDefault();

    if (user.name && user.password && user.email) {
      setIsProcessing(true);
      setIsCameraVisible(false);
      const userImg = imgData();
      await setUser({ ...user, imgData: userImg });
      setTimeout(() => {
        if (confirmPassword !== user.password) {
          setConfirmPasswordErr('The passwords do not match');
          // dispatch({
          //   type: 'USERMSG',
          //   msg: { txt: `The email is invalid`, typeMsg: 'failure' },
          // });
          return;
        }
        console.log('aa');
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

        <div className="field" title="The password must contain at least 6 characters letters and numbers">
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
            autoComplete="on"
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            required
          />
        </div>
        <div className="field" title="Confirm Password">
          <label className="field-icon">
            <PasswordSharpIcon className="material-icons" />
          </label>
          <input
            type="password"
            className="field-input"
            {...bindConfirmPassword}
            name="ConfirmPassword"
            id="ConfirmPassword"
            placeholder="Confirm Password"
            autoComplete="on"
            disabled={!user.password}
            required
          />
        </div>
        {confirmPasswordErr && <p className="err-msg">{confirmPasswordErr}</p>}

        <div className="field">
          <label className="field-icon">
            <AlternateEmailSharpIcon className="material-icons" />
          </label>
          <input
            type="email"
            className="field-input"
            onChange={handleChange}
            value={user.email}
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="on"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
          />
        </div>
        <div className="field phone">
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
      <button className="simple-button google-btn " onClick={googleSignup}>
        <GoogleIcon /> Sign In with Google
      </button>
    </div>
  );
};
