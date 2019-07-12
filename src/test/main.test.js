import * as consume from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from "chai-as-promised";
// import request from 'request';
const expect = chai.expect;


chai.use(chaiHttp);
chai.use(chaiAsPromised);
chai.should();

const assert = chai.assert;

describe('should test GET', () => {
    it('should test GET method', async (done) => {
        const object = {
            method: 'GET',
            url:'https://jsonplaceholder.typicode.com/posts/1',
        }
        const data = consume.fetch(object).then( res => {
            return res.data
        });
        expect(data).to.be.a('object');
    //    const ourData = consume.fetch(object)
    //    return assert.isFulfilled(ourData, "optional message");
    })
} )