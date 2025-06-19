// controllers/authController.js
const User    = require('../models/User');
const bcrypt  = require('bcryptjs');

exports.signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Passwords do not match' });

  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const u    = await User.create({ name, email, password: hash });
    res.status(201).json({ message: 'User created', user: u });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const u = await User.findOne({ email });
    if (!u || !await bcrypt.compare(password, u.password))
      return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'Connexion réussie', user: u });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { id }               = req.params;
  const { name, avatar }     = req.body;
  try {
    const u = await User.findByIdAndUpdate(id,
      { name, avatar },
      { new: true }
    );
    if (!u) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Profil mis à jour', user: u });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};
