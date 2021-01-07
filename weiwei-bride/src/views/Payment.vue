<template>
    <div class="payment">
        <!-- <div class="sub_title">确认订单</div> -->
        <van-nav-bar
            title="确认订单"
            left-arrow
            @click-left="onClickLeft"
            fixed
        />
        <header>
            <div class="addr_icon">
                <van-icon name="location" />
            </div>
            <div class="address">
                <div class="name_phone">
                    <div class="name">小北</div>
                    <div class="phone">18595436515</div>
                </div>
                <div class="addr_detail">XX省 XX市 XX区 XX路 XXXX街 X楼</div>
                <div class="tips">收货不便时，可选择暂存服务</div>
            </div>
            <van-icon class="addr_more" name="arrow" />
        </header>
        <div class="g_details">
            <div class="good" v-for="item of data_list" :key="item.h_goods_id">
                <div class="is_show" v-if="item.h_num > 0">
                    <img
                        v-lazy:background-image="item.h_photos.split('---')[0]"
                    />
                    <div class="tit_col_size_pr">
                        <div class="tit">
                            {{ item.h_title }}
                        </div>
                        <div class="col_size">
                            <span class="col"> 颜色: {{ item.h_color }} </span>
                            <span class="size"> 尺寸: {{ item.h_size }} </span>
                        </div>
                        <div class="pr">
                            ¥
                            <span>{{ item.h_price }}</span>
                            <span class="number">x {{ item.h_num }}</span>
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
                        共{{ item.h_num }}件，小计：<span
                            >¥{{ item.h_price * item.h_num }}</span
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="sub_order">合计：{{ total }}</div>
        <button @click="showPopup">合并付款</button>
        <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
            <div class="popup_total">
                ¥ <span>{{ total }}</span>
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
            <button @click="show=false">确定付款</button>
        </van-popup>
    </div>
</template>

<script>
import style from "../../public/css/_variable.scss";
export default {
    created() {
        this.$axios.get("/my/shop_cart").then((res) => {
            this.data_list = res.data.data;
        });
    },
    data() {
        return {
            data_list: [],
            show: false,
            radio: '1',
            color: style.navColor,
        };
    },
    methods: {
        onClickLeft() {
            this.$router.push("/");
        },
        showPopup() {
            this.show = true;
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
};
</script>

<style lang="scss">
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
    .van-nav-bar__content {
        background-color: $bgColor;
    }
    .van-nav-bar .van-icon {
        color: #eee;
    }
    .van-nav-bar__title {
        color: #eee;
        font-weight: 900;
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
    .van-popup{
        .popup_total{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 90px;
            span{
                font-size: 30px;
                margin-left: 5px;
            }
        }
        .van-radio{
            // display: flex;
            // justify-content: space-between;
            padding: 10px 30px;
            // background-color: rgb(235, 235, 235);
            margin-top: 5px;
            .van-radio__icon--checked .van-icon{
                background-color: transparent;
                color: $bgColor;
                border-color: $bgColor;
            }
        }
    }
}
</style>