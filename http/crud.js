const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer(async (req, res) => {
  try {
    const { method } = req;
    const filepath = path.resolve('./users.json');
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;
    const { groups: { userId } = {}} = pathname.match(/users\/(?<userId>.*)/) || {};
    const isUsersPath = !!pathname.match(/users$/);

    const sendError = () => {
      res.statusCode = '500';
      res.end('Ooooooooops')
    }

    const readUsersFile = filepath => {
      return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
          if (err) {
            reject(err);
          }

          resolve(data);
        });
      });
    }

    const writeUsersFile = (filepath, usersInfo) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(usersInfo), err => {
          if (err) {
            reject(err);
          }
  
          resolve();
        })
      });
    }

    const readRequestBody = req => {
      return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
          body += chunk;
        })

        req.on('end', () => {
          resolve(body);
        })

        req.on('error', reject)
      })
    }

    if (method === 'GET' && isUsersPath) {
      const info = fs.createReadStream(filepath);
      info.on('error', sendError);

      res.setHeader('Content-Type', 'application/json');
      info.pipe(res);

      res.on('close', () => info.destroy());
    } else if (method === 'GET' && userId) {
      const fileData = await readUsersFile(filepath);

      const usersInfo = JSON.parse(fileData);
      const user = usersInfo.find(el => el.id === userId);

      if (user) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
      } else {
        res.statusCode = '404';
        res.end('Not found');
      }
    } else if (method === 'POST' && isUsersPath) {
      const body = await readRequestBody(req);
      const addedInfo = JSON.parse(body);

      const fileData = await readUsersFile(filepath);
      const usersInfo = JSON.parse(fileData);

      if (Array.isArray(addedInfo)) {
        addedInfo.forEach(info => usersInfo.push(info));
      } else {
        usersInfo.push(addedInfo);
      }

      await writeUsersFile(filepath, usersInfo);
      res.end();
    } else if (method === 'PUT' && isUsersPath) {
      const body = await readRequestBody(req);
      const updatedInfo = JSON.parse(body);

      const fileData = await readUsersFile(filepath);
      const usersInfo = JSON.parse(fileData);

      const updateUsersInfo = info => {
        const userIndex = usersInfo.findIndex(el => el.id === info.id);

        if (userIndex > -1) {
          usersInfo[userIndex] = info;
        }
      }

      if (Array.isArray(updatedInfo)) {
        updatedInfo.forEach(updateUsersInfo)
      }  else {
        updateUsersInfo(updatedInfo);
      }

      await writeUsersFile(filepath, usersInfo);
      res.end();
    } else if (method === 'DELETE' && isUsersPath) {
      const body = await readRequestBody(req);
      const deletedInfo = JSON.parse(body);

      const fileData = await readUsersFile(filepath);
      const usersInfo = JSON.parse(fileData);

      const deleteUsersInfo = info => {
        const userIndex = usersInfo.findIndex(el => el.id === info.id);

        if (userIndex > -1) {
          usersInfo.splice(userIndex, 1);
        }
      }

      if (Array.isArray(deletedInfo)) {
        deletedInfo.forEach(deleteUsersInfo)
      }  else {
        deleteUsersInfo(deletedInfo);
      }

      await writeUsersFile(filepath, usersInfo);
      res.end();
    } else {
      res.statusCode = '404';
      res.end('Not found');
    }
  } catch(err) {
    console.log('error', err)
    res.statusCode = '500';
    res.end('Something went wrong')
  }
});

server.listen(80, '127.0.0.1');
