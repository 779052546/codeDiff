// module.exports = {
//     "extends": "standard",
// };
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error",4],
        "quotes": ["error","single"],
        "semi": ["error","never"],
        "linebreak-style": [0 ,"error", "windows"],
        "camelcase": 2,
        "curly": 2,
        "brace-style": [2, "1tbs"],
        "quotes": [2, "single"],
        "semi": [2, "always"],
        "space-infix-ops": 2,
        'no-console': 'off',
        "no-unused-vars": 'off',
        "no-redeclare": 'off',
        "camelcase":'off',
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
    }
  }
    