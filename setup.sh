#!/usr/bin/env bash
# Setup script for the project - Latent

# =======Redis========

if [ ! "$(command -v redis-server)" ]
then
  # Install Redis
  sudo apt install redis-server -y

  # Enable Redis to start on boot
  sudo systemctl enable redis-server

  # Start Redis service
  sudo service redis-server start
fi

# =======MongoDB=======

if [ ! "$(command -v mongod)" ]
then
  # no MongoDB; install it
  # install gnupg if not available
  sudo apt-get install gnupg

  # Import the MongoDB GPG Key
  curl -fsSL https://pgp.mongodb.com/server-4.2.asc | \
     sudo gpg -o /usr/share/keyrings/mongodb-server-4.2.gpg \
     --dearmor

  # Add the MongoDB repository to the sources list
  echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-4.2.gpg ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

  # Update system packages
  sudo apt-get update

  # Install MongoDB
  sudo apt-get install -y mongodb-org=4.2.18 mongodb-org-server=4.2.18 mongodb-org-shell=4.2.18 mongodb-org-mongos=4.2.18 mongodb-org-tools=4.2.18

  # prevent unintended upgrades
  echo "mongodb-org hold" | sudo dpkg --set-selections
  echo "mongodb-org-server hold" | sudo dpkg --set-selections
  echo "mongodb-org-shell hold" | sudo dpkg --set-selections
  echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
  echo "mongodb-org-tools hold" | sudo dpkg --set-selections

  # Start MongoDB service
  sudo service mongod start
fi

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
CWD=$(pwd)  # Save working directory
cd backend/api/v1/ || return
npm install
if [[ ! $(pgrep -f jobs/processJobs) ]]
then
  node jobs/processJobs.js >> queue.log &
fi

if [[ ! $(pgrep -f server.js) ]]
then
  npm run dev >> server.log &
fi

# Reset working directory
cd "$CWD" || return

# Run frontend app
cd Latent-FrontEnd || return
npm install
if [[ ! $(pgrep -f vite) ]]
then
  npm run dev >> frontend.log &
fi

# Reset working directory
cd "$CWD" || return

# Wait for back- and front-ends to start
sleep 8  # too much?
