const express = require("express");
const bodyParser = require("body-parser");

const userRoute = require('./routes/user.route');

const app = express();
const port = 2000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
