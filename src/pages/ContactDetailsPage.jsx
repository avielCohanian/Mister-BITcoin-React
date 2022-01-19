import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Loading from '../cmp/Loading';
import { MovesList } from '../cmp/MovesList';
import { TransferFund } from '../cmp/TransferFund';
import { useDispatch, useSelector } from 'react-redux';
import { getContactById } from '../store/actions/contactActions';
import { getLoggingUser } from '../store/actions/userActions';

export const ContactDetailsPage = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule);

  const [currUser, setCurrUser] = useState(null);
  const [loggingUser, setLoggingUser] = useState(null);

  const dispatch = useDispatch();

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
        <img src={currUser.imgLarge} alt="" />
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
        <Link className="edit" to={`/contact/edit/${currUser._id}`}>
          Edit
        </Link>
        <div>
          <TransferFund currUserName={currUser.name} />
          {loggingUser && loggingUser.moves.some((m) => m.to === currUser.name) && (
            <MovesList moves={loggingUser.moves.filter((m) => m.to === currUser.name)} title="Your moves:" />
          )}
        </div>
      </article>
    </div>
  );
};
