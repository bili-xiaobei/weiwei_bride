<template>
    <div class="banner_good">
        <van-nav-bar
            class="title"
            fixed
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="content">
            <van-pull-refresh
                v-model="isLoading"
                success-text="刷新成功"
                @refresh="onRefresh"
            >
                <swipe :good_data="good_data" />
                <span class="price"
                    >¥<span
                        >{{ good_data.h_price }}
                        <span class="delete"
                            >¥{{ parseInt(good_data.h_price * 1.3) }}</span
                        ></span
                    ></span
                >
                <good-title :good_title="good_data.h_title" />
            </van-pull-refresh>
            <div class="recommend">
                <div class="rec"><van-icon name="like-o" />推荐</div>
                <div class="help"><van-icon name="friends-o" />帮我选</div>
            </div>
            <div class="details">
                <!-- 发货 -->
                <van-list>
                    <van-cell>
                        <span
                            >发货
                            <span
                                ><van-icon name="location" />浙江温州 |
                                快递：免运费</span
                            ></span
                        >
                        <span>月销60</span>
                        <!-- 动态个数 -->
                    </van-cell>
                </van-list>
                <!-- 权益 -->
                <van-list>
                    <van-cell>
                        <span
                            >权益<span
                                ><van-icon
                                    name="gift"
                                />凭芝麻信用先用后付，收货满意在付</span
                            ></span
                        >
                    </van-cell>
                </van-list>
                <!-- 分享 -->
                <van-list>
                    <van-cell>
                        <span
                            >分享<span
                                >邀请好友得<span class="money">10元</span>优惠券</span
                            ></span
                        >
                        <span><van-icon name="arrow" /></span>
                    </van-cell>
                </van-list>
                <!-- 保障 -->
                <van-list>
                    <van-cell>
                        <span
                            >保障<span
                                >假一赔十 上门取退 极速退款 七天无理由退换</span
                            ></span
                        >
                        <span><van-icon name="arrow" /></span>
                    </van-cell>
                </van-list>
                <!-- 选择 -->
                <van-list class="size_color">
                    <van-cell>
                        <div>
                            <div>
                                <span>尺码:</span>
                                <span class="active">S</span>
                                <span>M</span>
                                <span>L</span>
                                <span>XL</span>
                                <span>XXL</span>
                            </div>
                            <div class="color">
                                <span>颜色:</span>
                                <span class="active">白</span>
                                <span>红</span>
                                <span>蓝</span>
                                <span>黑</span>
                            </div>
                        </div>
                    </van-cell>
                </van-list>
                <van-list>
                    <van-cell>
                        <span>参数</span>
                        <span><van-icon name="arrow" /></span>
                    </van-cell>
                </van-list>

            </div>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="cart-o" text="购物车" />
            <van-goods-action-icon icon="shop-o" text="店铺" />
            <van-goods-action-button
                type="warning"
                text="加入购物车"
            />
            <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
import Swipe from "../components/Swipe.vue";
import GoodTitle from "../components/GoodTitle.vue";
export default {
    created() {
        let hid = location.href.split("/")[location.href.split("/").length - 1];
        this.$axios.get(`/goods/good_hid/${hid}`).then((res) => {
            this.good_data = res.data.data[0];
            // console.log(this.good_data)
            // 将图片切割成数组
            this.good_data.h_photos = this.good_data.h_photos.split("---");
            console.log(this.good_data.h_title);
        });
    },
    data() {
        return {
            props: ["id"],
            isLoading: false,
            good_data: [],
            images: [],
        };
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
                this.count++;
            }, 1000);
        },
        onChange(index) {
            this.current = index;
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {},
    },
    components: {
        Swipe,
        GoodTitle,
    },
};
</script>

<style lang='scss'>
.banner_good {
    min-height: 100vh;
    background-color: #e0e0e0;
    i,
    .van-nav-bar__text,
    .van-nav-bar__title {
        color: $bgColor !important;
    }
    .van-hairline--bottom::after {
        border: 0 !important;
    }
    .title {
        color: transparent !important;
    }
    // padding: 10px;
    .van-swipe-item {
        border-radius: 3px;
        height: 12rem;
        // overflow: hidden;
        .image {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            width: 10rem;
            height: 12rem;
        }
    }
    .content {
        // height: 10rem;
        // padding-top: 45px;
        padding-bottom: 50px;
        .price {
            background-color: $bgColor;
            display: inline-block;
            width: 100%;
            line-height: 40px;
            padding: 0 20px;
            color: #fff;
            span {
                font-size: 24px;
                margin-left: 5px;
            }
            .delete {
                font-size: 16px;
                text-decoration: line-through;
            }
        }
        // 推荐
        .recommend {
            width: 10rem;
            height: 0.6rem;
            line-height: 0.6rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .rec,
            .help {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.35rem;
                .van-icon {
                    font-size: 0.4rem;
                    margin-right: 5px;
                }
            }
        }
        .details {
            // background-color: #e0e0e0;
            .van-list {
                // background-color: #fff;
                margin-top: 10px;
                .van-cell {
                    // height: 0.9rem;
                    padding: 5px 16px;
                    background-color: transparent;
                    span {
                        margin-right: 10px;
                        span {
                            margin-left: 10px;
                        }
                        .money{
                            color: $bgColor;
                        }
                    }
                }
                .van-cell__value {
                    font-size: 0.25rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
            .size_color {
                span {
                    margin-right: 5px;
                    font-size: 0.35rem;
                    display: inline-block;
                    padding: 0px 10px;
                    border-radius: 4px;
                    border: 1px solid #666;
                    &.active {
                        background-color: $bgColor;
                        border: 1px solid #000;
                        color: #eee;
                    }
                }
            }
            .color {
                margin-top: 10px;
            }
        }
    }

    .van-button--danger {
        background-color: $bgColor !important;
        // border-radius: 50px;
    }
}
.van-goods-action-button--danger {
    background-color: transparent !important;
}
</style>