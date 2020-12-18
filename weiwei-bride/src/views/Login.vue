<template>
    <div class="login">
        <div>
            <mt-header title="登录" fixed>
              <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
              </router-link>
            </mt-header>
        </div>
        <div>
            <img src="../assets/img/logo.png" class="logo" />
        </div>
        <div class="operateDiv">
            <div class="content">
                <!-- 账号 -->
                <mt-field
                    type="text"
                    placeholder="请输入用户名"
                    v-model="username"
                    @blur.native.capture="checkUsername"
                    :state="usernameState"
                >
                </mt-field>
                <img src="../assets/img/username.png" class="user_img" alt="" />
                <mt-field
                    type="password"
                    placeholder="请输入密码"
                    v-model="password"
                    @blur.native.capture="checkPassword"
                    :state="passwordState"
                >
                </mt-field>
                <img src="../assets/img/password.png" alt="" />
            </div>
            <!-- 登录 -->
            <mt-button size="large" @click="handle">登录</mt-button>
            <!-- 免费注册块 -->
            <div class="registerDiv">
                <span
                    ><router-link to="/register" class="left"
                        >免费注册</router-link
                    ></span
                >
                <span
                    ><router-link to="" class="right"
                        >忘记密码?</router-link
                    ></span
                >
            </div>
            <!-- 第三方登录 -->
            <!-- <mt-tabbar>
                <mt-tab-item>
                    <img slot="icon" src="../assets/img/weixin.png" alt="" />
                </mt-tab-item>
                <mt-tab-item id="other">
                    <img slot="icon" src="../assets/img/qq.png" alt="" />
                </mt-tab-item>
                <mt-tab-item id="other">
                    <img slot="icon" src="../assets/img/weibo.png" alt="" />
                </mt-tab-item>
            </mt-tabbar> -->
        </div>
    </div>
</template>
<style lang="scss">
.login {
    width: 10rem;
    min-height: 100vh;
    // background-image: url('../assets/indexBGM.jpg');
    background-size: cover;
    background-color: rgba(202, 202, 202, 0.7);
    .mint-button--default{
      color: #fff !important;
    }
    .mint-header {
        background-color: $bgColor;
        height: 46px;
        color: #fff;
    }
    .mint-header-title {
        font-size: 18px !important;
        font-weight: 600;
    }
    .logo {
        width: 5rem;
        margin: 0 2.5rem;
        margin-top: 3rem;
        margin-bottom: 1rem;
    }
    .operateDiv {
        width: 8rem;
        margin: 0 auto;
        padding-bottom: 3rem;
        .content {
            img {
                width: 20px;
                position: absolute;
                margin-top: -45px;
                // left: 10px;
                // transform: translateY(-50%);
            }
            .user_img {
                width: 24px;
            }
            .mint-field-core {
                margin-left: 20px;
                background-color: transparent;
            }
        }
        .mint-cell {
            background-color: transparent;
            border-bottom: 2px solid $bgColor;
            margin-bottom: 10px;
        }
    }
    .mint-button--default {
        background-color: $bgColor;
        color: #fff;
        font-weight: 900;
        .mint-button-text{
            color: #fff;
        }
    }
    .registerDiv {
      margin-top: 10px;
        .right {
          position:absolute;
          right: 1rem;
          text-align: right;
        }
    }
}
</style>
<script>
export default {
    data() {
        return {
            //用户名、密码
            username: "987654321",
            password: "123456789",
            //用户名、密码的状态
            usernameState: "",
            passwordState: "",
        };
    },
    methods: {
        // 校验用户名
        checkUsername() {
            let usernameRegExp = /([a-zA-Z0-9\u4e00-\u9fa5]){0,10}/;
            if (usernameRegExp.test(this.username)) {
                this.usernameState = "success";
                return true;
            } else {
                this.$toast({
                    message: "用户名错误",
                    position: "middle",
                    duration: 2500,
                });
                this.usernameState = "error";
                return false;
            }
        },
        // 校验密码
        checkPassword() {
            let passwordRegExp = /^[0-9A-Za-z]{8,16}$/;
            if (passwordRegExp.test(this.password)) {
                this.passwordState = "success";
                return true;
            } else {
                this.$toast({
                    message: "密码错误",
                    position: "middle",
                    // duration: 2500,
                });
                this.passwordState = "error";
                return false;
            }
        },
        //用户注册
        handle() {
            //调用之前的检测用户名、密码及两次密码是否一致函数
            //需要注意的是:此时会引发短路求值的现象
            //A.在逻辑或运算时,第一个表达式的结果为true会造成短路
            //B.在逻辑与运算时,第一个表达式的结果为false会造成短路
            if (this.checkUsername() && this.checkPassword()) {
                //此时需要将用户名、密码等信息的提交到WEB服务器
                this.$axios
                    .post(
                        "/user/login",
                        `username=${this.username}&password=${this.password}`
                    )
                    .then((res) => {
                        // console.log(res);
                        if (res.data.code == 400) {
                            this.$messagebox
                                .confirm("账号或密码错误", "提示信息")
                                .then((action) => {
                                    this.$router.push("/register");
                                })
                                .catch((error) => {});
                        }
                        if (res.data.meta.code == 200) {
                            window.sessionStorage.setItem('token', res.data.data[0].token);
                            this.$router.push("/");
                        }
                    });
            }
        },
    },
};
</script>