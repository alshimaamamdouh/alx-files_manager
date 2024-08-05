const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

class RedisClient {
  set(key, value, ...args) {
    return new Promise((resolve, reject) => {
      client.set(key, value, ...args, (err, reply) => {
        if (err) return reject(err);
        resolve(reply);
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, reply) => {
        if (err) return reject(err);
        resolve(reply);
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      client.del(key, (err, reply) => {
        if (err) return reject(err);
        resolve(reply);
      });
    });
  }
}

module.exports = new RedisClient();
