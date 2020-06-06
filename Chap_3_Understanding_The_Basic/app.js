const http = require('http'); // always look for global module

const routes = require('./routes');

console.log(routes.someText);

// anonymous fun -> To execute for each req , if req come execute this function
const server = http.createServer(routes.handler);

server.listen(3000);
