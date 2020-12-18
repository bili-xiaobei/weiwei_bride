<template>
    <div class="my">
        <!-- <theme /> -->
        <header>
            <van-nav-bar title="我的" fixed />
        </header>
        <div class="list">
            <div class="avatar">
                <div class="img">
                    <img :src="data_list.avatar" alt="" v-if="data_list.token" />
                </div>
                <div class="username">{{ data_list.nickname }}</div>
            </div>
            <div class="option">
                <router-link to="/strategy" class="strategy">
                    <van-icon name="label" color="#1989fa" />
                    百科
                    <span>12</span>
                </router-link>
                <router-link to="/" class="address">
                    <van-icon
                        name="location"
                        color="rgba(80, 53, 231, 0.719)"
                    />
                    我的位置
                    <span v-if="data_list.token"> 3 </span>
                </router-link>
                <div class="coupon" @click="showCoupon">
                    <van-icon name="bill" color="rgb(57, 228, 219)" />
                    优惠券
                    <span v-if="data_list.token"> {{ this.coupon_list.length }} </span>
                </div>
                <div class="card" @click="showCard">
                    <van-icon name="coupon" color="rgb(253, 71, 71)" />
                    购物卡
                    <span v-if="data_list.token"> {{ this.coupon_list.length }} </span>
                </div>
            </div>
        </div>
        <div class="about">
            <van-list>
                <van-cell>
                    <!-- 图标 -->
                    <span @clock="getMyDynamic"><van-icon name="star-o" />我的动态</span>
                    <span><van-icon name="arrow" /></span>
                    <!-- 动态个数 -->
                </van-cell>
                <van-cell>
                    <!-- 图标 -->
                    <span><van-icon name="friends-o" />性别</span>
                    <span v-if="data_list.token">{{ data_list.sex == 1 ? '男' : '女' }}</span>
                    <!-- 动态个数 -->
                </van-cell>
                <van-cell>
                    <!-- 图标 -->
                    <span><van-icon name="phone-o" />电话</span>
                    <span>{{ data_list.phone }}</span>
                    <!-- 动态个数 -->
                </van-cell>
                <van-cell>
                    <!-- 图标 -->
                    <span><van-icon name="coupon-o" />积分</span>
                    <span v-if="data_list.token">1453</span>
                    <!-- 动态个数 -->
                </van-cell>
                <van-cell>
                    <!-- 图标 -->
                    <span><van-icon name="manager-o" />隐私</span>
                    <span><van-icon name="arrow" /></span>
                </van-cell>
                <van-cell>
                    <!-- 图标 -->
                    <span><van-icon name="cluster-o" />通用</span>
                    <span><van-icon name="arrow" /></span>
                </van-cell>
            </van-list>
            <van-list>
                <van-cell @click="goSetting">
                    <!-- 图标 -->
                    <span><van-icon name="setting-o" />设置</span>
                    <span><van-icon name="arrow" /></span>
                    <!-- 动态个数 -->
                </van-cell>
            </van-list>
            <van-list class="toggle" v-if="isToken">
                <van-cell>
                    <!-- 图标 -->
                    <span @click="toggle_user">切换账户</span>
                    <!-- 动态个数 -->
                </van-cell>
            </van-list>
            <van-list class="logout" v-if="isToken">
                <van-cell>
                    <!-- 图标 -->
                    <span @click="logout">退出登录</span>
                    <!-- 动态个数 -->
                </van-cell>
            </van-list>
            <van-list class="logout" v-else>
                <van-cell>
                    <span @click="logout">前去登录</span>
                </van-cell>
            </van-list>
        </div>
        <!-- 优惠券 -->
        <van-popup
            v-model="couponShow"
            closeable
            close-icon="close"
            position="bottom"
            :style="{ height: '60%' }"
        >
            <div class="popup_content">
                <!-- 优惠明细 -->
                <div class="discount_details">优惠明细</div>
                <div class="coupon_list" v-for="item of this.coupon_list" :key="item.hid">
                    <span class="price">
                        ¥<span>
                            {{ item.h_price }}
                        </span>
                    </span>
                    <div v-if="item.hid==1">
                        <span> 指定商品满 300 可使用，可跨店</span>
                        <span>距到期时间仅剩 2 天</span>
                    </div>
                    <div v-else>
                        <span>满{{ item.h_price * parseInt((Math.random() + 1) * 3) }}可使用</span>
                        <span> 有效期至2020-12-30 23.59 </span>
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 购物卡 -->
        <van-popup
            v-model="cardShow"
            closeable
            close-icon="close"
            position="bottom"
            :style="{ height: '60%' }"
        >
            <div class="card_content">
                <div class="card_details">购物卡明细</div>
                <div class="card_list" v-for="item of this.coupon_list" :key="item.hid">
                    <img src="../assets/img/card_moddle.jpg" alt="">
                    <span class="price">
                        <span class="total">
                            {{ item.h_price }}
                        </span>
                        <span class="surplus">
                            剩余：<span class="surpuls_price">{{ Math.floor(item.h_price * Math.random())}}</span>
                        </span>
                    </span>
                    <div class="date">
                        <span> 2021-12-30 23.59 </span>
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 设置 -->
        <van-popup
            v-model="settingShow"
            closeable
            close-icon="close"
            position="bottom"
            :style="{ height: '60%' }"
        >
            <div class="setting">
                <theme class="theme" />
            </div>
        </van-popup>
    </div>
</template>

<script>
import Theme from "../components/Theme.vue";
export default {
    created() {
        // console.log(window.sessionStorage.getItem('token'));
        let token = window.sessionStorage.getItem("token");
        if (!!token) {
            this.isToken = true;
            // 添加默认头像
            this.avatar =
                "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3163479695,2609507199&fm=26&gp=0.jpg";
            // 获取用户信息
            this.$axios.get(`/user/login_user/${token}`).then((res) => {
                // console.log(res.data.data[0]);
                this.data_list = res.data.data[0];
                // 通过用户 id 进行查寻对应的相关信息   这里需要 Primary
            });
            // 获取优惠券 / 购物卡
            this.$axios.get("/my/coupon").then((res) => {
                // console.log(res.data.data);
                this.coupon_list = res.data.data;
            });
        }
        // 获取用户信息
    },
    data() {
        return {
            isToken: '',
            data_list: [],
            coupon_list: [],
            avatar: "",
            couponShow: false,
            cardShow: false,
            settingShow: false,
        };
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        getMyDynamic(){

        },
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login');
            this.isToken = false;
        },
        toggle_user(){
            this.$router.push('/login');
        },
        showCoupon(){
            if(this.isToken) this.couponShow = true;
        },
        showCard(){
            if(this.isToken) this.cardShow = true;
        },
        goSetting(){
            this.settingShow = true;
        }
    },
    components: {
        Theme,
    },
};
</script>

<style lang="scss">
.my {
    width: 10rem;
    // min-height: 100vh;
    padding-bottom: 60px;
    position: relative;
    header {
        width: 100%;
        height: 5rem;
        background-color: $bgColor;
    }
    .list {
        width: 9rem;
        height: 3.5rem;
        background-color: #fff;
        margin: -1.75rem 0.5rem 0;
        border-radius: 5px;
        position: relative;
        .img {
            width: 2rem;
            height: 2rem;
            background-color: rgb(107, 107, 107);
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -70%);
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .username {
            position: absolute;
            top: 1rem;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .option {
            width: 100%;
            height: 2.1rem;
            // background-color: rgba(80, 53, 231, 0.719);
            position: absolute;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: space-around;
            // .strategy{
            //     color: #000;
            // }
            & > a,
            &>div {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 0.35rem;
                color: #666;
                .van-icon-label::before,
                .van-icon-location::before,
                .van-icon-bill::before,
                .van-icon-coupon::before {
                    font-size: 25px;
                    margin-bottom: 5px;
                }
                & > span {
                    margin-top: 5px;
                }
            }
        }
    }
    .about{
        margin-top: 0.6rem;
        .van-list{
            margin-top: 0.25rem;
        }
        .van-cell__value {
            display: flex;
            justify-content: space-between;
            span{
                display: flex;
                align-items: center;
                .van-icon{
                    margin-right: 3px;
                }
            }
        }
        .toggle .van-cell__value ,
        .logout .van-cell__value {
            display: flex;
            justify-content: center;
        }
    }

    .van-nav-bar {
        background-color: transparent;
    }
    .van-hairline--bottom::after {
        border: 0;
    }
    .van-nav-bar__title {
        color: #ccc;
    }
    .popup_content{
        .discount_details{
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            margin-bottom: 0.7rem;
            color: #f00;
        }
        .coupon_list{
            margin: 0.4rem 1.2rem;
            display: flex;
            border-radius: 5px;
            border: 1px solid #f40;
            padding: 15px;
            color: #f00;
            .price{
                font-size: 0.3rem;
                flex-basis: 2rem;
                display: flex;
                align-items: center;
                span{
                    font-size: 0.7rem;
                    margin-left: 4px;
                }
            }
            &>div{
                font-size: 0.3rem;
                span{
                    display: block;
                    display: flex;
                    flex-wrap: nowrap;
                    line-height: 0.4rem;
                }
            }
        }
    }
    .card_content{
        .card_details{
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            // margin-bottom: 0.7rem;
            color: #f00;
        }
        .card_list{
            width: 4rem;
            height: 2.5rem;
            margin: 0.5rem 0.5rem;
            display: inline-block;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            &>span,
            &>div{
                position: absolute;
                top:0;
                left: 0;
            }
            .total{
                position: absolute;
                top: 0.44rem;
                left: 0.28rem;
                font-size: 0.5rem;
            }
            .surplus{
                position: absolute;
                top: 0.43rem;
                right: -3.95rem;
                width: 2rem;
                font-size: 0.3rem;
                display: flex;
                align-items: center;
                .surpuls_price{
                    font-size: 0.5rem;
                }
            }
            .date>span{
                position: absolute;
                width: 4rem;
                bottom: -2.3rem;
                font-size: 0.3rem;
                left: 0.5rem;
                // transform: translateX(-50%);
            }
        }
    }
    .setting{
        .theme{
            margin-top: 100px;
        }
    }
}
</style>