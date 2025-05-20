#!/bin/bash
SERVER_DEPLOY=85.215.157.153
TARGET_DIR=/opt/deploy/qrcode/cms
APP_ID=qrcode-admin
PORT=4000

# Build source
echo "--> build source..."
cd source
npm ci
npm run build:dev

# Copy config file
echo "--> copy config file..."
cp appServer.js build/
sed -i '' "s/{PORT}/$PORT/g" build/appServer.js
cp package.json build/
cp package-lock.json build/

echo "Compress source..."
gtar -czf cms.tar.gz build


echo "Deploy to server"
ssh root@$SERVER_DEPLOY "pm2 stop $APP_ID"
ssh root@$SERVER_DEPLOY "mkdir -p $TARGET_DIR && rm -rf $TARGET_DIR/*"
scp cms.tar.gz root@$SERVER_DEPLOY:$TARGET_DIR/cms.tar.gz
ssh root@$SERVER_DEPLOY "cd $TARGET_DIR && tar -xzf cms.tar.gz && rm -rf cms.tar.gz && mv build/* . && rm -rf build && npm install --production"

echo "starting application"
ssh root@$SERVER_DEPLOY "cd $TARGET_DIR && pm2 start appServer.js --name $APP_ID -x -- --"

echo "Cleanup..."
rm -rf build
rm -rf cms.tar.gz
#rm -rf cms.tar.gz
echo "############# DONE #############"
