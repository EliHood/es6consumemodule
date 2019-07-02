
### Install 

```
npm i elifetchmodes6
```
### To use 

```js
import * as consume from 'elifetchmodes6';
```

#### Accepts POST, GET, PUT, DELETE

### GET

```js
const object = {
    method: 'GET',
    url:'https://jsonplaceholder.typicode.com/posts/1',
}
consume.fetch(object)
```
### Or POST

```js
const value = {name:"Bob", job:'Software Dev'};
const object = {
    method:'POST',
    url:'https://jsonplaceholder.typicode.com/posts',
    data:{...value}
}
consume.fetch(object)
```

### To Demo


```log
npm start
```