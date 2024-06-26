const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login
  };

  async function create(req, res) {
     console.log(req.body);
    try {
      const user = await User.create(req.body);
      const token = createJWT(user);
      console.log(user);
      res.json(token);
    } catch (err) {
      console.log(err)
    }
  }

  async function login(req, res) {
    try {
      const user = await User.findOne({name: req.body.name});
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      const token = createJWT(user);
      res.json(token);
    } catch (err) {
      res.status(400).json('Bad Credentials');
    }
  }

  function createJWT(user) {
    return jwt.sign(
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }