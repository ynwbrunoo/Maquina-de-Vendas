const coinsBox = [
  {
    moeda: 200,
    quantidade: 5,
  },
  {
    moeda: 100,
    quantidade: 9,
  },
  {
    moeda: 50,
    quantidade: 14,
  },
  {
    moeda: 20,
    quantidade: 50,
  },
  {
    moeda: 10,
    quantidade: 60,
  },
  {
    moeda: 5,
    quantidade: 75,
  },
];

const calculateValue = (coin) => {
  return coin.moeda * coin.quantidade / 100;
}

const coinsBoxWithValues = coinsBox.map((coin) => {
  return {
    ...coin,
    valorTotal: calculateValue(coin)
  }
});

export default coinsBoxWithValues;
