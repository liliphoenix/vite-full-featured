---
# https://vitepress.dev/reference/default-theme-home-page
hero:
  name: 'vite-full-featured'
  text: '一款能满足大部分业务需求的框架'
  tagline: 规范化且十分好看的代码风格和提交信息，二次封装满足业务需要的axios请求，原子化css，极度优化的打包机制，i18n国际化、封装pinia+ali-oss业务请求、不同环境和业务之间联动
  actions:
    - theme: brand
      text: Markdown Examples
      text: 功能指南
      link: /markdown-examples
    - theme: alt
      text: API Examples
      text: 常见问题
      link: /api-examples
  features:
    - title: 细致到微的vite优化
    details: 压缩静态文件、cdn、svg优化、代码分割、alias封装、单文件or內联临界值、
    - title: 规范的代码风格和好看的提交规范
    details: eslint+prettier、husky+commitlint+cz-customable+git emoji 封装实现代码提交流程
  - title: 针对业务需求封装基础的业务代码
    details: ali-oss+pinia utils常用方法的封装 axios二次封装
