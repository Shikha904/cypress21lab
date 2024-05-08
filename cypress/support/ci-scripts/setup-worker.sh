#!/bin/bash

#Script to clone the worker repo and checkout specified branch
git clone -v --recurse-submodules --progress "https://github.com/20one/21-mobile-worker.git" "./21-mobile-worker"
cd ./21-mobile-worker
git checkout -B "$1" "origin/$1"
git submodule update --init --recursive
pip install virtualenv
pip install spacy
./setup.sh
cd ..
#Next line copies and renames the worker env var file to worker directory (Temporary)
cp environment_variables_w.sh 21-mobile-worker/environment_variables.sh