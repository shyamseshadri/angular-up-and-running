const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser());
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/product', require('./products'));

app.listen(3000, () => console.log('App Server listening on port 3000!'));