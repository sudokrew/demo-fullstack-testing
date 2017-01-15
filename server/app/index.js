import bodyParser from 'body-parser';
import express from 'express';
import expressSession from 'express-session';
import methodOverride from 'method-override';
import path from 'path';
import passport from 'passport';
import {
  Strategy as LocalStrategy
} from 'passport-local';

import {
  Ad,
  User,
} from '../models';

import apiApp from '../api';
import buyAdsRouter from '../routes/buy-ads';
import loginRouter from '../routes/login';

const PROJECT_ROOT_PATH = path.resolve(__dirname, '..', '..');
const SERVER_ROOT_PATH = path.resolve(PROJECT_ROOT_PATH, 'server');

const app = express();

app.set('views', path.resolve(SERVER_ROOT_PATH, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(PROJECT_ROOT_PATH, 'public')));

// Login strategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ where: { username } })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password != user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
    .catch(done);
  }
));

if (false) {
  console.log('hey');
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id)
  .then(user => done(null, user))
  .catch(done)
});

app.use(bodyParser({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.get('/',
  function getHomeHandler (req, res, next) {
    return Ad.findAll({ where: { isVisible: true } })
    .then(ads => {
      res.render('home', { ads });
    })
    .catch(next);
  }
);

app.use('/buy-ads', buyAdsRouter);

app.use('/login', loginRouter);

app.get('/manage',
(req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
},
function getManageHandler(req, res, next) {
  return Ad.findAll()
  .then(ads => {
    res.render('manage', { ads });
  })
  .catch(next);
}
);

app.get('/logout',
function getLogoutHandler (req, res, next) {
  req.logout();
  res.redirect('/');
});

app.use('/api', apiApp);

app.use(function (err, req, res, next) {
  res.status(400).json({ error: err.message });
});

export default app;
