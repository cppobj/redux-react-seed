module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb"
  ],
  "plugins": [
    "react",
    "import"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "arrow-body-style": ["error", "always"]
  },
  "env": {
    "browser": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  }
};
