const coinsBox = [
  {
    moeda: 5,
    quantidade: 35,
  },
  {
    moeda: 10,
    quantidade: 60,
  },
  {
    moeda: 20,
    quantidade: 50,
  },
  {
    moeda: 50,
    quantidade: 14,
  },
  {
    moeda: 100,
    quantidade: 9,
  },
  {
    moeda: 200,
    quantidade: 5,
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
