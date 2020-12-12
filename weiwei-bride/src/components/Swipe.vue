<template>
    <van-swipe :autoplay="3000" indicator-color="#7232dd">
        <van-swipe-item
            v-for="(image, index) in good_data.h_photos"
            :key="index"
        >
            <img v-lazy:background-image="image" class="image" />
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
    props:['good_data']
};
</script>