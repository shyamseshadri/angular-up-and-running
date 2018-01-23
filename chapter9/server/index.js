const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser());
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/stock', require('./stocks'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));