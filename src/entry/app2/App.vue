<template>
  <div class="page-app">
    <transition name="slide-fade">
      <div class="page-router-view">
        <keep-alive>
          <router-view  v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view  v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </transition>
  </div>
</template>
<script type="es6">

  import store from 'flux'
  import Layout from 'utils/help/layout'



  export default {
    data () {
      return {


      }
    },
    methods: {

    },
    created: function () {

    },
    mounted(){


    },
    computed: {},
    components: {

    }
  }
</script>
