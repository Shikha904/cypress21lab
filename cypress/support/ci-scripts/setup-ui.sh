#!/bin/bash

#Script to clone the ui repo and checkout specified branch
git clone -v --recurse-submodules --progress "https://github.com/20one/21-mobile-ui.git" "./21-mobile-ui"
cd ./21-mobile-ui
git checkout -B "$1" "origin/$1"
npm i -g yarn local-cors-proxy
npm install
cd ..
