#!/usr/bin/env bash
# Setup script for the project - Latent

# Start MongoDB
mongoOn=$(pgrep -f /usr/bin/mongod)
if [ ! "$mongoOn" ]
then
  # MongoDB not running; start it
  sudo service mongod start
fi

# Enable MongoDB

# Start Redis
redisOn=$(pgrep -f redis-server)
if [ ! "$redisOn" ]
then
  # Redis not running; start it
  sudo service redis-server start
fi

# Run backend server and job queue in background
# TODO: log rotation
cd backend/api/v1/ || return
node jobs/processJobs.js >> queue.log &
ENVIRON='test' npm start >> server.log &

# Wait for back- and front-ends to start
sleep 8  # too much?

# run tests in backend
npm test

# Kill running test process
pkill -f jobs/processJobs.js
for pid in $(pgrep -f server.js)
do
  kill "$pid"
done
