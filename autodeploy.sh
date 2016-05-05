#!/bin/bash
cd "/home/travisci/supermarket/"
git pull
docker stop $(docker ps | grep 'supermarket' | awk '{print $1}')
docker build -t supermarket .
docker run -d -p 80:3000 supermarket
