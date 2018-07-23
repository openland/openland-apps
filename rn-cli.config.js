var path = require('path');

module.exports = {
  getProjectRoots() {
    return [
      // path.resolve(__dirname, './build/native/openland-api'),
      path.resolve(__dirname, './build/native'),
      path.resolve(__dirname, '.')
    ];
  },
};