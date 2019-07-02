
### Install 

```
npm i elifetchmodes6
```
### To use 

```diff
import * as consume from 'elifetchmodes6';
```

#### Accepts POST, GET, PUT, DELETE

### GET

```diff
const object = {
    method: 'GET',
    url:'https://jsonplaceholder.typicode.com/posts/1',
}
consume.fetch(object)
```
### Or POST

```diff
const value = {name:"Bob", job:'Software Dev'};
const object = {
    method:'POST',
    url:'https://jsonplaceholder.typicode.com/posts',
    data:{...value}
}
consume.fetch(object)
```

