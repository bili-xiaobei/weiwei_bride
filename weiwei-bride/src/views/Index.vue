<template>
    <div class="index">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img class="image" v-lazy:background-image="image" />
            </van-swipe-item>
        </van-swipe>
        <van-grid :column-num="4">
            <van-grid-item v-for="(item, index) in styleImages" :key="item.hid">
                <div class="image_style">
                    <van-image :src="item" />
                </div>
                <p class="style_text">{{ style_title[index] }}</p>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
export default {
    created(){
        this.getBannerImages();
        this.getStyleImages();
    },
    data(){
        return{
            images: [],
            styleImages: [],
            style_title: ['韩式风','法式风','欧式风','中国风']
        }
    },
    methods: {
        // 获取首页 banner 图片
        getBannerImages(){
            this.$axios.get('/home/index/banner').then(res => {
                let result = res.data.data;
                for (const item in result) {
                    this.images.push(result[item].h_photo)
                }
            });
        },
        // 获取风格 图片
        getStyleImages(){
            this.$axios.get('/home/index/style').then(res => {
                let result = res.data.data;
                for (const item in result) {
                    this.styleImages.push(result[item].h_photo)
                }
                console.log(this.styleImages)
            });
        }
    }
}
</script>

<style lang="scss">
.index{
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
            height: 55px;
            overflow: hidden;
            border-radius: 5px;
        }
        .style_text{
            margin-top: 10px;
        }
    }
} 
</style>