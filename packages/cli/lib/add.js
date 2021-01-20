'use strict';

async function add(pluginName, options) {
  console.log(`// To be completed`)
  const {force} = options
  console.log(`pluginName: ${pluginName} | options: ${force}`)
}

module.exports = (pluginName, options) => {
  return add(pluginName, options).catch(err => {
    console.log(`append.js # ${err}.`)
    process.exit(1)
  })
}
