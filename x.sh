#!/usr/bin/env bash
# Setup script for the project - Latent

for pid in $(pgrep -f node)
do
  echo "$pid"
done
