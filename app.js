var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// import router
const videosRouter = require('./app/api/v1/videos/router');
const productsRouter = require('./app/api/v1/products/router');
const commentsRouter = require('./app/api/v1/comments/router');

// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

// membuat variabel v1
const v1 = '/api/v1';

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