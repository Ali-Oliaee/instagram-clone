module.exports = {
  locales: ['en', 'fa'],
  output: 'locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{ts,tsx}', '!src/**/__tests__/**'],
  defaultNamespace: 'common',
}
