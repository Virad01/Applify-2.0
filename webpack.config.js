const path = require('path');

module.exports = {
  entry: './Chrome Xtention Files/Copyof Current UI/appTable.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};