const express = require('express');
const morgan = require('morgan');



const BlogPostsRouter = require('./router.js');
const app = express();
const router = express.Router();

app.use(morgan('common'));
app.use('/', BlogPostsRouter);

//const {BlogPosts} = require('./models.js');


app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port $ {process.env.PORT || 8080}`);
});