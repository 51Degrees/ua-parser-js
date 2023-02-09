const http = require("http");
const fs = require("fs").promises;


const host = "localhost";
const port = 8080;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/page-using-rkey":
      fs.readFile(__dirname + "/src/__pages__/page-using-rkey.html").then(
        (contents) => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(contents);
        },
      );
      break;
    case "/page-using-rkey-headers":
      fs.readFile(
        __dirname + "/src/__pages__/page-using-rkey-headers.html",
      ).then((contents) => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
      });
      break;
    case "/stop-server":
      res.end();
      server.close();
      process.exit(1);
      break;
    case "/parser.js":
      fs.readFile(__dirname + "/lib/ua-parser-51d.min.js").then(
        (contents) => {
          res.setHeader("Content-Type", "text/javascript");
          res.writeHead(200);
          res.end(contents);
        },
      );
      break;
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
