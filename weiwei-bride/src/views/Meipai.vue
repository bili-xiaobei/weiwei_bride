<template>
    <div class="meipai">
        <van-nav-bar title="美拍" />
        <div class="content" v-for="item in data_list" :key="item.hid">
            <header>
                <div class="avatar">
                    <img :src="item.avatar" alt="">
                </div>
                <div class="title">
                    <div>{{ item.h_author }}</div>
                    <div>{{ item.h_date }}</div>
                </div>
            </header>
            <div class="h_title">{{ item.h_title }}</div>
            <div>
                <img class="img" v-lazy="item.h_photo.split('---')[0]" alt="" />
            </div>
            <div class="browse_fabulou">
                <div><van-icon name="eye-o" />{{ item.h_browse }}</div>
                <div><van-icon name="star-o" />{{ item.h_collection }}</div>
                <div><van-icon name="good-job-o" />{{ item.h_fabulou }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getStyleData();
    },
    data() {
        return {
            s_active: 0,
            data_list: [],
            show: false,
        };
    },
    methods: {
        getStyleData() {
            this.$axios.get("/meipai/all").then((res) => {
                this.data_list = res.data.data;
                console.log(this.data_list)
            });
        },
        showPopup() {
            this.show = true;
        },
    },
};
</script>

<style lang="scss">
.meipai {
    color: rgb(80, 80, 80);
    font-size: 0.4rem;
    .van-nav-bar{
        background-color: $bgColor;
    }
    .van-tabs__wrap {
        height: 40px !important;
        background-color: transparent;
    }
    .van-tabs__line {
        background-color: $sizeColor;
    }
    .van-tabs__nav {
        background-color: $bgColor;
    }
    .content {
        padding: 20px;
        border-bottom: 2px solid $bgColor;
        header {
            display: flex;
            .avatar {
                width: 1.5rem;
                height: 1.5rem;
                background-color: $bgColor;
                border-radius: 50%;
                margin-right: 15px;
                img{
                    width: 100%;
                    border-radius: 50%;
                }
            }
            .title {
                background-color: transparent;
                div:nth-child(1) {
                    font-size: 0.5rem;
                    margin: 10px 3px 5px;
                }
            }
        }
        .h_title {
            // color: #f40;
            margin: 10px 0;
            font-size: 0.4rem;
            color: $bgColor;
            font-weight: 900;
            padding-bottom: 10px;
            border-bottom: 2px solid $bgColor;
        }
        .img {
            box-sizing: border-box;
            width: 100%;
        }
        .browse_fabulou {
            width: 100%;
            line-height: 30px;
            display: flex;
            justify-content: flex-end;
            padding: 5px 20px 0 0;
            div {
                display: flex;
                align-items: center;
                margin-left: 15px;
                .van-icon{
                    margin-right: 5px;
                }
            }
            
        }
    }
}
</style>