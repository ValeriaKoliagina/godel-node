const http = require('http');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const yargs = require('yargs');

const server = http.createServer((req, res) => {
  try {
    const data = [];

    const file = path.resolve('./message.html');
    const readStream = fs.createReadStream(file, { encoding: 'utf-8' });

    readStream.on('data', (chunk) => {
      data.push(chunk)
    });

    readStream.on('end', () => {
      const { message } = yargs.argv;

      const template = Handlebars.compile(...data);
      const result = template({ message });

      res.setHeader('Content-Type', 'text/html');
      res.write(result);
      res.end(); 
    })

    readStream.on('error', () => {
      res.statusCode = '500';
      res.end('Ooooooops')
    })

    res.on('close', () => {
      readStream.destroy();
    })
  } catch(err) {
    res.statusCode = '500';
    res.end('Something went wrong')
  }
});

server.listen(80, '127.0.0.1');
