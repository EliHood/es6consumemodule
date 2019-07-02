import * as myModule from './src/'

const url = 'https://jsonplaceholder.typicode.com/posts/1';
const value = {name:"Bob", job:'Software Dev'};
const config = {
    method: 'GET',
    url:url,
    // data: {...value},
}

const test = myModule.fetch(config).then( res => {
    console.log(res)
}).catch(err => {
    console.log(`error here ${err}`);
})


console.log(test);