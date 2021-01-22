const figlet = require('figlet')
const chalk = require('chalk')

/**
 *  @see https://www.npmjs.com/package/figlet
 */
module.exports = () => {
  return console.log(chalk.greenBright(figlet.textSync('Firmiana', {
    font: 'Ghost',
    horizontalLayout: 'controlled smushing',
    verticalLayout: 'default',
    width: 120,
    whitespaceBreak: false
  })))
}
