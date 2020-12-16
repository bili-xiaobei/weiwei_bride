<template>
    <div>
        <!-- 顶部区域开始 -->
        <div id="my-header">
            <mt-header title="最新优惠活动" fixed>
                <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </div>
        <!-- 顶部区域结束 -->

      <!-- 轮播图开始 -->
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(photo,index) of this.bannerPhotoes" :key="index"><img :src="photo.h_photo"></mt-swipe-item>
            </mt-swipe>
      <!-- 轮播图结束 -->

      <!-- 浏览页面开始 -->
      <div id="my-footer" >
          <!-- 一个信息 -->
          <div id="activity">
          <!-- 图片信息 -->
            <div class="articleImg" v-for="(photo,index) of this.photoes" :key="index">
                <img :src="photo">
            </div>

            <div class="activity-main">
                <!-- 主题 -->
                <div class="articleIntroduction" v-for="(item,index) of this.data_list" :key="index">{{item.h_title}}</div>

                <!-- 风格 -->
                <div class="articleStyle">xxx风格</div>

                <!-- 价格 -->
                <div class="articlePrice" v-for="(item,index) of this.price" :key="index">{{item.h_price}}</div>
            </div>
          </div>
        

      </div>
      <!-- 浏览页面结束 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            data_list: [],
            photoes:[],
            bannerPhotoes:[],
            title:[],
            price:[]
        }
    },
    mounted(){
        this.$axios.get("home/index/banner").then(res=>{
            this.bannerPhotoes=res.data.data;
            // console.log(this.bannerPhotoes)
        })

        this.$axios.get("/home/index/activity").then(res=>{
            // console.log(res.data.data);
            this.data_list = res.data.data;
            this.data_list.forEach(item => {
                item.h_photos = item.h_photos.split('---');
                this.photoes=item.h_photos;
                // this.title=item.h_title;
                // this.price=item.h_price;
                // console.log(this.title)
                // console.log(this.price)
            })
                // console.log(this.photoes)
        })
    }
}
</script>

<style scoped>
/* 轮播图样式 */
 
    /*  */
  #my-body{
      padding: 100px;
      padding-top: 200px;
      background-color: #aaa;
      text-align: center;
  }
  #activity{
      position: relative;
  }
  .articleImg img{
      border-radius: 4px;
      width: 200px;
      margin-top: 10px;
      margin-left: 10px;
  }
  .activity-main{
      position: absolute;
      font: 24px Microsoft Yahei;
      left: 220px;
      top: 10px;
  }
  .mint-swipe{
      height: 300px;
      margin-top: 40px;
  }
  
</style>