import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { DeleteModal } from '../cmp/DeleteModel';
import { PhotoCapture } from '../cmp/photo-capture';
import Loading from '../cmp/Loading';

import { removeUser, updateUser } from '../store/actions/userActions';
import { userService } from '../services/userService';
import { useForm } from '../hooks/useForm';

import anonymous from '../assets/imgs/anonymous.png';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export const UserSetting = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule);

  const [isChangeImg, setIsChangeImg] = useState(false);
  const [remove, setRemove] = useState(false);

  const [user, handleChange, setUser] = useForm(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const loggingUser = await userService.getUser();
      setUser(loggingUser);
    })();
  }, [loggedInUser]);

  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(updateUser(user));
    dispatch({
      type: 'USERMSG',
      msg: { txt: `${user.name} was updated`, typeMsg: 'success' },
    });
  };

  const changeImg = () => {
    setIsChangeImg(!isChangeImg);
  };

  const onDone = (img) => {
    changeImg();
    setUser({ ...user, img });
  };

  const deleteUser = async () => {
    setRemove(true);
  };

  const imgData = () => {
    return user.img || anonymous;
  };

  const onHandleDelete = async (val) => {
    if (val) {
      await dispatch(removeUser(loggedInUser));
      props.history.push('/signup');
      dispatch({
        type: 'USERMSG',
        msg: { txt: `User deleted`, typeMsg: 'success' },
      });
    }
    setRemove(false);
  };

  if (!user) return <Loading />;
  return (
    <section className="main-layout simple-form user-setting">
      <Link className="simple-button back-btn" to="/">
        <ArrowBackIosSharpIcon />
        Back
      </Link>
      <h1>Setting</h1>
      {isChangeImg && (
        <section>
          <PhotoCapture onDone={onDone} />
          <button onClick={changeImg} className="simple-button">
            Back
          </button>
        </section>
      )}
      {!isChangeImg && (
        <>
          <form onSubmit={update} className="simple-form">
            <div className="img-preview" style={{ backgroundImage: 'url(' + imgData() + ')' }}></div>

            <section>
              <label htmlFor="name">Name</label>
              <input placeholder="Name" onChange={handleChange} value={user.name} type="text" name="name" id="name" />
            </section>
            <section>
              <label htmlFor="password">Password</label>
              <input
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
                autoComplete="true"
                type="password"
                name="password"
                id="password"
              />
            </section>
            <section>
              <label htmlFor="tel">Phone</label>
              <input
                placeholder="Phone"
                onChange={handleChange}
                value={user.phone || ''}
                type="tel"
                name="tel"
                id="tel"
              />
            </section>
            <a className="btn change-img" onClick={changeImg}>
              <AddPhotoAlternateIcon />
              Change Img
            </a>
            {/* <section>
          <label htmlFor="name">Name</label>
          <input placeholder="Name" {...bindName} type="text" name="name" id="name" />
        </section> */}
            <button className="simple-button btn save-btn ">Save</button>
          </form>
          <button className="simple-button btn delete-btn" onClick={deleteUser}>
            Delete
          </button>
        </>
      )}
      {remove && <DeleteModal onHandleDelete={onHandleDelete} />}
    </section>
  );
};
