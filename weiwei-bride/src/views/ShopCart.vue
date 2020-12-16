<template>
    <div class="shop_cart">
        <van-tabs type="card" background="transparent" animated sticky>
            <van-tab title="购物车" class="shop_cart">
                <div class="istoken" v-if="token">
                <div
                    class="good_card"
                    v-for="item of data_list"
                    :key="item.h_goods_id"
                >
                    <div class="img">
                        <img
                            class="img"
                            v-lazy:background-image="
                                item.h_photos.split('---')[0]
                            "
                        />
                    </div>
                    <!-- <img v-lazy="item.h_photos.split('---')[0]" alt=""> -->
                    <div class="detail">
                        <div class="de_title">{{ item.h_title }}</div>
                        <div class="de_specs">
                            <span class="size">尺寸：{{ item.h_size }} 码</span>
                            <span class="color"
                                >颜色：{{ item.h_color }}色</span
                            >
                        </div>
                        <div class="de_price_num">
                            <span class="price"
                                >¥ <span>{{ item.h_price }}</span></span
                            >
                            <span class="num">
                                <button
                                    class="min"
                                    @click="min(item.h_goods_id)"
                                >
                                    -
                                </button>
                                <span>{{ item.h_num }}</span>
                                <button
                                    class="add"
                                    @click="add(item.h_goods_id)"
                                >
                                    +
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <span>合计：{{ total }}</span>
                    <div class="submit">
                        <button is-link @click="submit">提交订单</button>
                        <van-popup
                            v-model="show"
                            position="bottom"
                            :style="{ height: '80%', width: '10rem' }"
                        >
                            <div class="sub_title">确认订单</div>
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
                                    <div class="tips">
                                        收货不便时，可选择暂存服务
                                    </div>
                                </div>
                                <van-icon class="addr_more" name="arrow" />
                            </header>
                            <div class="g_details">
                                <div
                                    class="good"
                                    v-for="item of data_list"
                                    :key="item.h_goods_id"
                                >
                                    <div class="is_show" v-if="item.h_num > 0">
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
                                                <span class="col">
                                                    颜色: {{ item.h_color }}
                                                </span>
                                                <span class="size">
                                                    尺寸: {{ item.h_size }}
                                                </span>
                                            </div>
                                            <div class="pr">
                                                ¥
                                                <span>{{ item.h_price }}</span>
                                                <span class="number"
                                                    >x {{ item.h_num }}</span
                                                >
                                            </div>
                                        </div>
                                        <div class="express">
                                            <span
                                                >配送方式：<span
                                                    >普通配送</span
                                                ></span
                                            >
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
                                                >本次不开具发票<van-icon
                                                    name="arrow"
                                            /></span>
                                        </div>
                                        <div class="order">
                                            订单备注：<span
                                                >选填，请先和商家协商一致</span
                                            >
                                        </div>
                                        <div class="all">
                                            共{{ item.h_num }}件，小计：<span
                                                >¥{{
                                                    item.h_price * item.h_num
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sub_order">合计：{{ total }}</div>
                            <button>确认付款</button>
                        </van-popup>
                    </div>
                </div>
            </div>
            <please-login v-else />
            </van-tab>
            <van-tab title="订单"  v-if="token">
                <div class="istoken" v-if="token">
                <div class="order">
                    <div class="g_details">
                        <div
                            class="good"
                            v-for="item of order_list"
                            :key="item.h_goods_id"
                        >
                            <div class="is_show" >
                                <img
                                    v-lazy:background-image="
                                        item.h_photos.split('---')[0]
                                    "
                                />
                                <div class="tit_col_size_pr">
                                    <div class="tit">
                                        {{ item.h_title }}
                                    </div>
                                    <div class="date">
                                        购买日期：{{ item.h_date }}
                                    </div>
                                    <div class="pr">
                                        ¥ <span>{{ item.h_price }}</span>
                                        <span class="again">
                                            <button>加入购物车</button>
                                            <button>再次购买</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <please-login v-else />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import style from "../../public/css/_variable.scss";
import PleaseLogin from '../components/PleaseLogin.vue';
export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.$axios.get("/my/shop_cart").then((res) => {
            this.data_list = res.data.data;
            console.log(this.data_list);
        });
        this.$axios.get("/my/order").then((res) => {
            this.order_list = res.data.data;
            console.log(this.order_list);
        });
    },
    data() {
        return {
            bgColor: style.navColor,
            data_list: [],
            order_list: [],
            show: false,
            token: '',
        };
    },
    methods: {
        add(id) {
            for (let item of this.data_list) {
                if (item.h_goods_id == id) return ++item.h_num;
            }
        },
        min(id) {
            for (let item of this.data_list) {
                if (item.h_goods_id == id) {
                    if (item.h_num > 0) {
                        return --item.h_num;
                    }
                }
            }
        },
        submit() {
            this.show = !this.show;
        },
    },
    computed: {
        total() {
            let total = 0;
            for (let item of this.data_list) {
                total += item.h_num * item.h_price;
            }
            return total;
        },
    },
    components:{
        PleaseLogin,
    }
};
</script>

<style lang="scss">
.shop_cart {
    // padding: 20px;
    // padding-top: 10px;
    // color: #fff;
    min-height: 100vh;
    position: relative;
    margin-bottom: -50px;
    .van-tab__pane {
        margin-top: 20px;
    }
    .good_card {
        // margin: 0;
        height: 3.5rem;
        // background-color: rgba(35, 102, 87, 0.356);
        display: flex;
        padding: 10px 30px;
        border-bottom: 2px solid $bgColor;
        // border-radius: 5px;
        // margin-bottom: 15px;
        .img {
            width: 2.5rem;
            height: 100%;
            margin-right: 10px;
            img {
                background-size: cover;
                background-position: center center;
            }
        }
        .detail {
            position: relative;
            .de_title {
                font-size: 0.4rem;
                line-height: 0.5rem;
                margin-top: 5px;
            }
            .de_specs {
                margin: 10px 0;
                font-size: 0.35px;
                span {
                    margin-right: 15px;
                }
            }
            .de_price_num {
                position: absolute;
                bottom: 0;
                width: 100%;
                .price {
                    // color: rgba(255, 255, 255, 0.8);
                    span {
                        font-size: 0.5rem;
                    }
                }
                .num {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    .add,
                    .min {
                        width: 25px;
                        height: 20px;
                        border: 0;
                        background-color: rgba(204, 204, 204, 0.6);
                        // color: rgba(255, 255, 255, 0.8);
                        // font-size: 18px;
                        font-weight: 600;
                        border-radius: 3px;
                    }
                    span {
                        display: inline-block;
                        width: 20px;
                        text-align: center;
                        // color: rgba(255, 255, 255, 0.8);
                    }
                }
            }
        }
    }
    .total {
        & > span {
            display: inline-block;
            width: 10rem;
            height: 50px;
            line-height: 50px;
            text-align: right;
            // background-color: $bgColor;
            padding-right: 30px;
        }
        .submit {
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
            // 提交订单
            .van-popup {
                background-color: rgba(255, 255, 255, 0.719);
                position: absolute;
                bottom: 0;
                padding-bottom: 100px;
                .sub_title {
                    width: 100%;
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    font-size: 20px;
                    border-bottom: 1px solid rgb(128, 128, 128);
                }
                header {
                    width: 9rem;
                    height: 2.5rem;
                    background-color: #eee;
                    margin: 10px 0.5rem;
                    border-radius: 5px;
                    padding: 10px;
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
            }
        }
    }
    .delete-button {
        height: 100%;
    }
    .van-nav-bar {
        background-color: $bgColor;
    }
    .van-tabs__wrap {
        // position: fixed;
        height: 46px !important;
        padding-top: 10px;
        background-color: $bgColor !important;
        .van-tabs__nav--card {
            margin: 0 2.5rem;
            border: 1px solid #fff;
            .van-tab {
                color: #fff;
                border-right: 1px solid #fff;
                &.van-tab--active {
                    color: $bgColor;
                    background-color: #fff !important;
                }
            }
        }
    }
    .van-card {
        background-color: rgba(202, 202, 202, 0.7);
    }
    .order {
        padding-bottom: 50px;
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
                        width: 100%;
                        height: 10rem;
                        background-size: cover;
                        background-position: center center;
                        margin-right: 10px;
                    }
                    .tit_col_size_pr {
                        width: 100%;
                        margin: 5px 0;
                        // position: relative;
                        .tit {
                            font-size: 0.4rem;
                            line-height: 0.5rem;
                            // position: absolute;
                            // top: -2.4rem;
                        }
                        .date{
                            margin-top: 10px;
                        }
                        .pr {
                            // width: 4rem;
                            height: 0.6rem;
                            line-height: 0.6rem;
                            margin-top: 15px;
                            span {
                                height: 0.6rem;
                                font-size: 0.6rem;
                            }
                            .again{
                                float: right;
                                button{
                                    margin-left: 10px;
                                    background-color: #aaa;
                                    border: 0;
                                    outline: none;
                                    width: 2.5rem;
                                    height: 0.8rem;
                                    border-radius: 3px;
                                    font-weight: 900;
                                }
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
    }
}
</style>