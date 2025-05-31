const { User } = require('../database/models')

class ControllerAuth {
  static async login(req, res, next) {
    try {
      const { email, password, remember } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Email or password is invalid' });
      }

      const isPasswordCorrect = await user.checkPassword(password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Email or password is invalid' });
      }

      const token = user.generateToken(remember);

      return res.status(200).json({
        message: 'Login successful',
        token
      });
    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body
      const newUser = await User.create({ email, password });
      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: newUser.id,
          email: newUser.email
        }
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerAuth