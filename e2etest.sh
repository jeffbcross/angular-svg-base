function killServer () {
  kill $serverPid
  kill $seleniumPid
}

npm install .
./node_modules/.bin/webdriver-manager update
./node_modules/.bin/webdriver-manager start &
seleniumPid=$!

echo "waiting 2 seconds for selenium standalone to start"
sleep 2;

# Start basic webserver to serve the app
./node_modules/.bin/http-server -p 8080 &
serverPid=$!

trap killServer EXIT

./node_modules/.bin/protractor protractor.conf.js
