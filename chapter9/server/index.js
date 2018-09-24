const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/fail', (req, res) => res.status(403).json({msg: 'You are not allowed to access this'}));

app.use('/api/stock', require('./stocks'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));