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

# Enable Redis

# Wait for servers to start up
# sleep 5  # too much?

# Save working directory (project root)
# CWD=$(pwd)

# Run backend server and job queue in background
# TODO: log rotation
cd backend/api/v1/ || return
node jobs/processJobs.js >> queue.log &
ENVIRON='test' npm start >> server.log &

# Run frontend app

# Wait for back- and front-ends to start
sleep 8  # too much?

# run tests in backend
npm test
# sleep 5

# Return to root
# cd "$CWD" || return

# Kill running test process
pkill -f jobs/processJobs.js
for pid in $(pgrep -f server.js)
do
  kill "$pid"
done
