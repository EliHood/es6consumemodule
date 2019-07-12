import * as consume from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import chaiAsPromised from "chai-as-promised";
import { equal } from 'assert';
// import request from 'request';
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiAsPromised);
chai.should();
const assert = chai.assert;
describe('should test GET', () => {
    it('should test GET method', (done) => {
        const objectGet = {
            method: 'GET',
            url:'https://jsonplaceholder.typicode.com/posts/1',
        }
        consume.fetch(objectGet).then( (res) => { 
            done()  
            expect(res.logger[0].status).to.equal(200);
            expect(res.logger[0].method).to.equal('get');
        })
    })
    it('should test POST method', (done) => {
        const objectPOST = {
            method:'POST',
            url:'https://jsonplaceholder.typicode.com/posts',
            data: {name:"Bob"}
        }
        consume.fetch(objectPOST).then( (res) => {
            done();
            expect(res.logger[1].method).to.equal('post');
            expect(res.logger[1].status).to.equal(201);
        })
    })
})