<template>
    <van-swipe :autoplay="3000" :indicator-color="fontColor">
        <van-swipe-item
            v-for="(image, index) in good_data.h_photos"
            :key="index"
        >
            <img v-lazy:background-image="image" class="image" />
        </van-swipe-item>
    </van-swipe>
</template>

<script>
import style from '../../public/css/_variable.scss';
export default {
    props:['good_data'],
    data(){
        return{
            fontColor: style.navColor
        }
    }
};
</script>