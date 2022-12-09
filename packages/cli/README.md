<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-09 18:00:07
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-09 18:03:11
 * @FilePath: /firmiana/packages/cli/README.md
 * @Description:
 *
-->
# @firmiana/cli

> 端到端的全栈研发工具。无需配置，开箱即用，提供沉浸式的开发体验。

## Usage

**init** `[options]` `<project-name>` `[template-name | preset-name | repo-remote-url]`

创建和初始化项目

- -n, --no-git: 跳过 git 初始化
- -r, --remote: 获取远程项目模板
- -p, --preset: 获取预设项目模版

**create** `[options]` `<project-name>`

创建各类项目插件

- -n, --no-git: 跳过 git 初始化
- -P, --project: 创建项目模版
- -p, --plugin: 创建插件模版
- -m, --module: 获取模块模版

**list** `[options]`

展示模板

- -P, --project: 展示项目模版
- -p, --plugin: 展示插件模版
- -m, --module: 展示模块模版

**append** `[options]` `<plugin-name>`

添加插件

- -f, --force: 强制添加

**delete** `[options]` `<plugin-name>`

删除插件

- -f, --force: 强制删除

**config** `[options]` `<key-value>`

项目配置

- -l, --list: 展示项目配置
- --get: 获取项目配置
- --set: 设置项目配置

**info** `<plugin-name>`

查询插件信息
