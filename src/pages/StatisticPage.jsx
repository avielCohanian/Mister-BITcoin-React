import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChartStatistic } from '../cmp/Chart';
import Loading from '../cmp/Loading';
import { bitcoinService } from '../services/bitcoinService';
import { getLoggingUser } from '../store/actions/userActions';

export const StatisticPage = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const [tradeVolume, setTradeVolume] = useState(null);
  const [marketPrice, setMarketPrice] = useState(null);
  const [loggingUser, setLoggingUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const loggingUser = await dispatch(getLoggingUser());
      if (!loggingUser) props.history.push('/signup');
      setLoggingUser(loggingUser);
    })();
  }, [loggedInUser]);

  useEffect(() => {
    (async () => {
      const tradeVolume = await bitcoinService.getConfirmedTransactions();
      const marketPrice = await bitcoinService.getMarketPrice();
      setTradeVolume(tradeVolume);
      setMarketPrice(marketPrice);
    })();
  }, []);

  if (!loggingUser || !tradeVolume || !marketPrice) return <Loading />;
  return (
    <section className="statistic-page container">
      <h1>Chart</h1>
      <div className="Charts">
        <article>
          <strong>Trade-Volume</strong>
          <ChartStatistic values={JSON.parse(tradeVolume)} />
        </article>
        <article>
          <strong>Market-Price</strong>
          <ChartStatistic values={JSON.parse(marketPrice)} />
        </article>
      </div>
    </section>
  );
};
