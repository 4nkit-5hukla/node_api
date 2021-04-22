Installation
git clone https://github.com/4nkit-5hukla/node_api.git
cd node_api
npm i

create a .env file
PORT=<Your Post Number> Default 2000
HOST=<Your Database Host> Default localhost
DATABASE=<Your Database Name> Default node_api
USER_NAME=<Your Database Username> Default root
PASSWORD=<Your Database Username> Default ""
DATABASE_PREFIX=<Your Database Prefix> Default "api_"
ACCESS_TOKEN_SECRET=<Your Token Secret> Use Crypto to Generate Secret
REFRESH_TOKEN_SECRET=<Your Refresh Token Secret> Use Crypto to Generate Secret

How to Generate Secret
Open the terminal
$ node "press enter"
write this command
require('crypto').randomBytes(64).toString('hex')
copy the string and use as ACCESS_TOKEN_SECRET & REFRESH_TOKEN_SECRET