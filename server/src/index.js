const express = require('express');
const cors = require('cors');
const debug = require('debug')('server');
const morgan = require('morgan');
const passport = require('passport');
const { connect } = require('mongoose');

require('dotenv').config();
require('./ddbb/mongoose.config');

const PORT = process.env.PORT || 4000;
const originHost = process.env.ORIGIN_HOST || 'http://localhost:3000';

const server = express();
require('./passport/passport.config')(server);

const routes = require('./routes/routes');
const userRoutes = require('./routes/userRouter');

const corsOptions = {
  origin: originHost,
};

server.use(morgan('dev'));
server.use(cors(corsOptions));
server.use(morgan('tiny'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use('/', routes);
server.use('/user', passport.authenticate('jwt', { session: false }), userRoutes);

connect(
  process.env.DDBB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
)
  .then(() => debug('Correct conection'))
  .catch((error) => debug(error));

const restaurantsRouter = require('./routes/restaurantsRouter');

server.use('/restaurants', restaurantsRouter);

const bookingsRouter = require('./routes/bookingsRouter');

server.use('/bookings', passport.authenticate('jwt', { session: false }), bookingsRouter);

const favoritesRouter = require('./routes/favoritesRouter');

server.use('/favorites', passport.authenticate('jwt', { session: false }), favoritesRouter);

server.listen(PORT, debug(`server is running on port ${PORT}`));
