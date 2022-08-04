module.exports = {
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime']
    }
  },
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {
      runtime: 'automatic'
    }],
    '@babel/preset-typescript'
  ]
}
