const redisClient = require('../utils/redis'); // Assuming you have a Redis utility
const dbClient = require('../utils/db'); // Assuming you have a DB utility

class AppController {
  static async getStatus(req, res) {
    const redisAlive = redisClient.isAlive(); // Method to check Redis status
    const dbAlive = dbClient.isAlive(); // Method to check DB status
    res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(req, res) {
    const usersCount = await dbClient.nbUsers(); // Method to count users
    const filesCount = await dbClient.nbFiles(); // Method to count files
    res.status(200).json({ users: usersCount, files: filesCount });
  }
}

module.exports = AppController;
