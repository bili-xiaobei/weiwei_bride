<template>
    <div class="index">
        <!-- <van-nav-bar class="title" title="首页" fixed/> -->
        <van-search
            v-model="value"
            shape="round"
            background="rgba(255, 255, 255, .6)"
            placeholder="请输入您要搜索的内容"
            class="flxed"
        />
        <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
            class="top55"
        >
            <van-swipe :autoplay="3000" :indicator-color="indicator_color">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <router-link :to="'/banner_goods/' + image.hid">
                        <img
                            class="image"
                            v-lazy:background-image="image.h_photo"
                        />
                    </router-link>
                </van-swipe-item>
            </van-swipe>
            <span class="more_style"><router-link to="/">查看更多 >></router-link></span>
            <van-grid :column-num="4">
                <van-grid-item
                    v-for="(item, index) in styleImages"
                    :key="item.hid"
                >
                    <div class="image_style">
                        <van-image :src="item.h_photo" />
                    </div>
                    <p class="style_text">{{ style_title[index] }}</p>
                </van-grid-item>
            </van-grid>
            <span class="more_style"><router-link to="/">查看更多 >></router-link></span>
            <!-- 活动 -->
            <div class="activaty">
                <div class="wrap" v-for="item in activity" :key="item.hid">
                    <img v-lazy="item.h_photos" />
                    <!-- <div class="image" v-lazy:background-image='item.h_photos'></div> -->
                    <span class="good_title">{{ item.h_title }}</span>
                    <span class="price"
                        >¥
                        <span class="price_color">{{
                            item.h_price
                        }}</span></span
                    >
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import style from "../../public/css/_variable.scss";
export default {
    created() {
        this.getBannerImages();
        this.getStyleImages();
        this.getActivity();
    },
    data() {
        return {
            images: [],
            styleImages: [],
            style_title: ["韩式风", "法式风", "欧式风", "中国风"],
            activity: [],
            isLoading: false,
            value: "",
            indicator_color: style.navColor,
        };
    },
    methods: {
        // 获取首页 banner 图片
        getBannerImages() {
            this.$axios.get("/home/index/banner").then((res) => {
                this.images = res.data.data;
            });
        },
        // 获取风格 图片
        getStyleImages() {
            this.$axios.get("/home/index/style").then((res) => {
                this.styleImages = res.data.data;
            });
        },
        // 获取参与活动的商品图片
        getActivity() {
            this.$axios.get("/home/index/activity").then((res) => {
                this.activity = res.data.data;
                this.activity.forEach((item) => {
                    let photo = item.h_photos.split("---")[0];
                    item.h_photos = photo;
                });
                // console.log(this.activity);
            });
        },
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
                this.count++;
            }, 1000);
        },
    },
};
</script>

<style lang="scss">
.index {
    i {
        color: $bgColor;
    }
    .flxed {
        position: fixed;
        width: 10rem;
        z-index: 100;
        // background-color: #000;
    }
    .van-search {
        background-color: $bgColor !important;
        .van-field__control {
            color: $bgColor;
        }
        .van-search__content--round {
            // background-color:$indexBGC !important;
            .van-cell--borderless ::placeholder {
                color: $bgColor;
                font-size: 14px !important;
                font-weight: 600;
            }
        }
    }
    .top55 {
        padding-top: 55px;
    }
    .van-swipe__track {
        height: 6rem !important;
        // margin-top: 55px;
        .van-swipe-item {
            overflow: hidden;
            border: 10px solid transparent;
            img {
                width: 100%;
                height: 100%;
                background-position: center center;
                background-size: cover;
            }
        }
    }
    // 更多
    .more_style{
        display: block;
        width: 10rem;
        padding-right: 20px;
        text-align: right;
        font-size: 14px;
        border-top: 2px solid $bgColor;
        padding-top: 10px;
        a{
            color: $bgColor !important;
        }
    }
    // 风格
    .van-hairline--top::after{
        border:0 !important;
    }
    .van-grid {
        padding-bottom: 15px;
        .van-grid-item {
            // background-color: transparent;
            padding: 10px 10px 0;
            .van-grid-item__content{
                padding: 0px;
                border-radius: 5px;
            } 
            .style_text {
                font-size: 0.4rem;
                position: absolute;
                background-color: $bgColorA;
                bottom: 0px;
                display: inline-block;
                width: 100%;
                line-height: 0.8rem;
                text-align: center;
                color: #fff;
                border-radius: 0 0 5px 5px;
            }
        }
        .image_style {
            padding: 0;
            width: 100%;
            height: 2.5rem;
            overflow: hidden;
            border-radius: 5px;
            .van-image {
                width: 100%;
                // img {
                //     // width: 100%;
                // }
            }
        }
    }
    .activaty {
        column-count: 2;
        column-gap: 0.3rem;
        width: 9rem;
        margin: 0 auto;
        padding-top: 10px;
        // 单个活动商品
        .wrap {
            // box-shadow: 0px 2px 5px $bgColor;
            border-radius: 5px;
            // background-color: rgba(255, 255, 255, 0.7);
            // background-color: $bgColor;
            border: 2px solid $bgColor;
            overflow: hidden;
            margin-bottom: 10px;
            background-size: 100%;
            /* 防止多列布局，分页媒体和多区域上下文中的意外中断 */
            break-inside: avoid;
            width: 4.4rem;
            .price {
                display: inline-block;
                padding: 0 10px 10px;
                font-size: 14px;
                .price_color {
                    color: $bgColor;
                    font-size: 22px;
                    margin-left: -3px;
                }
            }
            img {
                width: 100%;
                // height: 5rem;
                box-sizing: border-box;
                background-size: cover;
                background-position: center center;
                // padding: 10px;
                border: 10px solid transparent;
            }
            .good_title {
                display: inline-block;
                margin: 10px;
                // margin-top: -100px;
                background-color: transparent;
                // background-color: rgba(255, 255, 255, .4);
                font-size: 0.36rem;
                line-height: 0.45rem;
                color: rgb(80, 80, 80);
                font-weight: 600;
                text-overflow: ellipsis; /*设置隐藏部分为省略号*/
                overflow: hidden; /*设置隐藏*/
                display: -webkit-box;
                -webkit-line-clamp: 2; /*设置显示行数，此处为2行，可设置其他数字*/
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>