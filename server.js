const http = require("http");
const fs = require("fs").promises;
require("dotenv").config({ path: ".env" });

// The pages ask the cloud with the key the tests use, which is given in the
// USER_KEY_VALID environment variable, or in .env, rather than kept in a page.
const sendPage = (res, file) =>
  fs.readFile(__dirname + file).then((contents) => {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(
      contents
        .toString()
        .replace(/__USER_KEY_VALID__/g, process.env.USER_KEY_VALID || ""),
    );
  });


const host = "localhost";
const port = 8080;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/page-using-rkey":
      sendPage(res, "/src/__pages__/page-using-rkey.html");
      break;
    case "/page-using-rkey-headers":
      sendPage(res, "/src/__pages__/page-using-rkey-headers.html");
      break;
    case "/stop-server":
      res.end();
      server.close();
      process.exit(1);
      break;
    case "/parser.js":
      fs.readFile(__dirname + "/lib/ua-parser.min.js").then(
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
