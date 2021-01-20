'use strict';

async function del(pluginName, options) {
  console.log(`// To be completed`)
  const {force} = options
  console.log(`pluginName: ${pluginName} | options: ${force}`)
}

module.exports = (pluginName, options) => {
  return del(pluginName, options).catch(err => {
    console.log(`delete.js # ${err}.`)
    process.exit(1)
  })
}
