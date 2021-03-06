import chai from 'chai';
import chaiHttp from 'chai-http';
import * as consume from '../index';
// import request from 'request';
const { expect } = chai;
chai.use(chaiHttp);
chai.should();
describe('should test methods', () => {
  it('should test GET method', (done) => {
    const objectGet = {
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
    };
    consume.fetch(objectGet).then((res) => {
      done();
      expect(res.logger[0].status).to.equal(200);
      expect(res.logger[0].method).to.equal('get');
      expect(res.logger[0].url).to.include('https://jsonplaceholder.typicode.com');
    });
  });
  it('should test POST method', (done) => {
    const objectPOST = {
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data: { name: 'Bob' },
    };
    consume.fetch(objectPOST).then((res) => {
      done();
      expect(res.logger[1].method).to.equal('post');
      expect(res.logger[1].status).to.equal(201);
      expect(res.logger[1].url).to.include('https://jsonplaceholder.typicode.com');
    });
  });
  it('should test PUT method', (done) => {
    const objectPut = {
      method: 'put',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      data: { name: 'Bob' },
    };
    consume.fetch(objectPut).then((res) => {
      done();
      expect(res.logger[2].method).to.equal('put');
      expect(res.logger[2].status).to.equal(200);
      expect(res.logger[2].url).to.include('https://jsonplaceholder.typicode.com');
    });
  });
  it('should test DELETE method', (done) => {
    const objectDelete = {
      method: 'delete',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      data: { name: 'Bob' },
    };
    consume.fetch(objectDelete).then((res) => {
      done();
      expect(res.logger[3].method).to.equal('delete');
      expect(res.logger[3].status).to.equal(200);
      expect(res.logger[3].url).to.include('https://jsonplaceholder.typicode.com');
    });
  });
});
