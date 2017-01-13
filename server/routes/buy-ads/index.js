import { Router } from 'express';

const router = Router();

router.route('/')
  .get((req, res) => {
    res.render('buy-ads');
  });

export default router;
