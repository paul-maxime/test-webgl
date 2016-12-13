module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "off"
        ]
    },
    "globals": {
        "mat2": false,
        "mat2d": false,
        "mat3": false,
        "mat4": false,
        "quat": false,
        "vec2": false,
        "vec3": false,
        "vec4": false
    }
};