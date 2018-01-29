const express = require('express');
const morgan = require('morgan');
const BlogPostsRouter = require('./router.js');
const app = express();
const router = express.Router();

app.use(morgan('common'));
app.use('/', BlogPostsRouter);

const {BlogPosts} = require('./models.js');

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

if (require.main === module) {
  runServer().catch(err => console.error(err));
};
