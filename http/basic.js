const http = require('http');

const server = http.createServer((req, res) => {
  try {
    const data = {
      message: 'Hello, world!',
      info: 'another message'
    };
  
    const jsonData = JSON.stringify(data);
  
    res.setHeader('Content-Type', 'application/json');
    res.write(jsonData);
    res.end();
  } catch(err) {
    res.statusCode = '500';
    res.end('Something went wrong')
  }
});

server.listen(80, '127.0.0.1');
