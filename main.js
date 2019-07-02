import * as myModule from './src/'

const url = 'https://jsonplaceholder.typicode.com/posts';
const value = {name:"Bob", job:'Software Dev'};
const config = {
    method: 'GET',
    url:url,
    // data: {...value},
}

const config2 = {
    method: 'POST',
    url:url,
    data: {...value},

}


const test = myModule.fetch(config).then( res => {
    console.log(res)
}).catch(err => {
    console.log(err);
})

const test2 = myModule.fetch(config2).then( res => {
    console.log(res)
}).catch(err => {
    console.log(err);
})



console.log(test + test2);