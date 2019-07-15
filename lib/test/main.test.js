"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var consume = _interopRequireWildcard(require("../index"));

// import request from 'request';
var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('should test methods', function () {
  it('should test GET method', function (done) {
    var objectGet = {
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts/1'
    };
    consume.fetch(objectGet).then(function (res) {
      done();
      expect(res.logger[0].status).to.equal(200);
      expect(res.logger[0].method).to.equal('get');
      expect(res.logger[0].url).to.include('https://jsonplaceholder.typicode.com');
    });
  });
  it('should test POST method', function (done) {
    var objectPOST = {
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data: {
        name: 'Bob'
      }
    };
    consume.fetch(objectPOST).then(function (res) {
      done();
      expect(res.logger[1].method).to.equal('post');
      expect(res.logger[1].status).to.equal(201);
      expect(res.logger[1].url).to.include('https://jsonplaceholder.typicode.com');
    });
  });
  it('should test PUT method', function (done) {
    var objectPut = {
      method: 'put',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      data: {
        name: 'Bob'
      }
    };
    consume.fetch(objectPut).then(function (res) {
      done();
      expect(res.logger[2].method).to.equal('put');
      expect(res.logger[2].status).to.equal(200);
      expect(res.logger[2].url).to.include('https://jsonplaceholder.typicode.com');
    });
  });
  it('should test DELETE method', function (done) {
    var objectDelete = {
      method: 'delete',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      data: {
        name: 'Bob'
      }
    };
    consume.fetch(objectDelete).then(function (res) {
      done();
      expect(res.logger[3].method).to.equal('delete');
      expect(res.logger[3].status).to.equal(200);
      expect(res.logger[3].url).to.include('https://jsonplaceholder.typicode.com');
    });
  });
});