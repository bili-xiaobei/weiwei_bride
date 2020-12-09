<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  .title{
      background-color: rgba(255, 255, 255, 0.6);
      border: 0;
      .van-nav-bar__title{
          font-size: 18px;
          font-weight: 600;
          color: #353535;
          letter-spacing: 2px;
      }
  }
  .navFooter{
      background-color: rgba(255, 255, 255, 0.6);
  }
  .van-tabbar-item--active{
      background-color: rgba(255, 255, 255, 0.2);
  }
  .van-tabs__wrap{
      height: 0 !important;
      background-color: transparent;
  }
</style>
