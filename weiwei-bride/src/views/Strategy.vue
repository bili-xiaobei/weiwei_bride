<template>
    <div class="strategy">
        <van-tabs v-model="s_active" @click="getStyleData" sticky>
            <van-tab
                :title="item_title"
                v-for="item_title of titleArr"
                :key="item_title"
            >
                <div class="content" v-for="item in data_list" :key="item.hid">
                    <!-- <header>
                        <div class="avatar"></div>
                        <div class="title">
                            <div>{{ item.h_author }}</div>
                            <div>{{ item.h_date }}</div>
                        </div>
                    </header> -->
                    <div class="h_title">{{ item.h_title }}</div>
                    <div>
                        <img class="img" :src="item.h_photo.split('---')[0]" alt="">
                    </div>
                    <div class="text" v-html="item.h_content"></div>
                    <span class="more_style"><van-cell is-link @click="showPopup">查看全部</van-cell></span>
                    <div class="type"><span>风格种类:</span> 裳霏婚纱礼服2019新款</div>
                    <div class="browse_fabulou">
                        <div><van-icon name="eye-o"/>{{ item.h_browse }}</div>
                        <div><van-icon name="good-job-o" />{{ item.h_fabulou }}</div>
                    </div>
                    <!-- <van-popup v-model="show">内容</van-popup> -->
                    <van-popup
                        v-model="show"
                        closeable
                        close-icon="close"
                        position="bottom"
                        :style="{ height: '60%' }"
                    >
                        <div class="popup_content">
                            
                        </div>
                    </van-popup>
                </div>
            </van-tab>
        </van-tabs>
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
            titleArr: ["礼服", "风格", "礼物", "注意", "姿势"],
            data_list: [],
            show: false,
        };
    },
    methods: {
        getStyleData() {
            this.$axios
                .get(`/strategy/style/${this.s_active + 1}`)
                .then((res) => {
                    this.data_list = res.data.data;
                });
        },
         showPopup() {
            this.show = true;
        },
    },
};
</script>

<style lang="scss">
.strategy {
    color: rgb(80, 80, 80);
    font-size: 0.4rem;
    .van-tabs__wrap {
        height: 40px !important;
        background-color: transparent;
    }
    .van-tabs__line {
        background-color: $sizeColor;
    }
    .van-tabs__nav{
        background-color: $bgColor;
    }
    .content {
        padding: 20px;
        border-bottom: 5px double $bgColor;
        header {
            display: flex;
            .avatar {
                width: 1.5rem;
                height: 1.5rem;
                background-color: $bgColor;
                border-radius: 50%;
                margin-right: 15px;
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
            font-size: 0.5rem;
            color: $bgColor;
            font-weight: 900;
            padding-bottom: 10px;
            border-bottom: 1px solid $bgColor;
        }
        .img{
            box-sizing: border-box;
            width: 100%;
        }
        .text{
            
            p{
                text-indent: 0.8rem;
                line-height: 0.6rem;
            }
            span{
                font-size: 0.4rem;
                color: $bgColor;
            }
            margin: 10px 0;
            text-overflow: ellipsis; /*设置隐藏部分为省略号*/
            overflow: hidden; /*设置隐藏*/
            display: -webkit-box;
            -webkit-line-clamp: 5; /*设置显示行数，此处为2行，可设置其他数字*/
            -webkit-box-orient: vertical;
        }
        .more_style{
            display: block;
            width: 100%;
            padding-right: 20px;
            text-align: right;
            font-size: 14px;
            .van-cell{
                background-color: transparent;
                .van-cell__value--alone{
                    color: $bgColor !important;
                    text-align: right;
                }
                .van-cell__right-icon{
                    color: $bgColor;
                }
            }
        }
        .type{
            margin-top: 5px;
            span{
                font-size: 0.44rem;
            }
        }
        .browse_fabulou{
            width: 100%;
            line-height: 30px;
            display: flex;
            justify-content: flex-end;
            padding: 5px 20px 0 0;
            div{
                display: flex;
                align-items: center;
                margin-left: 15px;
            }
        }
        .van-overlay{
            background-color: rgba(0, 0, 0, 0.2);
        }
        .van-popup{
            background-color: $bgColor;
            // background-color: rgba(255, 255, 255, 0.83);
        }
    }
    
}
</style>