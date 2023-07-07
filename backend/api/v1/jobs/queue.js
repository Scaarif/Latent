const Queue = require('bull');

const bookHouseQueue = new Queue('sendNotificationForHouseBooking', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
});

module.exports = bookHouseQueue;
