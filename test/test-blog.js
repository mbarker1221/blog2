const chai = require('chai');
const chaiHttp = require('chai-http');
const expect=chai.expect;

const {app, runServer, closeServer} = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('BlogPosts', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should list blog titles on GET', function() {
   
    return chai.request(app)
      .get('/BlogPosts')
      .then(function(res) {

        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length.of.at.least(1);
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys('title', 'content', 'author');
        });
      });
  });

  it('should add a blog post on POST', function() {
    const newBlog = { title: 'my blog', body: ['It was just another day at the office...'], author: 'M.Barker'};
    return chai.request(app)
      .post('/BlogPosts')
      .send(newBlog)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('title', 'content', 'author');
        res.body.title.should.equal(newBlog.title);
        res.body.content.should.be.a('array');
      });
  });

  it('should update blog on PUT', function() {

    const updateData = {
      title: 'foo',
      content: ['bizz', 'bang'],
      author: 'me'
    };

    return chai.request(app)
     
      .get('/BlogPosts')
      .then(function(res) {
        updateData.id = res.body[0].id;

        return chai.request(app)
          .put(`/BlogPosts/${updateData.id}`)
          .send(updateData)
      })
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        //res.body.should.be.a.('object');
        res.boyd.should.include.keys('title', 'content', 'author');
      });
  });

  it('should delete blog on DELETE', function() {
    return chai.request(app)
     
      .get('/BlogPosts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/BlogPosts/${res.body[0].id}`)
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });
});