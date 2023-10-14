const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());

// Настройка CORS
app.use(cors({
  origin: "http://localhost:4200",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true,
  preflightContinue: false,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Allow-Origin",
}));

var routes = require('./routes/routes');

mongoose
  .connect('mongodb://127.0.0.1:27017/company', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected!');
    app.listen(8086, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Port Connected!');
      }
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(routes);
