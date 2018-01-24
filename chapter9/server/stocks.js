var express = require('express')
var router = express.Router();

const stocks = [
  {name: 'Test Stock Company', code: 'TSC', price: 85, previousPrice: 80, exchange: 'NASDAQ', favorite: false},
  {name: 'Second Stock Company', code: 'SSC', price: 10, previousPrice: 20, exchange: 'NSE', favorite: false},
  {name: 'Last Stock Company', code: 'LSC', price: 876, previousPrice: 765, exchange: 'NYSE', favorite: false},
];

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundStocks = stocks.filter(
      (stock) => stock.name.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundStocks);
  }
  return res.status(200).json(stocks);
});

router.post('/', (req, res) => {
  let stock = req.body;
  let foundStock = stocks.find(each => each.code === stock.code);
  if (foundStock) {
    return res.status(400)
        .json({msg: 'Stock with code ' + stock.code + ' already exists'});
  }
  stocks.push(stock);
  return res.status(200).json({msg: 'Stock with code ' + stock.code + ' successfully created'});
});

router.patch('/:code', (req, res) => {
  let stockCode = req.params.code;
  let foundStock = stocks.find(each => each.code === stockCode);
  if (foundStock) {
    foundStock.favorite = req.body.favorite;
    let msg = 'Stock with code ' + stockCode + ' is now ';
    msg += foundStock.favorite ? ' favorited.' : ' unfavorited';
    return res.status(200).json({msg: msg});
  }
  return res.status(400).json({msg: 'Stock with code ' + stockCode + ' not found!'});
});

module.exports = router;