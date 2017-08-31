<template>
  <div @click="goTop" class="toTop" v-touch:press="onPress" :class='{"showToTop":(scrollTop >30)}'>
    <img src="static/toTop.png">
  </div>
</template>
<style lang="less">
  @import "~styles/fn/fn";

  .toTop {
    display: none;
    position: fixed;

    right: 10px;
    width: 48px;
    .bottom(54px);

    img {
      max-width: 100%;
    }
  }

  [data-dpr="2"] .toTop {
    width: 96px;
    right: 20px;
  }

  [data-dpr="3"] .toTop {
    width: 112px;
    right: 30px;
  }

  .showToTop {
    display: block;
  }
</style>
<script>
  import Toast from 'mint-ui/lib/toast'
  import store from 'flux'
  import AuthService from 'apis/utils/auth'

  export default{

    store: store,
    computed: {
      scrollTop: function () {
        let scrollTop = this.$store.state.app.scrollTop;

        return scrollTop;
      }
    },
    methods: {

      goTop(){
        document.body.scrollTop = 0;
      },
      onPress(){
        let agent = AuthService.getAgent();
        if (agent) {
          Toast({
            message: agent.agentName + ' - ' + agent.agentCode,
            position: 'top',
            duration: 5000
          })
        }
      }
    }
  }
</script>
