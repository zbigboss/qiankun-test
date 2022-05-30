<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h3 style="color: red;">父组件传过来的token：{{token}}</h3>
    <button @click="toVueThree">vue3</button>
    <button @click="toReact">react</button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

import actions from "@/shared/actions";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      token: null,
    }
  },
  mounted() {
    actions.onGlobalStateChange(async (state) => {
      const { token } = state;
      // 未登录 - 返回主页
      if (!token) {
        console.log("未检测到登录信息！");
        // 应用间转跳
        // return window.history.pushState({}, '', '/');
        return (
          setTimeout(() => {
            window.history.pushState({}, '', '/');
          }, 1000)
        )
      }
      console.log('子应用顺利获取token')
      this.token = token

      // // 获取用户信息
      // this.getUserInfo(token);
    }, true);
  },
  methods: {
    toVueThree() {
      window.history.pushState({}, '', '/child-app-vue3');
    },
    toReact() {
      window.history.pushState({}, '', '/child-app-react/home');
    }
  }
};
</script>
