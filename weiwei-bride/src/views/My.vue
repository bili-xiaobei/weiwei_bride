<template>
    <div class="my">
        <!-- <theme /> -->
        <header>
            <van-nav-bar title="我的" fixed />
        </header>
        <div class="list">
            <div class="avatar">
                <div class="img">
                    <img :src="avatar" alt="" v-if="data_list.token" />
                </div>
                <div class="username">{{ data_list.username }}</div>
            </div>
            <div class="option">
                <div class="strategy">
                    <!-- 图标 -->
                    <van-icon name="label" color="#1989fa" />
                    提议
                    <span v-if="data_list.token">12</span>
                    <!-- 个数 -->
                </div>
                <div class="address">
                    <!-- 图标 -->
                    <van-icon
                        name="location"
                        color=" rgba(80, 53, 231, 0.719)"
                    />
                    我的位置
                    <span v-if="data_list.token">2</span>
                    <!-- 个数 -->
                </div>
                <div class="coupon">
                    <!-- 图标 -->
                    <van-icon name="bill" color="rgb(57, 228, 219)" />
                    优惠券
                    <span v-if="data_list.token"> {{ coupon_list.length }} </span>
                    <!-- 个数 -->
                </div>
                <div class="card">
                    <!-- 图标 -->
                    <van-icon name="coupon" color="rgb(253, 71, 71)" />
                    购物卡
                    <span v-if="data_list.token"> {{ coupon_list.length + 3 }} </span>
                    <!-- 个数 -->
                </div>
            </div>
        </div>
        <div class="about">
            <van-list>
                <van-cell>
                    <!-- 图标 -->
                    <span @clock="getMyDynamic">我的动态</span>
                    <span></span>
                    <!-- 动态个数 -->
                </van-cell>
                <van-cell>
                    <!-- 图标 -->
                    <span>性别</span>
                    <span v-if="data_list.token">{{ data_list.sex == 1 ? '男' : '女' }}</span>
                    <!-- 动态个数 -->
                </van-cell>
                <van-cell>
                    <!-- 图标 -->
                    <span>电话</span>
                    <span>{{ data_list.phone }}</span>
                    <!-- 动态个数 -->
                </van-cell>
                <van-cell>
                    <!-- 图标 -->
                    <span>积分</span>
                    <span v-if="data_list.token">1453</span>
                    <!-- 动态个数 -->
                </van-cell>
                <van-cell>
                    <!-- 图标 -->
                    <span>隐私</span>
                </van-cell>
                <van-cell>
                    <!-- 图标 -->
                    <span>通用</span>
                </van-cell>
            </van-list>
            <van-list>
                <van-cell>
                    <!-- 图标 -->
                    <span>设置</span>
                    <!-- 动态个数 -->
                </van-cell>
            </van-list>
            <van-list class="toggle">
                <van-cell>
                    <!-- 图标 -->
                    <span>切换账户</span>
                    <!-- 动态个数 -->
                </van-cell>
            </van-list>
            <van-list class="logout">
                <van-cell>
                    <!-- 图标 -->
                    <span>退出登录</span>
                    <!-- 动态个数 -->
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
import Theme from "../components/Theme.vue";
export default {
    created() {
        // console.log(window.sessionStorage.getItem('token'));
        let token = window.sessionStorage.getItem("token");
        if (!!token) {
            // 添加默认头像
            this.avatar =
                "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3163479695,2609507199&fm=26&gp=0.jpg";
            // 获取用户信息
            this.$axios.get(`/user/login_user/${token}`).then((res) => {
                console.log(res.data.data[0]);
                this.data_list = res.data.data[0];
                // 通过用户 id 进行查寻对应的相关信息   这里需要 Primary
            });
            // 获取优惠券 / 购物卡
            this.$axios.get("/my/coupon").then((res) => {
                console.log(res.data.data);
                this.coupon_list = res.data.data;
            });
        }
        // 获取用户信息
    },
    data() {
        return {
            isToken: false,
            data_list: [],
            coupon_list: [],
            avatar: "",
        };
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        getMyDynamic(){

        },
    },
    components: {
        Theme,
    },
};
</script>

<style lang="scss">
.my {
    width: 10rem;
    height: 100vh;
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
        // display: flex;
        // // justify-content: center;
        // flex-wrap: nowrap;
        // align-items: center;
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
            & > div {
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
        margin-top: 30px;
        .van-list{
            margin-top: 10px;
        }
        .van-cell__value {
            display: flex;
            justify-content: space-between;
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
}
</style>