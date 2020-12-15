<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="scss">
.title {
    // background-color: rgba(255, 255, 255, 0.8);
    background-color: transparent;
    // border: 0 !important;
    .van-nav-bar__title {
        font-size: 18px;
        font-weight: 600;
        color: #353535;
        letter-spacing: 2px;
    }
}
.navFooter {
    background-color: rgba(255, 255, 255, 0.6);
}
.van-tabbar-item--active {
    background-color: rgba(255, 255, 255, 0.2);
}
.van-pull-refresh__text,
.van-loading,
.van-loading__text {
    color: $bgColor !important;
}
</style>
