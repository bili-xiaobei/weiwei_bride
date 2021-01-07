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
                                >邀请好友得<span class="money">10元</span
                                >优惠券</span
                            ></span
                        >
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
                        
                        <!-- <div class="parameter"> -->
                            <van-collapse v-model="activeNames">
                                <van-collapse-item title="参数" name="1">
                                    <div>
                                        <span>品牌:</span>
                                        <span>{{ good_data.h_brand }}</span>
                                    </div>
                                    <div>
                                        <span>面料:</span>
                                        <span>{{ good_data.h_fabric }}</span>
                                    </div>
                                    <div>
                                        <span>领型:</span>
                                        <span>{{ good_data.h_collar }}</span>
                                    </div>
                                    <div>
                                        <span>类型:</span>
                                        <span>{{ good_data.h_mold }}</span>
                                    </div>
                                    <div>
                                        <span>流行:</span>
                                        <span>{{ good_data.h_popular }}</span>
                                    </div>
                                    <div>
                                        <span>腰型:</span>
                                        <span>{{ good_data.h_waist }}</span>
                                    </div>
                                    <div>
                                        <span>摆型:</span>
                                        <span>{{ good_data.h_pend }}</span>
                                    </div>
                                    <div>
                                        <span>货号:</span>
                                        <span>{{ good_data.h_goods_number }}</span>
                                    </div>
                                    <div>
                                        <span>款式:</span>
                                        <span>{{ good_data.h_minutia }}</span>
                                    </div>
                                    <div>
                                        <span>成分:</span>
                                        <span>{{ good_data.h_component }}</span>
                                    </div>
                                </van-collapse-item>
                            </van-collapse>
                        <!-- </div> -->
                    
                    </van-cell>
                </van-list>
            </div>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" @click="chatO" />
            <van-goods-action-icon
                icon="cart-o"
                text="购物车"
                @click="goShopCart"
            />
            <van-goods-action-icon icon="shop-o" text="店铺" @click="shopO" />
            <van-goods-action-button
                type="warning"
                text="加入购物车"
                @click="addShopCart(good_data.hid)"
            />
            <van-goods-action-button
                type="danger"
                text="立即购买"
                @click="buyGood(good_data.hid)"
            />
        </van-goods-action>
        <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
            <div class="payment">
                <!-- <div class="sub_title">确认订单</div> -->
                <!-- <van-nav-bar
            title="确认订单"
            left-arrow
            @click-left="onClickLeft"
            fixed
        /> -->
                <header>
                    <div class="addr_icon">
                        <van-icon name="location" />
                    </div>
                    <div class="address">
                        <div class="name_phone">
                            <div class="name">小北</div>
                            <div class="phone">18595436515</div>
                        </div>
                        <div class="addr_detail">
                            XX省 XX市 XX区 XX路 XXXX街 X楼
                        </div>
                        <div class="tips">收货不便时，可选择暂存服务</div>
                    </div>
                    <van-icon class="addr_more" name="arrow" />
                </header>
                <div class="g_details">
                    <div
                        class="good"
                        v-for="item of data_list"
                        :key="item.h_goods_id"
                    >
                        <div class="is_show">
                            <img
                                v-lazy:background-image="
                                    item.h_photos.split('---')[0]
                                "
                            />
                            <div class="tit_col_size_pr">
                                <div class="tit">
                                    {{ item.h_title }}
                                </div>
                                <div class="col_size">
                                    <span class="col"> 颜色: 白 </span>
                                    <span class="size"> 尺寸: L </span>
                                </div>
                                <div class="pr">
                                    ¥
                                    <span>{{ item.h_price }}</span>
                                    <span class="number">x 1</span>
                                </div>
                            </div>
                            <div class="express">
                                <span>配送方式：<span>普通配送</span></span>
                                <span>
                                    快递 免邮
                                    <van-icon name="arrow" />
                                </span>
                            </div>
                            <div class="transport">
                                <span>
                                    <van-icon name="question-o" />
                                    运费险：
                                    <span>退换货可赔付10元</span>
                                </span>
                                <span>¥2.34</span>
                            </div>
                            <div class="invoice">
                                开具发票<span
                                    >本次不开具发票<van-icon name="arrow"
                                /></span>
                            </div>
                            <div class="order">
                                订单备注：<span>选填，请先和商家协商一致</span>
                            </div>
                            <div class="all">
                                共 1 件，小计：<span>¥{{ item.h_price }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="sub_order">合计：{{ item.h_price }}</div> -->
                <button @click="showPopup">付款</button>
                <van-popup
                    v-model="paymentShow"
                    position="bottom"
                    :style="{ height: '70%' }"
                >
                    <div class="popup_total">
                        ¥ <span>{{ good_data.h_price }}</span>
                    </div>
                    <van-radio-group v-model="radio" checked-color="color">
                        <van-radio name="1">余额宝</van-radio>
                        <van-radio name="2">支付宝</van-radio>
                        <van-radio name="3">微信</van-radio>
                        <van-radio name="4">花呗</van-radio>
                        <van-radio name="5">借呗</van-radio>
                        <van-radio name="6">信用卡</van-radio>
                    </van-radio-group>
                    <div class="add_mode"></div>
                    <button @click="paymentShow = false">确定付款</button>
                </van-popup>
            </div>
        </van-popup>
    </div>
</template>

<script>
import Swipe from "../components/Swipe.vue";
import GoodTitle from "../components/GoodTitle.vue";
import style from "../../public/css/_variable.scss";
export default {
    created() {
        let hid = location.href.split("/")[location.href.split("/").length - 1];
        this.$axios.get(`/goods/good_hid/${hid}`).then((res) => {
            this.good_data = res.data.data[0];
            console.log(this.good_data);
            // 将图片切割成数组
            this.good_data.h_photos = this.good_data.h_photos.split("---");
            // console.log(this.good_data.h_title);
        });
    },
    data() {
        return {
            props: ["id"],
            isLoading: false,
            good_data: [],
            images: [],
            // 付款界面是否弹出
            show: false,
            paymentShow: false,
            data_list: [],
            radio: "1",
            color: style.navColor,
            // 参数的折叠菜单
            activeNames: ["1"],
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
        // 人工客服
        chatO() {
            this.$Toast({
                message: "模拟人工客服",
                position: "bottom",
            });
        },
        // 点击进入购物车
        goShopCart() {
            this.$router.push("/index");
            window.sessionStorage.setItem("active", 2);
        },
        // 店铺
        shopO() {
            this.$Toast({
                message: "模拟进入店铺",
                position: "bottom",
            });
        },
        // 加入购物车
        async addShopCart(id) {
            // 想数据库中的购物车加入一条数据
            const { data: result } = await this.$axios.get(
                `/goods/add_goods/${id}`
            );
            console.log(result);
            this.$Toast({
                message: result.msg,
                position: "bottom",
            });
            // this.getShopOrder();
        },
        // 立即购买
        async buyGood(id) {
            this.show = true;
            const { data: result } = await this.$axios.get(
                `/goods/search_goods_hid/${id}`
            );
            console.log(result.data[0]);
            this.data_list = result.data;
        },
        showPopup() {
            this.paymentShow = true;
        },
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
            .parameter {
                & > div {
                    // background-color: rgb(243, 4, 4);
                    font-size: 0.35rem;
                    color: rgb(107, 107, 107);
                    padding: 3px 1rem;
                    span {
                        margin-right: 10px;
                    }
                }
            }
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
                        .money {
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
// 参数的折叠菜单
.van-collapse-item__content{
    background-color: #e0e0e0;
}
.van-collapse {
    width: 100%;
    margin-bottom: 100px;
}
// 提交订单
.payment {
    background-color: #e0e0e0;
    border-top: 1px solid transparent;
    // position: absolute;
    // bottom: 0;
    // padding-bottom: 100px;
    
    button {
        width: 8rem;
        height: 40px;
        border-radius: 20px;
        color: #fff;
        border: 0;
        background-color: $bgColor;
        font-weight: 900;
        margin: 10px 1rem;
    }
    header {
        width: 9rem;
        height: 2.5rem;
        background-color: #eee;
        margin: 46px 0.5rem 10px;
        border-radius: 5px;
        padding: 10px;
        margin-top: 60px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .addr_icon {
            width: 1rem;
            height: 1rem;
            background-color: $bgColor;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            font-size: 0.5rem;
            color: #eee;
        }
        .address {
            div {
                line-height: 0.6rem;
            }
            .name_phone {
                display: flex;
                div {
                    display: inline-block;
                }
                .name {
                    font-size: 0.4rem;
                    margin-right: 5px;
                }
                .phone {
                    font-size: 0.36rem;
                    color: #666;
                }
            }
            .addr_detail {
                font-size: 0.36rem;
            }
            .tips {
                font-size: 0.32rem;
                color: $bgColor;
            }
            .addr_more {
                color: $bgColor !important;
            }
        }
    }
    .g_details {
        width: 9rem;
        margin: 0 0.5rem 10px;
        .good {
            width: 100%;
            .is_show {
                border-radius: 5px;
                background-color: #eee;
                padding: 10px;
                // display: flex;
                margin-bottom: 15px;
                img,
                .tit_col_size_pr {
                    display: inline-block;
                }
                img {
                    width: 2.5rem;
                    height: 3rem;
                    background-size: cover;
                    background-position: center center;
                    margin-right: 10px;
                }
                .tit_col_size_pr {
                    width: 5.5rem;
                    margin: 5px 0;
                    position: relative;
                    .tit {
                        font-size: 0.4rem;
                        line-height: 0.5rem;
                        position: absolute;
                        top: -2.4rem;
                    }
                    .col_size {
                        position: absolute;
                        top: -0.85rem;
                        span {
                            width: 3rem;
                            height: 0.7rem;
                            line-height: 0.7rem;
                            display: inline;
                            font-size: 0.35rem;
                        }
                    }
                    .pr {
                        // width: 4rem;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        span {
                            // width: 1rem;
                            height: 0.6rem;
                            font-size: 0.6rem;
                        }
                        .number {
                            float: right;
                            margin-right: 0.4rem;
                            font-size: 12px;
                            color: #666;
                        }
                    }
                }
                .express,
                .transport,
                .invoice,
                .order {
                    font-size: 0.4rem;
                    margin: 0.8rem 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.35rem;
                }
                .all {
                    font-size: 0.3rem;
                    text-align: right;
                    & > span {
                        color: $bgColor;
                    }
                }
            }
        }
    }
    .sub_order {
        font-size: 0.45rem;
        text-align: right;
        margin: 0 0.7rem 10px;
    }
    .van-popup {
        .popup_total {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 90px;
            span {
                font-size: 30px;
                margin-left: 5px;
            }
        }
        .van-radio {
            // display: flex;
            // justify-content: space-between;
            padding: 10px 30px;
            // background-color: rgb(235, 235, 235);
            margin-top: 5px;
            .van-radio__icon--checked .van-icon {
                background-color: transparent;
                color: $bgColor;
                border-color: $bgColor;
            }
        }
    }
}
</style>