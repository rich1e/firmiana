'use strict';

async function create(projectName, templateName, options) {
  console.log(`// To be completed`)
  console.log(`projectName: ${projectName} | templateName: ${templateName}`)
  const {git, project, plugin, module} = options

  if (git) {
    console.log(`options: no-git`)
  } else if (project) {
    console.log(`options: project`)
  } else if (plugin) {
    console.log(`options: plugin`)
  } else if (module) {
    console.log(`options: module`)
  }
}

module.exports = (projectName, templateName, options) => {
  return create(projectName, templateName, options).catch(err => {
    console.log(`create.js # ${err}.`)
    process.exit(1)
  })
}
