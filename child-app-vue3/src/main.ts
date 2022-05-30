// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";

// createApp(App).use(store).use(router).mount("#app");

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
