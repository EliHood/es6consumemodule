import * as myModule from './src/'

const url = 'https://jsonplaceholder.typicode.com/posts';
const value = {name:"Bob", job:'Software Dev'};
const config = {
    method: 'POST',
    url:url,
    data: {...value},
    headers: {'X-Custom-Header': 'foobar'}
}

const test = myModule.fetch(config).then( res => {
    console.log(res.data)
}).catch(err => {
    console.log(`error here ${err}`);
})


console.log(test);