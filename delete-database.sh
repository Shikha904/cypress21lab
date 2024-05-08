#!/bin/bash
# Script deletes database from service environment variables file
source ./21-mobile-service/environment_variables.sh
PGPASSWORD=$DB_PASSWORD dropdb -U $DB_USERNAME -p $DB_PORT -h $DB_HOST --if-exists $DB_NAME
