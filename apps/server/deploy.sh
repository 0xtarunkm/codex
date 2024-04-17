#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v12.18.3/bin

cd /home/ubuntu/tensor-ide/
git pull origin main
yarn install
yarn build
pm2 stop express
pm2 start npm --name "server" -- run "start:server"