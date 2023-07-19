#!/usr/bin/env bash
# Start script for the project - Latent

# Start MongoDB
mongoOn=$(pgrep -f /usr/bin/mongod)
if [ ! "$mongoOn" ]
then
  # MongoDB not running; start it
  sudo service mongod start
fi

# Start Redis
redisOn=$(pgrep -f redis-server)
if [ ! "$redisOn" ]
then
  # Redis not running; start it
  sudo service redis-server start
fi

# Wait for servers to start up
# sleep 5  # too much?

# Run backend server and job queue in background
# TODO: log rotation
if [[ ! $(pgrep -f jobs/processJobs) ]]
then
  node ./backend/api/v1/jobs/processJobs.js > queue.log &
fi

if [[ ! $(pgrep -f server.js) ]]
then
  node ./backend/api/v1/server.js > server.log &
fi

# Run frontend app
if [[ ! $(pgrep -f vite) ]]
then
  npm run f-dev > frontend.log &
fi

# Wait for back- and front-ends to start
sleep 8  # too much?
