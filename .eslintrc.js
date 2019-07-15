module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "amd": true,
        "mocha": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "module": false, 
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        'no-console':0,
        'func-names': 0,
        "no-param-reassign": 0
        
    }
};