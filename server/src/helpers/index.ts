const path = require('path');
const fs = require('fs');

const files = fs.readdirSync(__dirname);

const data = (files as Array<string>).reduce((acc, entityName) => {
  if (path.extname(entityName) !== '.ts') {
    acc[entityName] = require(`./${entityName}`);
  }

  return acc;
}, {} as Record<string, NodeJS.Require>)

module.exports = data;