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

### 老生常谈的解决 eslint和prettier的冲突问题 ✅

### cz+commitlint+git-emoji 代码提交 ✅

### 提交前 husky 检查代码规范+format代码 ✅

### 支持scss代码 支持stylelint + prettier 修改scss ✅

### vite配置完善 alias proxy css... ✅

### prod dev test 环境变量配置支持 ✅

### axios二次封装 + mock ✏️✏️✏️

### common css封装 + 常用css方法封装 ✏️✏️✏️

### pinia 完善配置 ✏️✏️✏️

### vue-router 完善配置 ✏️✏️✏️

### utils 常见方法的封装 ✏️✏️✏️

### i18n 多语言配置 ✏️✏️✏️

自动规范化和简洁化代码提交
`npm run commit`
