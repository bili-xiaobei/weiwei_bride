<template>
    <div class="shop_cart">
        <van-tabs type="card" background="transparent">
            <van-tab title="购物车">
                <div class="good_card" v-for="item of data_list" :key="item.hid">
                    <div class="img">{{ item.h_photos.split('---')[0] }}</div>
                    <div class="detail">
                        <div class="de_title">{{ item.h_title }}</div>
                        <div class="de_specs">
                            <span class="size">{{ item.h_size }}</span>
                            <span class="color">{{ item.h_color }}</span>
                        </div>
                        <div class="de_price_num">
                            <span class="price">{{ item.h_price }}</span>
                            <span class="num">
                                <van-stepper v-model="value" />
                            </span>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="订单">订单</van-tab>
        </van-tabs>
    </div>
</template>

<script>
import style from "../../public/css/_variable.scss";
export default {
    created(){
        this.$axios.get('/my/shop_cart').then(res => {
            // console.log(res);
            this.data_list = res.data.data;
            console.log(this.data_list)
        })
    },
    data() {
        return {
            bgColor: style.navColor,
            data_list: [],
            value: 1,
        };
    },
};
</script>

<style lang="scss">
.shop_cart {
    .goods-card {
        margin: 0;
        background-color: white;
    }

    .delete-button {
        height: 100%;
    }
    .van-nav-bar {
        background-color: $bgColor;
    }
    .van-tabs__wrap {
        height: 40px !important;
        margin-top: 10px;
        .van-tabs__nav--card {
            margin: 0 2.5rem;
            border: 1px solid $bgColor;
            .van-tab {
                color: $bgColor;
                border-right: 1px solid $bgColor;
                &.van-tab--active {
                    color: #fff;
                    background-color: $bgColor !important;
                }
            }
        }
    }
    .van-card {
        background-color: rgba(202, 202, 202, 0.7);
    }
}
</style>