'use strict';

async function config(keyName, options) {
  console.log(`// To be completed`)

  const {list, get, set} = options

  if (list) {
    console.log(`keyName: ${keyName} | options: list`)
  } else if (get) {
    console.log(`keyName: ${keyName} | options: get`)
  } else if (set) {
    console.log(`keyName: ${keyName} | options: set`)
  }
}

module.exports = (keyName, options) => {
  return config(keyName, options).catch(err => {
    console.log(`config.js # ${err}.`)
    process.exit(1)
  })
}
