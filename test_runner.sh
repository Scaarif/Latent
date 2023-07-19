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
# cd backend/api/v1/ || return
if [[ ! $(pgrep -f jobs/processJobs) ]]
then
  node ./backend/api/v1/jobs/processJobs.js >> queue.log &
fi

if [[ $(pgrep -f server.js) ]]
then
  # Stop [production] server
  pkill -f server.js
fi

# Start test server
ENVIRON='test' node ./backend/api/v1/server.js > server.log &

# Wait for backend to start
# sleep 8  # too much?

# Wait for backend to start, dynamically
serverOn="$(pgrep -f server.js)"
while [[ ! "$serverOn" ]]
do
  # server not running; try again later
  serverOn="$(pgrep -f server.js)"
  sleep 1
done

# run tests in backend
npm test

sleep 2

# Kill running test processes
pkill -f jobs/processJobs.js
pkill -f server.js
