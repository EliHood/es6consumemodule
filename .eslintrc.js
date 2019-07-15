module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "amd": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
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
        'no-console':0
    }
};