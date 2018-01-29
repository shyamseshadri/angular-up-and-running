var express = require('express')
var router = express.Router();

const products = [
  {
    id: 1,
    name: 'Test Product - 1',
    imageUrl: 'http://via.placeholder.com/150x150',
    price: 50,
    isOnSale: true,
    quantityInCart: 0
  },
  {
    id: 2,
    name: 'Test Product - 2',
    imageUrl: 'http://via.placeholder.com/150x150',
    price: 150,
    isOnSale: false,
    quantityInCart: 0
  },
  {
    id: 3,
    name: 'Test Product - 3',
    imageUrl: 'http://via.placeholder.com/150x150',
    price: 250,
    isOnSale: true,
    quantityInCart: 0
  }
];

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundProducts = products.filter(
      (product) => product.name.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundProducts);
  }
  return res.status(200).json(products);
});

router.post('/', (req, res) => {
  let product = req.body;

  if (product.id) {
    return res.status(400)
        .json({msg: 'Product seems to already have an id assigned'});
  }

  product.id = products.length + 1;
  product.quantityInCart = 0;
  products.push(product);
  return res.status(200).json(product);
});

router.patch('/:id', (req, res) => {
  let productId = req.params.id;
  const foundProduct = products.find((product) => product.id == productId);
  if (foundProduct) {
    let changeInQuantity = req.body.changeInQuantity;
    foundProduct.quantityInCart += changeInQuantity;
    return res.status(200).json({msg: 'Successfully updated cart'});
  }
  return res.status(400).json({msg: 'Product with id ' + productId + ' not found.'});
});

module.exports = router;