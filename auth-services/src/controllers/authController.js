const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = new User({ email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user.twoFactorEnabled) {
          return res.json({ message: '2FA required', userId: user._id });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
      }
};

exports.auth2fa = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const secret = speakeasy.generateSecret();
    user.twoFactorSecret = secret.base32;
    await user.save();
    res.json({ secret: secret.otpauth_url });
  } catch (error) {
    res.status(500).json({ message: 'Error generating 2FA secret' });
  }
};

exports.auth2faverify = async (req, res) => {
  try {
    const { userId, token } = req.body;
    const user = await User.findById(userId);
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token
    });
    if (verified) {
      user.twoFactorEnabled = true;
      await user.save();
      res.json({ message: '2FA enabled successfully' });
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying 2FA token' });
  }
};


exports.auth2authenticate = async (req, res) => {
  try {
    const { userId, token } = req.body;
    const user = await User.findById(userId);
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token
    });
    if (verified) {
      const jwtToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token: jwtToken });
    } else {
      res.status(401).json({ message: 'Invalid 2FA token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating with 2FA' });
  }
};
