const router = require('express').Router()

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/usersRouter');


router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
    res.json({ api: "It's Working!" });
  });
  
  module.exports = router;
  




















module.exports = router;