module.exports = {
  extends: "@loopback/eslint-config",
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "semi": false,
        "trailingComma": "none",
        "tabWidth": 4,
        "arrowParens": "avoid",
        "printWidth": 120
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": [
          "classProperty",
          "objectLiteralProperty",
          "typeProperty",
          "classMethod",
          "objectLiteralMethod",
          "typeMethod",
          "accessor",
          "enumMember"
        ],
        "format": null,
        "modifiers": ["requiresQuotes"]
      }
    ]
  }
};
