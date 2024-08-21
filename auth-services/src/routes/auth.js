const express = require('express');
const { register, login, auth2fa, auth2faverify, auth2authenticate} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/2fa/generate', auth2fa);
router.post('/2fa/verify', auth2faverify);
router.post('/2fa/authenticate', auth2authenticate);
router.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });
module.exports = router;