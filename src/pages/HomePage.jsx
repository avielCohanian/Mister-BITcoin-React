import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../cmp/Loading';
import { MovesList } from '../cmp/MovesList';

import { bitcoinService } from '../services/bitcoinService';
import { getLoggingUser } from '../store/actions/userActions';

import anonymous from '../assets/imgs/anonymous.png';
import SettingsIcon from '@mui/icons-material/Settings';

export const HomePage = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule);

  const [user, setUser] = useState(null);
  const [btc, setBtc] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await dispatch(getLoggingUser());
      if (!loggedInUser) props.history.push('/signup');
      dispatch({ type: 'SET_LOGGING_USER', user });
      setUser(user);
    })();
  }, []);

  useEffect(() => {
    btcToShow();
  }, [user]);

  const btcToShow = async () => {
    const btc = user ? await bitcoinService.getRate(user.coins) : '';
    setBtc(btc);
  };

  const imgData = () => {
    return user.img || anonymous;
  };

  if (!user) return <Loading />;
  return (
    <div className="home-page">
      <Link className="simple-button setting-btn" to="/setting">
        <SettingsIcon />
      </Link>
      <section>
        <div className="img-preview" style={{ backgroundImage: 'url(' + imgData() + ')' }}></div>
        <h3>Hello {user.name}!</h3>
        <div>
          <b>Coins: </b>
          <span>
            {user.coins} <b>$</b>
          </span>
        </div>
        <div>
          <b>BTC: </b>
          <span>{btc && btc}</span>
          <span className="icons8-bitcoin"></span>
        </div>
      </section>
      <>
        {user.moves.length ? (
          <MovesList
            moves={user.moves.filter((move, idx) => idx <= 2)}
            title={user.moves && user.moves.length < 3 ? `Your last ${user.moves.length} Moves:` : `Your last 3 Moves:`}
            to="to"
          />
        ) : (
          ''
        )}
      </>
    </div>
  );
};
