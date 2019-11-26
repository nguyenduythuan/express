require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
const authMiddleware = require('./middlewares/auth.middleware');
const productRout = require('./routes/product.route');
const sessionMiddleware = require('./middlewares/session.middleware');

const apiProductRoute = require('./api/routes/product.route'); 

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(sessionMiddleware);

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', authMiddleware.requireAuth, productRout);
app.use('/cart', authMiddleware.requireAuth, cartRoute);

app.use('/api/products', apiProductRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
