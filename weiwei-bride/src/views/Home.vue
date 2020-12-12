<template>
    <div class="home">
        <!-- 这里用来存放店里不同的导航进行显示不同的界面 -->
        <van-tabs v-model="active" class="all_style">
            <van-tab>
                <index />
            </van-tab>
            <van-tab>
                <meipai />
            </van-tab>
            <van-tab>
                <activity />
            </van-tab>
            <van-tab>
                <my />
            </van-tab>
        </van-tabs>
        <van-tabbar v-model="active" class="navFooter" :active-color="navActive" :inactive-color="navInactive">
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="hot-o">美拍</van-tabbar-item>
            <van-tabbar-item icon="coupon-o">攻略</van-tabbar-item>
            <van-tabbar-item icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import Index from './Index.vue';
import Maipei from './Meipai.vue';
import Strategy from './Strategy.vue';
import My from './My.vue';
import style from '../../public/css/_variable.scss';
export default {
    created() {
        this.navActive = style.navColor
    },
    data() {
        return {
            active: 0,
            navActive: style.navColor,
            navInactive: "#00000099",
        };
    },
    components: {
        Index: Index,
        Maipei: Maipei,
        Strategy: Strategy,
        My: My
    }
};
</script>

<style lang="scss">
.home {
    // background-image: url(../assets/indexBGM.jpg);
    background-color: rgb(17, 17, 17);
    background-size: cover;
    background-attachment: fixed;
    .all_style {
        padding-bottom: 50px;
        // box-sizing: border-box;
        min-height: 100vh;
        background-color: rgba(255, 255, 255, 0.6);
    }
    .title {
        background-color: rgba(255, 255, 255, 0.6);
    }
    .van-nav-bar__title {
        font-weight: 900;
    }
    .navFooter {
        background-color: rgba(255, 255, 255, 0.7);
    }
}
</style>