import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../cmp/Loading';
import { MovesList } from '../cmp/MovesList';
import { bitcoinService } from '../services/bitcoinService';
import { userService } from '../services/userService';
import { getLoggingUser } from '../store/actions/userActions';
import anonymous from '../assets/imgs/anonymous.png';

export const HomePage = (props) => {
  const [user, setUser] = useState(null);
  const [btc, setBtc] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(getLoggingUser());
      const user = await userService.getUser();
      if (!user) props.history.push('/signup');
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
      <section>
        <div className="img-preview" style={{ backgroundImage: 'url(' + imgData() + ')' }}></div>
        <h3>Hello {user.name}!</h3>
        <div>
          <b>Coins: </b>
          <span>
            {user.coins} <b>$</b>{' '}
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
