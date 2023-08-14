const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// import router
const videosRouter = require('./app/api/videos/router');
const productsRouter = require('./app/api/products/router');
const commentsRouter = require('./app/api/comments/router');

// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

// membuat variabel v1
const v1 = '/api';

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Welcome to Stream Shop API',
	});
});

// gunakan router
app.use(v1, videosRouter);
app.use(v1, productsRouter);
app.use(v1, commentsRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
