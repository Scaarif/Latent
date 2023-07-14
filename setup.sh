#!/usr/bin/env bash
# Setup script for the project - Latent

# CWD=$(pwd)
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
sleep 5  # too much?

# Run backend server and job queue in background
# TODO: log rotation
CWD=$(pwd)  # Save working directory
cd backend/api/v1/ || return
npm install
node jobs/processJobs.js >> queue.log &
npm run dev >> server.log &

# Reset working directory
cd "$CWD" || return

# Run frontend app
cd Latent-FrontEnd || return
npm install
npm run dev >> frontend.log &

# Reset working directory
cd "$CWD" || return

# Wait for back- and front-ends to start
sleep 8  # too much?
