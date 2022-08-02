module.exports = {
  locales: ['en', 'fa'],
  output: 'locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{ts,tsx}'],
  defaultNamespace: 'common',
  createOldCatalogs: false,
}
