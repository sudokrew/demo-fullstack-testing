import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.route('/')
  .get((req, res) => {
    res.render('login');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/manage',
      failureRedirect: '/login',
    })
  );

export default router;
