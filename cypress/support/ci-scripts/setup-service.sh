#!/bin/bash

#Script to clone the service repo and checkout specified branch
git clone -v --recurse-submodules --progress "https://github.com/20one/21-mobile-service.git" "./21-mobile-service"
cd ./21-mobile-service
git checkout -B "$1" "origin/$1"
pip install virtualenv
git submodule update --init --recursive
./setup.sh
cd ..
#copies the service env var file into the newly created directory (Temporary)
cp environment_variables.sh 21-mobile-service
cd ./21-mobile-service
source ~/.virtualenvs/21-mobile-service/Scripts/activate
source ./environment_variables.sh
PGPASSWORD=$DB_PASSWORD dropdb -U $DB_USERNAME -p $DB_PORT -h $DB_HOST --if-exists $DB_NAME
PGPASSWORD=$DB_PASSWORD createdb -U $DB_USERNAME -h $DB_HOST -p $DB_PORT -O postgres $DB_NAME
source ./environment_variables.sh
python manage.py create_db local
cd ..