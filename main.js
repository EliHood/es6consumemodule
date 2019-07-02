import * as myModule from './index';

const url = 'https://jsonplaceholder.typicode.com/posts/1';
const value = {name:"Bob", job:'Software Dev'};
const config = {
    method: 'GET',
    url:url,
    data: {...value},

}
const test = myModule.fetch(config);
console.log(test);