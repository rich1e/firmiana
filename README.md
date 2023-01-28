<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-09 17:45:27
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-28 17:01:57
 * @FilePath: /firmiana/README.md
 * @Description:
 *
-->
# firmiana

> // TODO

## Directory

```
.
├── packages
│  ├── cli
│  ├── dynamic-form
│  ├── form-plux
│  └── use
├── LICENSE
├── package.json
├── tsconfig.json
├── README.md
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Dev

```sh
# 执行 dynamic-form 项目下的 dev:mock 命令
pnpm --filter dynamic-form dev:mock
# 包路径为packages/packageA的包添加axios
pnpm i axios -C packages/packageA
# 给包名（package.json中那name字段）为packageName的包添加axios依赖
pnpm i axios --filter packageName
# 将 axios 安装到根目录
pnpm i axios -w
# 包pkg1依赖本地的pkg2，使用workspace协议安装
pnpm i pkg2@workspace --filter pkg1
```

## Plan

- [ ] pnpm / vite
- [ ] element plus
- [ ] thress.js
- [ ] typescript
- [ ] vuepress | vitepress
- [ ] storybook
- [ ] eslint / commitlint
- [ ] blog
- [ ] vitest
