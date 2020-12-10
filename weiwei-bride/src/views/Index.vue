<template>
    <div class="index">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img class="image" v-lazy:background-image="image.h_photo" />
            </van-swipe-item>
        </van-swipe>
        <van-grid :column-num="4">
            <van-grid-item v-for="(item, index) in styleImages" :key="item.hid">
                <div class="image_style">
                    <van-image :src="item.h_photo" />
                </div>
                <p class="style_text">{{ style_title[index] }}</p>
            </van-grid-item>
        </van-grid>
        <div class="activaty">
            <div class="wrap" v-for="item in activity" :key='item.hid'>
                <img :src="item.h_photos">
                <span class="title">{{ item.h_title }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.getBannerImages();
        this.getStyleImages();
        this.getActivity();
    },
    data(){
        return{
            images: [],
            styleImages: [],
            style_title: ['韩式风','法式风','欧式风','中国风'],
            activity: [],
        }
    },
    methods: {
        // 获取首页 banner 图片
        getBannerImages(){
            this.$axios.get('/home/index/banner').then(res => {
                this.images = res.data.data;
            });
        },
        // 获取风格 图片
        getStyleImages(){
            this.$axios.get('/home/index/style').then(res => {
                this.styleImages = res.data.data;
            });
        },
        // 获取参与活动的商品图片
        getActivity(){
            this.$axios.get('/home/index/activity').then(res => {
                this.activity = res.data.data;
                this.activity.forEach(item => {
                    let photo = item.h_photos.split('---')[0];
                    item.h_photos = photo;
                })
                console.log(this.activity)
            })
        }
    }
}
</script>

<style lang="scss">
.index{
    margin-top: 46px;
    padding-bottom: 50px;
    .van-swipe__track{
        height: 220px !important;
        .van-swipe-item{
            overflow: hidden;
            border: 10px solid rgba(255, 255, 255, 0.6);
            img{
                width: 100%;
                height: 220px;
                background-position: center center;
                background-size: cover;
            }
        }
    }
    .van-grid{
        // top: 5px;
        .van-grid-item__content{
            background-color: rgba(255, 255, 255, 0.6);
        }
        .image_style{
            padding: 0;
            width: 100%;
            height: 7vh;
            overflow: hidden;
            border-radius: 5px;
        }
        .style_text{
            margin-top: 10px;
            font-size: 14px;
        }
    }
    .activaty{
        column-count: 2;
        column-gap: 15px;
        width: 90%;
        margin: 1em auto;
        .wrap{
            box-shadow: 0 0 10px #000;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.7);
            overflow: hidden;
            margin-bottom: 20px;
            width: 100%;
            img{
                width: 100%;
                // border-radius: 5px;
            }
            span{
                display: inline-block;
                margin: 10px;
                background-color: transparent;
                font-size: 13px;
                line-height: 17px;
                color: #242424;
                font-weight: 600;
            }
        }
        
    }
} 
</style>