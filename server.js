// const path = require('path');
const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const seedAll = require('./seeds/index-seeds');


const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;
// const hbs = exphbs.create({});

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/'));
// app.use(seedAll);



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});