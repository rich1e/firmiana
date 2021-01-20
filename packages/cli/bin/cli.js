#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const enhanceErrorMessagees = require('../lib/utils/enhanceErrorMessages')

program
  .usage('<command> [options]')
  .version(`Version is ${require('../package.json').version}`, '-v, --version')
  .description('A simple CLI for building initialize project include Wechat applet, Vue, Egg (nodejs)')

/**
 * 创建和初始化项目
 */
program
  .command('init <project-name> [template-name]')
  .description('Create and initialize the project')
  .option('-n, --no-git', 'Skip git initialization')
  .option('-r, --remote', 'Generate a project from a remote template')
  .option('-p, --preset', 'Generate a project from a preset template')
  .action((projectName, templateName, options) => {
    require('../lib/init')(projectName, templateName, options)
  })

/**
 * 创建各类项目插件
 * project: firmin-project-name
 * plug-in: firmin-plugin-name
 * module: firmin-module-name
 */
program
  .command('create <project-name> [template-name]')
  .description('Create a variety of project plug-ins')
  .option('-n, --no-git', 'Skip git initialization')
  .option('-P, --project', 'Create a project')
  .option('-p, --plugin', 'Create a plug-in')
  .option('-m, --module', 'Create a module')
  .action((projectName, templateName, options) => {
    require('../lib/create')(projectName, templateName, options)
  })

/**
 * 展示预设模板
 */
program
  .command('list').alias('ls')
  .description('List all project templates')
  .option('-P, --project', 'Showcase the project templates')
  .option('-p, --plugin', 'Showcase the plug-in templates')
  .option('-m, --module', 'Showcase the module templates')
  .action((options) => {
    require('../lib/list')(options)
  })

/**
 * 添加命令
 */
program
  .command('append <plugin-name>').alias('add')
  .description('Add a plug-in')
  .option('-f, --force', 'Forced addition')
  .action((pluginName, options) => {
    require('../lib/add')(pluginName, options)
  })

/**
 * 删除命令
 */
program
  .command('delete <plugin-name>').alias('del')
  .description('Remove a plug-in')
  .option('-f, --force', 'Forced deletion')
  .action((pluginName, options) => {
    require('../lib/del')(pluginName, options)
  })

/**
 * 项目配置命令
 */
program
  .command('config <key-value>')
  .description('The project configuration command')
  .option('-l, --list', 'Show configuration information')
  .option('--get', 'Get configuration information')
  .option('--set', 'Set up configuration information')
  .action((keyName, options) => {
    require('../lib/config')(keyName, options)
  })

/**
 * 查询命令
 */
program
  .command('info <plugin-name>')
  .description('Plug-in query commands')
  .action((pluginName) => {
    require('../lib/info')(pluginName)
  })

// 非法处理
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(' ' + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

// 帮助信息
program
  .on('--help', () => {
    console.log()
    console.log(` Run ${chalk.cyan(`firmin <command> --help`)} for detailed usage of given command.`)
    console.log()
  })

program.commands.forEach(c => c.on('--help', () => console.log()))

enhanceErrorMessagees('missingArgument', argName => {
  return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
})

enhanceErrorMessagees('unknownOption', optionName => {
  return `Unknown option ${chalk.yellow(`<${optionName}>`)}.`
})

enhanceErrorMessagees('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${chalk.yellow(`<${option.flags}>`)}` + (
    flag ? `, got ${chalk.yellow(flag)}` : ''
  )
})

program.parse(process.argv)

if(!process.argv.slice(2).length) {
  program.outputHelp()
}
