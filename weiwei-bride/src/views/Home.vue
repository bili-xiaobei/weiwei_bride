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
                <shop-cart />
            </van-tab>
            <van-tab>
                <my />
            </van-tab>
        </van-tabs>
        <div v-show="topShow" class="go_top" @click="goTop"></div>
        <van-tabbar
            v-model="active"
            class="navFooter"
            :active-color="navActive"
            :inactive-color="navInactive"
        >
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="hot-o">美拍</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import Index from "./Index.vue";
import Meipai from "./Meipai.vue";
import Strategy from "./Strategy.vue";
import My from "./My.vue";
import ShopCart from "./ShopCart.vue";
import style from "../../public/css/_variable.scss";
export default {
    created() {
        this.navActive = style.navColor;
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll); // 监听滚动的高度
        this.judge();
    },
    data() {
        return {
            active: 0,
            navActive: style.navColor,
            navInactive: "#00000099",
            topShow: false, // 返回顶部文字是否显示
        };
    },
    components: {
        Index,
        Meipai,
        Strategy,
        My,
        ShopCart
    },
    methods: {
        // 监控页面滚动高度
        handleScroll() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop > 200) {
                this.topShow = true; // 滚动高度大于200时，显示返回顶部按钮
            } else if (scrollTop < 200) {
                this.topShow = false; // 滚动高度小于200时，隐藏返回顶部按钮
            }
        },
        // 反击返回顶部的方法
        goTop() {
            // document.documentElement.scrollTop = document.body.scrollTop = 0;
            let top =
                document.documentElement.scrollTop || document.body.scrollTop;
            // 实现过度滚动效果
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 100;
                if (top <= 0) {
                    clearInterval(timeTop);
                }
            }, 10);
        },
        // 通过计算来进行页面的跳转
        judge() {
            let startX = 0;
            let startY = 0;
            let endX = 0;
            let endY = 0;
            // 获取要触发事件的标签
            let body = document.body || document.documentElement;
            body.addEventListener(
                "touchstart",
                (el) => {
                    // touches 点击屏幕时
                    startX = parseInt(el.touches[0].pageX);
                    startY = parseInt(el.touches[0].pageY);
                    // console.log(startX, startY)
                },
                false
            );
            body.addEventListener(
                "touchend",
                (el) => {
                    // changedTouches 离开屏幕时
                    endX = parseInt(el.changedTouches[0].pageX);
                    endY = parseInt(el.changedTouches[0].pageY);
                    // console.log(endX, endY);
                    if (endX - startX > 150) {
                        // console.log('向右滑动')
                        if (this.active <= 0) return;
                        else this.active--;
                    } else if (startX - endX > 150) {
                        // console.log('向左滑动')
                        if (this.active >= 3) return;
                        else this.active++;
                    }
                },
                false
            );
        },
    },
};
</script>

<style lang="scss">
.home {
    .go_top {
        position: fixed;
        width: 1rem;
        height: 1rem;
        right: 10px;
        bottom: 70px;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $bgColor;
        border-radius: 50%;
        transition: all 0.5s;
        &::after {
            content: "Top";
            display: block;
        }
    }
    .van-tabs__wrap {
        height: 0;
        background-color: transparent;
    }
    // background-image: url(../assets/indexBGM.jpg);
    background-color: rgba(204, 204, 204, 0.6);
    background-size: cover;
    background-attachment: fixed;
    .all_style {
        padding-bottom: 50px;
        // box-sizing: border-box;
        min-height: 100vh;
        // background-color: rgba(255, 255, 255, 0.6);
    }
    .title {
        background-color: $bgColor;
    }
    .van-nav-bar__title {
        font-weight: 900;
    }
    .navFooter {
        background-color: $bgColor;
        .van-tabbar-item--active {
            background-color: rgba(255, 255, 255, 0.5);
        }
    }
}
</style>