<template>
    <div class="my">
        <!-- <van-button @click="showPopup">更改主题</van-button> -->
        <van-button>修改个人信息</van-button>
        <van-cell is-link @click="showPopup" >展示弹出层</van-cell>
        <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '8.2rem', width: '10rem' }"
            @opened="renderColor"
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
                '#f05b72',
                '#d93a49',
                '#2a5caa',
                '#454926',
                '#007d65',
                '#007947',
                '#000000',
                '#ff4400'
            ]
        };
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        renderColor(){
            var lis = document.getElementsByClassName('van-picker-column__item');
            for (let i = 0; i < lis.length; i++) {
                lis[i].style.background = this.columns_color[i];
            }
        },
        onConfirm(value, index) {
            cut(this.columns_color[index]);
            this.show = false;
        },
        onCancel() {
            Toast("取消");
            this.show = false;
        },
    }
};
</script>

<style lass="scss">
.van-button{
    width: 10rem;
    border-width: 1px 0; 
}
.van-button{
    height: 1rem;
    line-height: 1rem;
    border: 0;
}
</style>