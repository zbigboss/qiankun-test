# child-app-vue3
> 微前端，子应用，使用 vue3 版本的 ts 写法

### 准备工作

- 修改 src/shims-vue.d.ts，消除 ts 的语法报错
```typescript
interface Window {
  __POWERED_BY_QIANKUN__: boolean;
}
```

- 增加 .eslintignore ，消除 vue.config.js 报错
```
/vue.config.js
```

- 安装 qiankun，引用声明消除报错
```
yarn add -D qiankun
```

### 开始配置

- 新增 src/public-path.js 文件
```javascript
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

- 新增 vue.config.js 文件
```javascript
const { name } = require('./package');
module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
```

- 路由文件修改 src/router/index.ts，注意路径的修改，根据主应用的设置，可以抽取放到 .env 配置文件
```typescript
const router = createRouter({
  history: createWebHistory(
    (window.__POWERED_BY_QIANKUN__ ? "/child-app-vue3" : "") + process.env.BASE_URL
  ),
  routes,
});
```

- main.ts 文件修改
```typescript
import "./public-path.js";
import { createApp, App as IApp, ComponentPublicInstance } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { LifeCycleFn } from "qiankun";

type LifeCycle = LifeCycleFn<Record<string, unknown>>;

let app: IApp;
let instance: ComponentPublicInstance;

// LoadableApp 声明不完善，只能先用 any
function render(props: any) {
  const { container } = props;
  app = createApp(App);
  instance = app
    .use(store)
    .use(router)
    .mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export const bootstrap: LifeCycle = async () => {
  console.log("[vue] vue app bootstraped");
};

export const mount: LifeCycle = async (props) => {
  console.log("[vue] props from main framework", props);
  render(props);
};

export const unmount: LifeCycle = async () => {
  app.unmount();
  // 不确定是否需要以下代码
  instance.$el.innerHTML = "";
};
```

## 参考
[【微前端】Qiankun Vue3 配置](https://juejin.cn/post/7020804188321873950)

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
