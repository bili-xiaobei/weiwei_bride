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
                        <router-link
                            :to="'/banner_goods/' + item.h_goods_id"
                            class="img"
                        >
                            <img
                                class="img"
                                v-lazy:background-image="
                                    item.h_photos.split('---')[0]
                                "
                            />
                        </router-link>
                        <!-- <img v-lazy="item.h_photos.split('---')[0]" alt=""> -->
                        <div class="detail">
                            <div class="de_title">{{ item.h_title }}</div>
                            <div class="de_specs">
                                <span class="size"
                                    >尺寸：{{ item.h_size }} 码</span
                                >
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
                                    <button
                                        class="delete"
                                        @click="deleteGoods(item.h_goods_id)"
                                    >
                                        删除
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="total">
                        <span>合计：{{ total }}</span>
                        <div class="submit">
                            <button is-link @click="submit">提交订单</button>
                        </div>
                    </div>
                </div>
                <please-login v-else />
            </van-tab>
            <van-tab title="订单">
                <div class="istoken" v-if="token">
                    <div class="order">
                        <div class="g_details">
                            <div
                                class="good"
                                v-for="item of order_list"
                                :key="item.h_goods_id"
                            >
                                <div class="is_show">
                                    <router-link
                                        :to="'/banner_goods/' + item.h_goods_id"
                                    >
                                        <img
                                            v-lazy:background-image="
                                                item.h_photos.split('---')[0]
                                            "
                                        />
                                    </router-link>

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
                                                <button
                                                    @click="
                                                        addShopCart(
                                                            item.h_goods_id
                                                        )
                                                    "
                                                >
                                                    加入购物车
                                                </button>
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
import PleaseLogin from "../components/PleaseLogin.vue";
// import qs from 'qs';
export default {
    created() {
        this.getShopOrder();
        this.token = window.sessionStorage.getItem("token");
    },
    data() {
        return {
            bgColor: style.navColor,
            data_list: [],
            order_list: [],
            token: "",
        };
    },
    methods: {
        add(id) {
            for (let item of this.data_list) {
                if (item.h_goods_id == id)
                    this.$axios.put(
                        `/goods/update_goods_num`,
                        this.$qs.stringify({
                            num: ++item.h_num,
                            hid: item.h_goods_id,
                        })
                    );
            }
        },
        min(id) {
            for (let item of this.data_list) {
                if (item.h_goods_id == id) {
                    if (item.h_num > 0) {
                        this.$axios.put(
                            `/goods/update_goods_num`,
                            this.$qs.stringify({
                                num: --item.h_num,
                                hid: item.h_goods_id,
                            })
                        );
                    }
                }
            }
        },
        submit() {
            this.$router.push("/payment");
        },
        // 再次加入购物车
        async addShopCart(goodID) {
            // 想数据库中的购物车加入一条数据
            const { data: result } = await this.$axios.get(
                `/goods/add_goods/${goodID}`
            );
            console.log(result);
            this.$Toast({
                message: result.msg,
                position: "bottom",
            });
            this.getShopOrder();
        },
        // 获得购物车和订单信息
        getShopOrder() {
            this.$axios.get("/my/shop_cart").then((res) => {
                this.data_list = res.data.data;
            });
            this.$axios.get("/my/order").then((res) => {
                this.order_list = res.data.data;
            });
        },
        // 删除购物车中的商品
        deleteGoods(id) {
            console.log(id);
            this.$Dialog
                .confirm({
                    message: "是否删除该商品",
                })
                .then(async () => {
                    // 发起删除购物车商品的请求
                    const { data: result } = await this.$axios.delete(
                        `/goods/delete_goods/${id}`
                    );
                    this.$Toast({
                        message: result.msg,
                        position: "bottom",
                    });
                    this.getShopOrder();
                })
                .catch(() => {
                    console.log()
                    this.$Toast({
                        message: '取消删除',
                        position: "bottom",
                    });
                });
            
        }
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
    components: {
        PleaseLogin,
    },
};
</script>

<style lang="scss">
.shop_cart {
    // padding: 20px;
    // padding-top: 10px;
    // color: #fff;
    // max-height: 100vh;
    position: relative;
    padding-bottom: 30px;
    .van-tab__pane {
        margin-top: 20px;
    }
    .good_card {
        // margin: 0;
        height: 3.5rem;
        background-color: rgb(248, 248, 248);
        display: flex;
        margin: 10px;
        padding: 10px 15px;
        // border-bottom: 2px solid $bgColor;
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
                    .delete {
                        background-color: $bgColor;
                        border: 0;
                        color: #fff;
                        border-radius: 3px;
                        padding: 2px 4px;
                        font-size: 0.35rem;
                        margin-left: 10px;
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
                        .date {
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
                            .again {
                                float: right;
                                button {
                                    margin-left: 10px;
                                    background-color: $bgColor;
                                    color: #fff;
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