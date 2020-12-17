<template>
    <div class="my">
        <van-button @click="showPopup">更改主题</van-button>
        <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '8.2rem', width: '10rem' }"
        >
            <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
            >
            </van-picker>
        </van-popup>
    </div>
</template>

<script>
import cut from "../../public/js/publicBGC.js";
import { Toast } from "vant";
export default {
    created() {

    },
    data() {
        return {
            show: false,
            showPicker: false,
            columns: [
                "蔷薇色",
                "红赤色",
                "瑠璃色",
                "媚茶色",
                "青緑色",
                "常盘色",
                "纯黑色",
                "淘宝红"
            ],
            columns_color: [
                '#f05b72cc',
                '#d93a49cc',
                '#2a5caacc',
                '#454926cc',
                '#007d65cc',
                '#007947cc',
                '#000000cc',
                '#ff4400cc'
            ]
        };
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        onConfirm(value, index) {
            cut(this.columns_color[index]);
            this.show = false;
        },
        onCancel() {
            Toast("取消");
        },
    },
};
</script>

<style lass="scss">
.van-button{
    width: 10rem;
    border-width: 1px 0; 
}
</style>