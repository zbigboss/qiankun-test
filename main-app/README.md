# my-app
> 微前端改造
- 主应用（基座），安装乾坤
```bash
yarn add qiankun
```
- src/main.js 的修改，加入乾坤配置
```javascript
import { registerMicroApps, start } from "qiankun";

registerMicroApps([
  {
    name: 'child-app-vue',
    entry: '//localhost:3000',
    container: '#vue-app',
    activeRule: '/child-app-vue',
  },
]);

start();
```
- src/app.vue 的修改，修改注入的 DOM 节点
``` html
<div id="vue-app"></div>
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
