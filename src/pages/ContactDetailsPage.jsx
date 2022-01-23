import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Loading from '../cmp/Loading';
import { MovesList } from '../cmp/MovesList';
import { TransferFund } from '../cmp/TransferFund';
import { useDispatch, useSelector } from 'react-redux';
import { getContactById } from '../store/actions/contactActions';
import { addMove, getLoggingUser } from '../store/actions/userActions';

import anonymous from '../assets/imgs/anonymous.png';
import { userService } from '../services/userService';

export const ContactDetailsPage = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const [currUser, setCurrUser] = useState(null);
  const [loggingUser, setLoggingUser] = useState(null);

  const dispatch = useDispatch();

  const imgData = () => {
    return currUser.img || anonymous;
  };

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

  const transfer = async (amount) => {
    const password = '123';
    const isPassword = await userService.checkUserPassword(password);
    if (!isPassword) return;
    dispatch({ type: 'USERMSG', msg: `Transfer ${amount} to ${currUser.name}` });
    dispatch(addMove(currUser.name, amount));
  };

  if (!currUser) return <Loading />;
  return (
    <div className="contact-details-page ">
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
