const { Command } = require('commander')
const chalk = require('chalk')
const banner = require('./banner')

module.exports = (methodName, log) => {
  Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return false;
    }
    console.log()
    banner()
    console.log()
    this.outputHelp()
    console.log(' ' + chalk.red(log(...args)))
    console.log()
    process.exit(1)
  }
}
