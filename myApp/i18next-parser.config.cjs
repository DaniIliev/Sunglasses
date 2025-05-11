module.exports = {
    locales: ['eng', 'bg'],
    defaultNamespace: 'translation',
    // output: 'public/locales/$LOCALE/$NAMESPACE.json',
    // output: 'src/locales/$LOCALE/$NAMESPACE.json',
    output: 'src/locales/$LOCALE.json', 
    createOldCatalogs: false,
    lexers: {
      js: ['JavascriptLexer'],
      jsx: ['JsxLexer'],
    },
    keySeparator: '.', // keys like 'home.title'
    namespaceSeparator: ':',
    useKeysAsDefaultValue: true,
  };
  