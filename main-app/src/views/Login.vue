<template>
  <div class="login">
    <button @click="login">login</button>
    <button @click="loginWithoutToken">login without token</button>
  </div>
</template>

<script>
import actions from "@/shared/actions";

export default {
  name: "Login",
  mounted() {
    // 注册一个观察者函数
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log("主应用观察者：token 改变前的值为 ", prevState.token);
      console.log(
        "主应用观察者：登录状态发生改变，改变后的 token 的值为 ",
        state.token
      );
    });
  },
  methods: {
    login() {
      console.log('login')
      actions.setGlobalState({
        token: 'this-is-test-token-' + new Date().getTime()
      })
      window.history.pushState({}, '', '/child-app-vue/');
    },
    loginWithoutToken() {
      window.history.pushState({}, '', '/child-app-vue/');
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
}
</style>