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
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <router-link :to="'/banner_goods/' + image.hid">
                        <img
                            class="image"
                            v-lazy:background-image="image.h_photo"
                        />
                    </router-link>
                </van-swipe-item>
            </van-swipe>
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

            <!-- 活动 -->
            <div class="activaty">
                <div class="wrap" v-for="item in activity" :key="item.hid">
                    <img v-lazy:background-image="item.h_photos" />
                    <!-- <div class="image" v-lazy:background-image='item.h_photos'></div> -->
                    <span class="good_title">{{ item.h_title }}</span>
                    <span class="price">¥ <span class="price_color">{{ item.h_price }}</span></span>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
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
    i{
        color: $bgColor;
    }
    .flxed{
        position:fixed;
        width: 10rem;
        z-index: 100;
        background-color: #000;
    }
    .van-search{
        background-color: rgba(255, 255, 255, 0.7) !important;
        .van-search__content--round{
            background-color: rgba(255, 255, 255, 0.6) !important;
            .van-cell--borderless ::placeholder{
                color: $bgColor;
                font-size: 14px !important;
                font-weight: 600;
            }
        }
    }
    .top55{
        padding-top: 55px;
        .van-pull-refresh__text,
        .van-loading,
        .van-loading__text{
            color: $bgColor !important;
        }
    }
    .van-swipe__track {
        height: 5.5rem !important;
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
    .van-grid {
        .van-grid-item__content {
            background-color: transparent;
        }
        .image_style {
            padding: 0;
            width: 100%;
            height: 1.5rem;
            overflow: hidden;
            border-radius: 5px;
            .van-image {
                width: 100%;
                img {
                    width: 100%;
                }
            }
        }
        .style_text {
            margin-top: 10px;
            font-size: 14px;
        }
    }
    .activaty {
        column-count: 2;
        column-gap: 0.2rem;
        width: 9.5rem;
        margin: 0 auto;
        padding-top: 10px;
        .wrap {
            box-shadow: 2px 2px 0 $bgColor;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.7);
            overflow: hidden;
            margin-bottom: 10px;
            background-size: 100%;
            /* 防止多列布局，分页媒体和多区域上下文中的意外中断 */
            break-inside: avoid;
            width: 4.6rem;
            .price{
                display: inline-block;
                padding: 0 10px 10px;
                font-size: 14px;
                .price_color{
                    color: $bgColor;
                    font-size: 20px;
                    margin-left: -3px;
                }
            }
            img {
                width: 100%;
                height: 6rem;
                box-sizing: border-box;
                background-size: cover;
                background-position: center center;
                padding: 10px;
                border: 10px solid #fff;
            }
            .good_title {
                display: inline-block;
                margin: 10px;
                // margin-top: -100px;
                background-color: transparent;
                // background-color: rgba(255, 255, 255, .4);
                font-size: 13px;
                line-height: 17px;
                color: #242424;
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