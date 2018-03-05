var express = require('express')
var router = express.Router();
var jwt = require('jsonwebtoken');

const products = [
  {
    id: 1,
    name: 'Test Product - 1',
    imageUrl: 'http://via.placeholder.com/150x150',
    price: 50,
    isOnSale: true,
    quantityInCart: 0,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam quam. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla.'
  },
  {
    id: 2,
    name: 'Test Product - 2',
    imageUrl: 'http://via.placeholder.com/150x150',
    price: 150,
    isOnSale: false,
    quantityInCart: 0,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam quam. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla.'
  },
  {
    id: 3,
    name: 'Test Product - 3',
    imageUrl: 'http://via.placeholder.com/150x150',
    price: 250,
    isOnSale: true,
    quantityInCart: 0,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet risus nullam eget felis eget nunc lobortis mattis. Nunc lobortis mattis aliquam faucibus purus in massa. Adipiscing bibendum est ultricies integer. Sit amet cursus sit amet dictum sit amet. Ullamcorper a lacus vestibulum sed. Odio euismod lacinia at quis risus sed vulputate odio. Aenean vel elit scelerisque mauris pellentesque. In fermentum et sollicitudin ac. Tempus imperdiet nulla malesuada pellentesque. Ultrices sagittis orci a scelerisque purus semper eget. Eu tincidunt tortor aliquam nulla facilisi cras. Aliquet risus feugiat in ante metus dictum at tempor commodo. Est placerat in egestas erat imperdiet sed euismod. Sem et tortor consequat id porta nibh. Mauris vitae ultricies leo integer malesuada nunc vel risus. Lectus sit amet est placerat in. Convallis aenean et tortor at risus. Velit egestas dui id ornare arcu odio ut sem. Non enim praesent elementum facilisis leo.'
  }
];

var checkIfLoggedIn = (req, res, next) => {
  var token = req.get('X-AUTH-HEADER');
  var user = jwt.decode(token);
  if (user && user.user) {
    return next();
  }
  return res.status(403).json({msg: 'Please login to access this information'});
};

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundProducts = products.filter(
      (product) => product.name.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundProducts);
  }
  return res.status(200).json(products);
});

router.get('/:id', (req, res) => {
  let productId = req.params.id;
  const foundProduct = products.find((product) => product.id == productId);
  if (foundProduct) {
    res.json(foundProduct);
  } else {
    return res.status(400).json({msg: 'Product with id ' + productId + ' not found.'})
  }
});

router.post('/', checkIfLoggedIn, (req, res) => {
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

router.patch('/:id', checkIfLoggedIn, (req, res) => {
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