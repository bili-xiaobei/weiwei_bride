<template>
    <div class="index">
        <!-- <van-nav-bar class="title" title="首页" fixed/> -->
        <div class="search flxed">
            <van-icon name="map-marked" color="#eee" @click="address"/>
            <van-search
                v-model="value"
                shape="round"
                background="rgba(255, 255, 255, .6)"
                placeholder="请输入您要搜索的内容"
                @input="searchLike"
            />
            <!-- 提示  搜索关键字  待完成  -->
            <!-- <van-icon name="manager" color="#37a792" /> -->
        </div>
        <div class="search_like" v-show="isShow">
            <router-link :to='"/banner_goods/" + item.hid' v-for="item of search_list" :key="item.hid">
                {{ item.h_title }}
            </router-link>
        </div>

        <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
            class="top55"
            v-show="comIsShow"
        >
            <van-notice-bar left-icon="volume-o" :scrollable="false">
                <van-swipe
                    vertical
                    class="notice-swipe"
                    :autoplay="3000"
                    :show-indicators="false"
                >
                    <van-swipe-item>本店活动将 20-12-12 号开始</van-swipe-item>
                    <van-swipe-item>截止时间为 20-12-31 号</van-swipe-item>
                    <van-swipe-item
                        >凡是规定时间到店的顾客均可领取精美礼品</van-swipe-item
                    >
                </van-swipe>
            </van-notice-bar>
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
            <span class="more_style"
                ><router-link to="/goods">查看更多 >></router-link></span
            >
            <van-grid :column-num="4">
                <van-grid-item
                    v-for="(item, index) in styleImages"
                    :key="item.hid"
                >
                    <div class="image_style">
                        <router-link to="/goods">
                            <van-image :src="item.h_photo" />
                        </router-link>
                    </div>
                    <p class="style_text">{{ style_title[index] }}</p>
                </van-grid-item>
            </van-grid>
            <span class="more_style"
                ><router-link to="/goods">查看更多 >></router-link></span
            >
            <!-- 活动 -->
            <!-- <div class="activaty">
                <div class="wrap" v-for="item in activity" :key="item.hid">
                    <img v-lazy="item.h_photos" />
                    <span class="good_title">{{ item.h_title }}</span>
                    <span class="price"
                        >¥
                        <span class="price_color">{{
                            item.h_price
                        }}</span></span
                    >
                </div>
            </div> -->
            <div class="activaty">
                <router-link
                    :to="'/banner_goods/' + item.hid"
                    class="wrap"
                    v-for="item in activity"
                    :key="item.hid"
                >
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
                                    >券前{{
                                        parseInt(item.h_price * 1.1)
                                    }}</span
                                >
                            </span>
                            {{ parseInt(Math.random() * 1000) }}人已付款
                        </span>
                        <div class="full_reduction" v-if="item.hid % 2 == 1">
                            <span class="span1">
                                <span>分期免息</span>3期
                            </span>
                            <span class="span2"> 满2000减200 </span>
                            <span class="span3">包邮</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </van-pull-refresh>
        <!-- <van-cell is-link @>展示弹出层</van-cell> -->
        <!-- <van-popup v-model="isShow" position="top" :style="{ height: '30%' }">内容</van-popup> -->
        <!-- 搜索时显示 -->
        
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
            // 弹出层
            isShow: false,
            // 组件是否显示
            comIsShow: true,
            // 模糊查询的数据列表
            search_list: []
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
                this.getBannerImages();
                this.getStyleImages();
                this.getActivity();
                this.count++;
            }, 1000);
        },
        // 用户搜索商品
        searchLike(){
            // console.log(this.value)
            // 输入框有内容时
            if(this.value.trim()) {
                this.comIsShow = false;
                this.isShow = true;
            } else {
                // 输入框没内容时
                this.comIsShow = true;
                this.isShow = false;
            }
            
            // 发送请求  进行模糊查询
            this.$axios.get('/goods/search_like/'+this.value).then(res => {
                this.search_list = res.data.data;
                // console.log(this.search_list)
            })
        },
        // 跳转到我的地址
        address(){
            this.$router.push('/address');
            // window.sessionStorage.setItem('active',2);
        }
    },
};
</script>

<style lang="scss">
.index {
    padding-bottom: 50px;
    i {
        color: $bgColor;
    }
    i.van-icon.van-icon-manager,
    i.van-icon.van-icon-map-marked {
        display: inline-block;
        font-size: 25px;
        margin-left: 10px;
    }
    .flxed {
        background-color: $bgColor !important;
        position: fixed;
        width: 10rem;
        z-index: 100;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 10px;
        // background-color: #000;

        .van-search {
            background-color: transparent !important;
            width: 9rem;
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
    }
    .top55 {
        padding-top: 55px;
    }
    .van-swipe__track {
        height: 6rem !important;
        // margin-top: 55px;
        .van-swipe-item {
            overflow: hidden;
            // margin:20px;
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
    .more_style {
        display: block;
        width: 10rem;
        padding-right: 20px;
        text-align: right;
        font-size: 0.3rem;
        border-top: 2px solid $bgColor;
        padding-top: 10px;
        a {
            color: $bgColor !important;
        }
    }
    // 风格
    .van-hairline--top::after {
        border: 0 !important;
    }
    .van-grid {
        padding-bottom: 15px;
        .van-grid-item {
            // background-color: transparent;
            padding: 10px 10px 0;
            .van-grid-item__content {
                padding: 0px;
                border-radius: 5px;
            }
            .style_text {
                font-size: 0.4rem;
                position: absolute;
                background-color: $bgColor;
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
        width: 9.6rem;
        // margin: 5px 0.5rem;
        .wrap {
            width: 100%;
            height: 3.5rem;
            // background-color: #fff;
            margin: 10px 0.2rem;
            border-radius: 5px;
            padding: 10px;
            display: flex;
            // align-items: center;
            flex-wrap: wrap;
            .image {
                flex-basis: 3rem;
                height: 3.5rem;
                border-radius: 5px;
                // margin-right: 0.1rem;
                // padding: 10px;
                background-size: cover;
                background-position: center center;
            }
            .attribute {
                flex-basis: 5.8rem;
                padding-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .good_title {
                    font-size: 0.4rem;
                    display: block;
                    color: #444;
                    line-height: 0.55rem;
                    span {
                        font-size: 0.3rem;
                        display: inline-block;
                        background-color: $bgColor;
                        padding: 0 3px;
                        color: #fff;
                        border-radius: 5px;
                    }
                }
                .good_style {
                    font-size: 0.35rem;
                    color: #555;
                }
                .price {
                    font-size: 0.27rem;
                    color: #000;
                    .price_color {
                        font-size: 0.5rem;
                        color: $bgColor;
                        .del {
                            font-size: 0.3rem;
                            text-decoration: line-through;
                        }
                    }
                }
                .full_reduction {
                    font-size: 0.25rem;
                    // display: inline-block;
                    & > span {
                        margin-right: 5px;
                    }
                    .span1 {
                        background-color: rgb(231, 161, 30);
                        border-radius: 3px;
                        color: #fff;
                        padding: 2px 3px 2px 0;
                        & > span {
                            background-color: rgb(240, 36, 36);
                            margin-right: 2px;
                            display: inline-block;
                            padding: 2px 0px 1px 3px;
                            border-radius: 3px 0 0 3px;
                        }
                    }
                    .span2 {
                        color: #f40;
                        border: 1px solid #f40;
                        border-radius: 3px;
                        display: inline-block;
                        padding: 1px 2px;
                    }
                    .span3 {
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
    // .activaty {
    //     column-count: 2;
    //     column-gap: 0.3rem;
    //     width: 9rem;
    //     margin: 0 auto;
    //     padding-top: 10px;
    //     // 单个活动商品
    //     .wrap {
    //         // box-shadow: 0px 2px 5px $bgColor;
    //         border-radius: 5px;
    //         // background-color: rgba(255, 255, 255, 0.7);
    //         // background-color: $bgColor;
    //         border: 2px solid $bgColor;
    //         overflow: hidden;
    //         margin-bottom: 10px;
    //         background-size: 100%;
    //         /* 防止多列布局，分页媒体和多区域上下文中的意外中断 */
    //         break-inside: avoid;
    //         width: 4.4rem;
    //         .price {
    //             display: inline-block;
    //             padding: 0 10px 10px;
    //             font-size: 14px;
    //             .price_color {
    //                 color: $bgColor;
    //                 font-size: 22px;
    //                 margin-left: -3px;
    //             }
    //         }
    //         img {
    //             width: 100%;
    //             // height: 5rem;
    //             box-sizing: border-box;
    //             background-size: cover;
    //             background-position: center center;
    //             // padding: 10px;
    //             border: 10px solid transparent;
    //         }
    //         .good_title {
    //             display: inline-block;
    //             margin: 10px;
    //             // margin-top: -100px;
    //             background-color: transparent;
    //             // background-color: rgba(255, 255, 255, .4);
    //             font-size: 0.36rem;
    //             line-height: 0.45rem;
    //             color: rgb(80, 80, 80);
    //             font-weight: 600;
    //             text-overflow: ellipsis; /*设置隐藏部分为省略号*/
    //             overflow: hidden; /*设置隐藏*/
    //             display: -webkit-box;
    //             -webkit-line-clamp: 2; /*设置显示行数，此处为2行，可设置其他数字*/
    //             -webkit-box-orient: vertical;
    //         }
    //     }
    // }
    .van-notice-bar__wrap {
        .notice-swipe {
            height: 40px;
            line-height: 20px !important;
        }
    }
    .search_like{
        position: absolute;
        background-color: #e0e0e0;
        top: 56px;
        padding-bottom: 150px;
        a{
            text-overflow: ellipsis; /*设置隐藏部分为省略号*/
            overflow: hidden; /*设置隐藏*/
            display: -webkit-box;
            -webkit-line-clamp: 1; /*设置显示行数，此处为2行，可设置其他数字*/
            -webkit-box-orient: vertical;
            margin: 10px 40px;
        }
    }
}
</style>