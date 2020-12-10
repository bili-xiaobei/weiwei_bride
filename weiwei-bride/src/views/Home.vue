<template>
    <div class="home">
        <van-nav-bar class="title" title="首页" fixed/>
        <!-- 这里用来存放店里不同的导航进行显示不同的界面 -->
        <van-tabs v-model="active" class="all_style">
            <router-view />
        </van-tabs>
        <van-tabbar v-model="active" class="navFooter">
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="hot-o">美拍</van-tabbar-item>
            <van-tabbar-item icon="coupon-o">攻略</van-tabbar-item>
            <van-tabbar-item icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    created(){
        // this.$axios.get('/meipai/all').then(res => {
        //     console.log(res);
        // })
    },
    data(){
        return {
            active: 0,
        }
    }
}
</script>

<style lang="scss">
    .home{
        background-image: url(../assets/image01.jpg);
        background-size: 100% cover;
        background-attachment: fixed;
        .all_style{
            padding-top: 46px;
            padding-bottom: 50px;
            background-color: rgba(255, 255, 255, 0.6);
        }
        .title{
            background-color: rgba(255, 255, 255, 0.6);
        }
        .van-nav-bar__title{
            font-weight: 600;
        }
        .navFooter{
            background-color: rgba(255, 255, 255, .7);
        }
    }
</style>