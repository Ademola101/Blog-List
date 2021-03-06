const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
require('express-async-errors');

const app = express();

const blogRouter = require('./controllers/Blog');
const userRouter = require('./controllers/User');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

const logger = require('./utils/logger');

logger.info(`connecting to : ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI).then(() => logger.info('connected to db')).catch((error) => logger.error(`error connecting to db: ${error}`));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use('/api/blog', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
