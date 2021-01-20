'use strict';

async function init(projectName, templateName, options) {
  console.log(`// To be completed`)
  console.log(`projectName: ${projectName} | templateName: ${templateName}`)
  const {git, remote, preset} = options

  if (git) {
    console.log(`options: no-git`)
  } else if (remote) {
    console.log(`options: remote`)
  } else if (preset) {
    console.log(`options: preset`)
  }
}

module.exports = (projectName, templateName, options) => {
  return init(projectName, templateName, options).catch(err => {
    console.log(`init.js # ${err}.`)
    process.exit(1)
  })
}
