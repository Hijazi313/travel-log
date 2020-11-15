require('dotenv/config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require("mongoose");

const {notFound, errorHandler} = require('./middlewares');
const logRoute  = require("./route/logRoute");

const app = express();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser:true,
  useUnifiedTopology:true
})

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json())

// SET ROUTES
app.use("/api/logs", logRoute);

// NOT FOUND 
app.use(notFound)

// Error Handeling Middleware
// eslint-disable-next-line no-unused-vars
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`Appp is running at ${process.env.PORT}`));
