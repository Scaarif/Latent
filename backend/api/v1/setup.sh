#!/bin/bash

# Update system packages
sudo apt update

# Install Redis
sudo apt install redis-server -y

# Enable Redis to start on boot
sudo systemctl enable redis-server

# Start Redis service
sudo service redis-server start

# Import the MongoDB GPG Key
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

# Add the MongoDB repository to the sources list
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

# Install MongoDB
sudo apt install -y mongodb-org

# Create a mongod exexcutable incase it fails to create automatically
cat .mongod > /etc/init.d/mongod
chmod +x /etc/init.d/mongod
# Start MongoDB service
sudo service mongod start

# # Enable MongoDB to start on boot
# sudo systemctl enable mongod
