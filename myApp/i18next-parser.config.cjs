// module.exports = {
//     locales: ['eng', 'bg'],
//     defaultNamespace: 'translation',
//     // output: 'public/locales/$LOCALE/$NAMESPACE.json',
//     // output: 'src/locales/$LOCALE/$NAMESPACE.json',
//     output: 'src/locales/$LOCALE.json', 
//     createOldCatalogs: false,
//     lexers: {
//       js: ['JavascriptLexer'],
//       jsx: ['JsxLexer'],
//     },
//     keySeparator: '.', // keys like 'home.title'
//     namespaceSeparator: ':',
//     useKeysAsDefaultValue: true,
//   };
module.exports = {
  locales: ['eng', 'bg'],
  defaultNamespace: 'translation',
  output: 'src/locales/$LOCALE.json', // Точно както го имаш
  createOldCatalogs: false,
  keySeparator: false, // 👈 ВАЖНО! Защото използваш обикновени ключове като "Sign in"
  namespaceSeparator: false, // 👈 Също важно, няма 'namespace:key'
  useKeysAsDefaultValue: true,
  lexers: {
    js: [{ lexer: 'JavascriptLexer', functions: ['t'] }],
    jsx: [{ lexer: 'JsxLexer', functions: ['t'] }],
  },
};
  