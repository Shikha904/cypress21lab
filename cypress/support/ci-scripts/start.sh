#!/bin/bash

# Script to run the service, worker, and proxy in the background.
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

cd ./21-mobile-service
./run_local.sh &
cd ..
cd ./21-mobile-ui
npm run proxy-perfecto-dev &
npm run start-local &
cd ..