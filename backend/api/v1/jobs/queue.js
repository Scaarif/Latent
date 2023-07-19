const Queue = require('bull');

if (process.env.NODE_ENV !== 'production') {
  const bookHouseQueue = new Queue('sendNotificationForHouseBooking', {
    redis: {
      host: 'localhost',
      port: 6379,
    },
  });

  const resetPassword = new Queue('resetPassword', {
    redis: {
      host: 'localhost',
      port: 6379,
    },
  });
} else {
  // production environment
  const bookHouseQueue = new Queue('sendNotificationForHouseBooking', process.env.REDIS_URI);

  const resetPassword = new Queue('resetPassword', process.env.REDIS_URI);
}

module.exports = { bookHouseQueue, resetPassword };
