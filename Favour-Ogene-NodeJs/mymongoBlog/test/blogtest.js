const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

describe ('blogtest', function(){
    it('should add', function (done) {
        assert.equal(1+1 ,2);
        done();
    });
    it('it should two stringd correctly',function(done){
        assert.equal("dayo"+"ray", "dayoray");
        done();
    })
    it ('should create blog',function(done){
        let blog ={
            title:'class Awesome',
            author:'Temi',
            content:'pay attention to details'
        }
        request(app)  
          .post('/blog/create')
          .send(blog)
          .set('Accept','application/json')
          .expect(201)
          .end(function(err,res){
              if (err) return done(err);
              console.log(res.body);
              assert.equal(res.body._id.length,24);
              done();
          });
    })
});