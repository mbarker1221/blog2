const express = require('express');
const morgan = require('morgan');
const BlogPostsRouter = require('./router.js');
const app = express();
const router = express.Router();

app.use(morgan('common'));
app.use('/', BlogPostsRouter);

const {BlogPosts} = require('./models.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, closeServer, runServer} = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    })
    .on('error', err => {
      reject(err);
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
      
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
