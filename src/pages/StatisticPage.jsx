import React, { useState, useEffect } from 'react';
import { ChartStatistic } from '../cmp/Chart';
import Loading from '../cmp/Loading';
import { bitcoinService } from '../services/bitcoinService';

export const StatisticPage = () => {
  // state = {
  //   tradeVolume: null,
  //   marketPrice: null,
  // };

  const [tradeVolume, setTradeVolume] = useState(null);
  const [marketPrice, setMarketPrice] = useState(null);

  // componentDidMount() {
  //   this.loadChart();
  // }

  useEffect(() => {
    (async () => {
      const tradeVolume = await bitcoinService.getConfirmedTransactions();
      const marketPrice = await bitcoinService.getMarketPrice();
      setTradeVolume(tradeVolume);
      setMarketPrice(marketPrice);
    })();
  }, []);

  // async loadChart() {
  //   const tradeVolume = await bitcoinService.getConfirmedTransactions();
  //   const marketPrice = await bitcoinService.getMarketPrice();
  //   this.setState({ tradeVolume, marketPrice });
  // }

  if (!tradeVolume && !marketPrice) return <Loading />;
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
