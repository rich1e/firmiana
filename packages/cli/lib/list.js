'use strict';

async function list(options) {
  console.log(`// To be completed`)
  const {project, plugin, module} = options

  if (project) {
    console.log(`options: project`)
  } else if (plugin) {
    console.log(`options: plugin`)
  } else if (module) {
    console.log(`options: module`)
  }
}

module.exports = (options) => {
  return list(options).catch(err => {
    console.log(`create.js # ${err}.`)
    process.exit(1)
  })
}
