const express = require('express');
const routes = require('./routes.js');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }))

app.use(routes);

app.listen(3333,()=>console.log('Server is running...'));