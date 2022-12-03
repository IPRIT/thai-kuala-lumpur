module.exports = {
  minified: false,
  inputSourceMap: true,
  sourceMaps: true,
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@server': './build/src'
        }
      }
    ]
  ]
};
