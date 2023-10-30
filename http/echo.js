const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname !== '/echo' || !Object.keys(query).includes('message')) {
    res.statusCode = '404';
    res.end('Nice joke');
  }

  res.end(query.message);
});

server.listen(80, '127.0.0.1');
