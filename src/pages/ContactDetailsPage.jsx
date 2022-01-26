import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../cmp/Loading';
import { MovesList } from '../cmp/MovesList';
import { TransferFund } from '../cmp/TransferFund';
import { useDispatch, useSelector } from 'react-redux';
import { getContactById } from '../store/actions/contactActions';
import { getLoggingUser, addMove, updateUser } from '../store/actions/userActions';
import { userService } from '../services/userService';

import anonymous from '../assets/imgs/anonymous.png';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import CloseIcon from '@mui/icons-material/Close';
import PasswordIcon from '@mui/icons-material/Password';
import SendIcon from '@mui/icons-material/Send';
import { useInput } from '../hooks/useInput';

export const ContactDetailsPage = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const [currUser, setCurrUser] = useState(null);
  const [loggingUser, setLoggingUser] = useState(null);
  const [isTransferMode, setIsTransferMode] = useState(false);
  const [havePassword, setHavePassword] = useState(true);
  const [password, bindPassword, resatPassword] = useInput('');

  const amount = useRef(null);
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const imgData = () => {
    return currUser.img || anonymous;
  };

  useEffect(() => {
    if (isTransferMode) {
      inputRef.current.focus();
    }
  }, [isTransferMode]);

  useEffect(() => {
    (async () => {
      const currUser = await dispatch(getContactById(props.match.params.contactId));
      setCurrUser(currUser);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const loggingUser = await dispatch(getLoggingUser());
      if (!loggingUser) props.history.push('/signup');
      setLoggingUser(loggingUser);
    })();
  }, [loggedInUser]);

  const transfer = async (amountToTransfer) => {
    setIsTransferMode(true);
    amount.current = amountToTransfer;
  };

  const closeTransferMode = () => {
    setIsTransferMode(false);
  };

  const checkPassword = async (ev) => {
    ev.preventDefault();
    if (!havePassword) {
      console.log(password);
      await dispatch(updateUser({ ...loggingUser, password }));

      resatPassword();
      setHavePassword(true);
      return;
    }

    const isPassword = await userService.checkUserPassword(password);
    if (isPassword === 'no-password') {
      setHavePassword(false);
      dispatch({
        type: 'USERMSG',
        msg: {
          txt: `${loggingUser.name},You do not have a password yet, please select a password. `,
          typeMsg: 'failure',
        },
      });
      resatPassword();
      return;
    }
    resatPassword();
    if (!isPassword) {
      dispatch({
        type: 'USERMSG',
        msg: {
          txt: `Transfer ${amount.current} to ${currUser.name} failed, the password is incorrect.`,
          typeMsg: 'failure',
        },
      });
      return;
    }
    closeTransferMode();
    const user = await dispatch(addMove(currUser, amount.current));
    if (user) {
      dispatch({
        type: 'USERMSG',
        msg: { txt: `Transfer ${amount.current} to ${currUser.name} was successful.`, typeMsg: 'success' },
      });
    }
  };

  if (!currUser) return <Loading />;
  return (
    <div className="contact-details-page ">
      <section
        className="modal-wrapper password-model"
        style={{ display: isTransferMode ? '' : 'none' }}
        onClick={closeTransferMode}
      >
        <form onClick={(ev) => ev.stopPropagation()} onSubmit={checkPassword}>
          <CloseIcon className="back-btn" onClick={closeTransferMode} />
          <h1>{havePassword ? 'Enter a password' : 'Choose a password'}</h1>
          <div className="input-container">
            <PasswordIcon />

            <input
              type="password"
              placeholder="Enter the Password"
              name="password"
              {...bindPassword}
              id="password"
              autoComplete="true"
              ref={inputRef}
            />
          </div>
          <SendIcon className="send" onClick={checkPassword} />
        </form>
      </section>

      <div className="btn-edit-container">
        <Link className="simple-button back-btn" to="/contact">
          <ArrowBackIosSharpIcon />
          Back
        </Link>
        <Link className="simple-button edit-btn" to={`/contact/edit/${currUser._id}`}>
          <EditSharpIcon />
        </Link>
      </div>
      <article>
        <div className="img-preview" style={{ backgroundImage: 'url(' + imgData() + ')' }}></div>
        <section>
          <strong>Name:</strong>
          <span>{currUser.name}</span>
        </section>
        <section>
          <strong>Phone:</strong>
          <span>{currUser.phone}</span>
        </section>
        <section>
          <strong>Email:</strong>
          <span>{currUser.email}</span>
        </section>
        {currUser.isAdmin && (
          <Link className="edit" to={`/contact/edit/${currUser._id}`}>
            Edit
          </Link>
        )}
        <div>
          <TransferFund currUserName={currUser.name} transfer={transfer} />
          {loggingUser && loggingUser.moves.some((m) => m.to === currUser.name) && (
            <MovesList moves={loggingUser.moves.filter((m) => m.to === currUser.name)} title="Your moves:" />
          )}
        </div>
      </article>
    </div>
  );
};
