const http = require("http");
const post_options = {
  host: "localhost",
  port: "8080",
  path: "/stop-server",
  method: "GET",
  headers: {},
};
http.request(post_options).end();
