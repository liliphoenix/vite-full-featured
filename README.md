# Vue 3 + TypeScript + Vite脚手架 ----->>>>个人工作流 💎💎💎

基于vite-vue3脚手架，首次搭建自己的工作流，实现代码风格 提交规范的配置 🎉🎉🎉

`npm install`
`npm run dev`

## Eslint 配置踩坑 Vue3+Typescript+Vite 🔥🔥🔥

1.  `npx eslint --init` 2.不识别.vue文件
    parserOptions中添加 扩展名 .vue(数组)
    `"extraFileExtensions":['.vue']`
    给eslint添加vue-eslint-parser
    _这里ts的parser和vue的pareser要分开_
    parserOptions中parser中添加 ts解析
    在外部parser中添加vue-eslint-parser

    3.给tsconfig.json中添加不能识别的后缀名

    4.添加eslintignore，忽略不被eslint所解析的文件

## 老生常谈的解决 eslint和prettier的冲突问题

## 代码提交 🚀🚀🚀

自动规范化和简洁化代码提交
`npm run commit`

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS
