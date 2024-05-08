#!/bin/bash
#Main Script that will run the whole test when given the name of a branch
./setup-ui.sh $1
if [[ $? -ne 0 ]]
then
  echo Failed to setup ui
  exit 1
fi

./setup-service.sh $1
if [[ $? -ne 0 ]]
then
  echo Failed to setup service
  exit 1
fi

./setup-worker.sh $1
if [[ $? -ne 0 ]]
then
  echo Failed to setup worker
  exit 1
fi

# This command kills the background processes started in "start.sh" when the script exits
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
# Next two lines run all components and exit when the cypress tests complete
./start.sh
npx cypress run
if [[ $? -eq 0 ]]
then
  echo cypress tests passed
  exit 0
else
  echo cypress tests failed
  exit 1
fi