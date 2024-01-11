# Vue 3 + TypeScript + Vite 框架完善

## Eslint 配置踩坑 Vue3+Typescript+Vite

1.  `npx eslint --init`

    2.不识别.vue文件
    parserOptions中添加 扩展名 .vue(数组)
    `"extraFileExtensions":['.vue']`
    给eslint添加vue-eslint-parser
    _这里ts的parser和vue的pareser要分开_
    parserOptions中parser中添加 ts解析
    在外部parser中添加vue-eslint-parser

    3.给tsconfig.json中添加不能识别的后缀名

    4.添加eslintignore，忽略不被eslint所解析的文件

## 老生常谈的解决 eslint和prettier的冲突问题

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
