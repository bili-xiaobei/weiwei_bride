<template>
    <div class="banner_good">
        <van-nav-bar
            class="title"
            title="商品详情"
            fixed
            left-text="返回"
            right-text=""
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
        <div class="content">
            <van-pull-refresh
                v-model="isLoading"
                success-text="刷新成功"
                @refresh="onRefresh">
                <!-- <van-swipe :autoplay="3000" indicator-color="#7232dd">
                    <van-swipe-item
                        v-for="(image, index) in good_data.h_photos"
                        :key="index">
                        <img v-lazy:background-image="image" class="image" />
                    </van-swipe-item>
                </van-swipe> -->
                <swipe :good_data="good_data"/>
                <span class="price"><span>lkdsfklsdjfklg</span></span>
                <good-title :good_title="good_data.h_title" />
            </van-pull-refresh>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服"/>
            <van-goods-action-icon icon="cart-o" text="购物车"/>
            <van-goods-action-icon icon="shop-o" text="店铺"/>
            <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" />
            <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
        </van-goods-action>
        
    </div>
</template>

<script>
import Swipe from '../components/Swipe.vue';
import GoodTitle from '../components/GoodTitle.vue';
export default {
    created() {
        let hid = location.href.split("/")[location.href.split("/").length - 1];
        this.$axios.get(`/home/index/banner/${hid}`).then((res) => {
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
        onClickLeft(){
            this.$router.push('/');
        },
        onClickRight(){

        }
    },
    components: {
        Swipe,
        GoodTitle
    }
};
</script>

<style lang='scss'>
.banner_good {
    i,
    .van-nav-bar__text,
    .van-nav-bar__title{
        color:$bgColor !important;
    }
    .title{
        color:$bgColor !important;
    }
    // padding: 10px;
    .van-swipe-item {
        border-radius: 3px;
        // overflow: hidden;
        .image {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            width: 10rem;
            height: 12rem;
        }
    }
    .content{
        // height: 10rem;
        padding-top: 45px;
        padding-bottom: 200px;
    }
}
</style>