import axios from 'axios';
import { storageService } from './storageService.js';

const tradeVolumeKEY = 'trade-volume';
const marketPriceKEY = 'market-price';

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
};

async function getRate(coins) {
  if (!storageService.load('btc') || storageService.load('dollar') !== coins) {
    const { data } = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`);
    storageService.store('btc', data);
    storageService.store('dollar', coins);
  }
  return storageService.load('btc');
}
async function getMarketPrice() {
  let chartData = storageService.load(marketPriceKEY);

  if (!chartData.length) {
    const { data } = await axios.get(`https://api.blockchain.info/charts/market-price`, {
      params: {
        timespan: '5months',
        format: 'json',
        cors: true,
      },
    });
    chartData = data.values;
    storageService.store(marketPriceKEY, chartData);
    chartData = JSON.stringify(data.values);
  }
  return chartData;
}

async function getConfirmedTransactions() {
  let chartData = storageService.load(tradeVolumeKEY);
  if (!chartData.length) {
    const { data } = await axios.get(`https://api.blockchain.info/charts/trade-volume`, {
      params: {
        timespan: '5months',
        format: 'json',
        cors: true,
      },
    });

    chartData = data.values;
    storageService.store(tradeVolumeKEY, chartData);
    chartData = JSON.stringify(data.values);
  }
  return chartData;
}
