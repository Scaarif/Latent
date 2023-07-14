#!/usr/bin/env bash
# Setup script for the project - Latent

# cd backend/api && touch in_api_directory
# cd "$CWD" || return

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
CWD=$(pwd)

# Run backend server and job queue in background
# TODO: log rotation
cd backend/api/v1/ || return
node jobs/processJobs.js >> queue.log &
ENVIRON='test' npm start >> server.log &

# Run frontend app

# Wait for back- and front-ends to start
sleep 8  # too much?

# run tests in backend
# ./backend/api/v1/node_modules/.bin/mocha --require ./backend/api/v1/test/hooks.js --exit ./backend/api/v1/test ; pkill -f backend/api/v1/server.js ; pkill -f backend/api/v1/jobs/processJobs.js
npm test

# Return to root
cd "$CWD" || return
pwd

# Kill running test process
ps ax
pkill -f jobs/processJobs.js
for pid in $(pgrep -f server.js)
do
  echo "$pid"
  kill "$pid"
done
