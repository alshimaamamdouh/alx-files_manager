const crypto = require('crypto');
const dbClient = require('../utils/db'); // Assuming you have a DB utility

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists
    const existingUser = await dbClient.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    // Create the new user
    const newUser = await dbClient.createUser({ email, password: hashedPassword });

    // Respond with the new user
    res.status(201).json({
      id: newUser._id,
      email: newUser.email
    });
  }
}

module.exports = UsersController;
