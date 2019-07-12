### npm link from root folder, then cd client

```
 sudo npm i /Users/elihood/nodework/elifetchModes6
```

```
npm link
```

###

### To use

```js
import * as consume from "elifetchmodes6";
```

#### Accepts POST, GET, PUT, DELETE

### GET

```js
const object = {
  method: "GET",
  url: "https://jsonplaceholder.typicode.com/posts/1"
};
consume
  .fetch(object)
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err);
  });
```

### Or POST

```js
const value = { name: "Bob", job: "Software Dev" };
const object = {
  method: "POST",
  url: "https://jsonplaceholder.typicode.com/posts",
  data: { ...value }
};
consume
  .fetch(object)
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err);
  });
```

### To Demo

```log
npm run demo
```
