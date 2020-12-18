<template>
    <div class="goods">
        <van-nav-bar
        left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            fixed
        >
        <input type="text">
        </van-nav-bar>
        <div class="activaty">
            <router-link :to="'/banner_goods/' + item.hid" class="wrap" v-for="item in good_list" :key="item.hid">
                <!-- <img v-lazy="item.h_photos" /> -->
                <div
                    class="image"
                    v-lazy:background-image="item.h_photos"
                ></div>
                <div class="attribute">
                    <span class="good_title"
                        ><span>微微新娘</span>{{ item.h_title }}</span
                    >
                    <span class="good_style"> 尺寸：S M | 颜色：白色 </span>
                    <span class="price">
                        ¥<span class="price_color">
                            {{ item.h_price }}
                            <span class="del" v-if="item.hid % 3 == 0"
                                >券前{{ parseInt(item.h_price * 1.1) }}</span
                            >
                        </span>
                        {{ parseInt(Math.random() * 1000) }}人已付款
                    </span>
                    <div class="full_reduction" v-if="item.hid % 2 == 1">
                        <span class="span1"> <span>分期免息</span>3期 </span>
                        <span class="span2"> 满2000减200 </span>
                        <span class="span3">包邮</span>
                    </div>
                </div>
            </router-link>
        </div>
        <div v-show="topShow" class="go_top" @click="goTop"></div>
    </div>
</template>

<script>
export default {
    created(){
        this.getAllGoods();
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll); // 监听滚动的高度
        this.judge();
    },
    methods:{
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
        // 获取参与活动的商品图片
        getAllGoods() {
            this.$axios.get("/goods/good_all").then((res) => {
                this.good_list = res.data.data;
                this.good_list.forEach((item) => {
                    let photo = item.h_photos.split("---")[0];
                    item.h_photos = photo;
                });
                // console.log(this.good_list);
            });
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
        onClickLeft(){
            this.$router.go(-1);
        }
    },
    data(){
        return {
            good_list: [],
            topShow: false, // 返回顶部文字是否显示
        }
    }
};
</script>

<style lang="scss">
.goods{
    .activaty{
        padding-top: 50px;
        width: 9.6rem;
        // margin: 5px 0.5rem;
        .wrap{
            width: 100%;
            height: 4rem;
            background-color: rgb(235, 235, 235);
            margin: 10px 0.2rem;
            border-radius: 5px;
            padding: 10px;
            display: flex;
            // align-items: center;
            flex-wrap: wrap;
            .image{
                flex-basis: 3rem;
                height: 100%;
                border-radius: 5px;
                // margin-right: 0.1rem;
                // padding: 10px;
                background-size: cover;
                background-position: center center;
            }
            .attribute{
                flex-basis: 5.8rem;
                padding-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .good_title{
                    font-size: 0.4rem;
                    display:block;
                    color: #444;
                    line-height: 0.55rem;
                    span{
                        font-size: 0.3rem;
                        display: inline-block;
                        background-color: $bgColor;
                        padding: 0 3px;
                        color: #fff;
                        border-radius: 5px;
                    }
                }
                .good_style{
                    font-size: 0.35rem;
                    color: #555;
                }
                .price{
                    font-size: 0.27rem;
                    color: #000;
                    .price_color{
                        font-size: 0.5rem;
                        color: $bgColor;
                        .del{
                            font-size: 0.3rem;
                            text-decoration:line-through;
                        }
                    }
                }
                .full_reduction{
                    font-size: 0.25rem;
                    // display: inline-block;
                    &>span{
                        margin-right: 5px;
                    }
                    .span1{
                        background-color: rgb(231, 161, 30);
                        border-radius: 3px;
                        color: #fff;
                        padding: 2px 3px 2px 0;
                        &>span{
                            background-color: rgb(240, 36, 36);
                            margin-right: 2px;
                            display: inline-block;
                            padding: 2px 0px 1px 3px;
                            border-radius: 3px 0 0 3px;
                        }
                    }
                    .span2{
                        color: #f40;
                        border: 1px solid #f40;
                        border-radius: 3px;
                        display: inline-block;
                        padding: 1px 2px;
                    }
                    .span3{
                        border: 1px solid rgb(248, 19, 19);
                        color: rgb(248, 19, 19);
                        border-radius: 5px;
                        display: inline-block;
                        padding: 1px 2px;
                    }
                }
            }
        }
    }
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
            color: #fff;
        }
    }
    .van-nav-bar {
        background-color: $bgColor;
    }
    .van-icon-arrow-left::before{
        color: #fff;
    }
    .van-nav-bar__text{
        color: #fff;
    }
}
</style>