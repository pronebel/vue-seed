<template>
  <div class="error-tips">
    <a href="javascript:;" class="logo">
    </a>
    <img src="./imgs/error.png">
    <h2>咦～页面不见了～</h2>
    <p>请核对您输入的页面地址是否正确哦~</p>

  </div>
</template>
<style lang="less">

  @import "~styles/fn/fn";

  .error-tips {
    width: 100%;
    height: 440px;
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 1;
    margin: -220px auto 0;
    line-height: 40px;
    text-align: center;
  }

  .error-tips img {
    margin: 10px auto;
    width:60%;
  }

  .error-tips .logo {
    display: block;
    margin-right: 10px;
  }

  .error-tips .logo img {
    margin-right: 20px;
  }

  .error-tips h2 {
    color: #000;
    .font-dpr(24px);
  }

  .error-tips p {
    color: #6d6d6d;
    .font-dpr(14px);
  }

  .error-tips .btn {
    display: inline-block;
    color: #fff;
    .font-dpr(20px);
    background-color: #3D88F3;
    text-decoration: none;
    padding: 5px 80px;
    border-radius: 5px;
    margin-top: 30px;
  }
</style>
<script type="es6">

  export default{
    data(){
      return {}
    },
    components: {}
  }
</script>
