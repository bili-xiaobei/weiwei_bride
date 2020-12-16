<template>
    <div class="register">
        <!-- 頂部區域開始 -->
        <div>
            <mt-header title="注册" fixed>
                <router-link to="/" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
                <router-link to="/login" slot="right"> 登录 </router-link>
            </mt-header>
        </div>
        <!-- 頂部區域結束 -->

            <img src="../assets/img/logo.png"  class="logo" />

        <!-- 表單區域開始 -->
        <div id="operateDiv">
            <div class="content">
                <mt-field
                    type="text"
                    placeholder="请输入用户名"
                    v-model="username"
                    :state="usernameState"
                    @click.native.capture="checkUsername"
                >
                </mt-field>
                <img src="../assets/img/username.png" class="username_img" />
                <mt-field
                    type="password"
                    placeholder="请输入密码"
                    v-model="password"
                    :state="passwordState"
                    @click.native.capture="checkPassword"
                ></mt-field>
                <img class="password_img" src="../assets/img/password.png" />
                <mt-field
                    type="password"
                    placeholder="请再次输入密码"
                    v-model="conpassword"
                    :state="conpasswordState"
                    @click.native.capture="checkConpassword"
                ></mt-field>
                <img class="conpassword_img" src="../assets/img/conpassword.png" />
                <mt-button class="button" @click="handle">免费注册</mt-button>
            </div>
        </div>
        <!-- 表單區域結束 -->
    </div>
</template>

<script>
import qs from "qs";
export default {
    data() {
        return {
            //用户名、密码及确认密码
            username: "123456789",
            password: "123456789",
            conpassword: "123456789",
            //用户名、密码及确认密码的状态
            usernameState: "",
            passwordState: "",
            conpasswordState: "",
        };
    },
    methods: {
        // 校验用户名
        checkUsername() {
            let usernameRegExp = /^[0-9A-Za-z]{6,12}$/;
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
                    duration: 2500,
                });
                this.passwordState = "error";
                return false;
            }
        },
        // 校验两次密码是否一致
        checkConpassword() {
            if (this.password == this.conpassword) {
                this.conpasswordState = "success";
                return true;
            } else {
                this.$toast({
                    message: "两次密码不一致",
                    position: "middle",
                    duration: 2500,
                });
                this.conpasswordState = "error";
                return false;
            }
        },
        //用户注册
        handle() {
            //调用之前的检测用户名、密码及两次密码是否一致函数
            //需要注意的是:此时会引发短路求值的现象
            //A.在逻辑或运算时,第一个表达式的结果为true会造成短路
            //B.在逻辑与运算时,第一个表达式的结果为false会造成短路
            if (
                this.checkUsername() &&
                this.checkPassword() &&
                this.checkConpassword()
            ) {
                //此时需要将用户名、密码等信息的提交到WEB服务器
                let obj = { username: this.username, password: this.password };
                let str = this.qs.stringify(obj);
                this.$axios.post("/user/register", str).then((res) => {
                    if (res.data.code == 400) {
                        this.$messagebox("提示信息", "用户已存在");
                    }
                    if (res.data.code == 200) {
                        this.$router.push("/");
                    }
                });
            }
        },
    },
};
</script>

<style lang="scss">
.register {
    width: 10rem;
    min-height: 100vh;
    // background-image: url('../assets/indexBGM.jpg');
    background-size: cover;
    background-color: rgba(202, 202, 202, 0.7);
    .mint-button--default {
        color: #fff !important;
    }
    .mint-header {
        background-color: $bgColor;
        height: 46px;
        color: #fff;
    }
    .is-right,
    .mint-header-title {
        font-size: 20px !important;
        font-weight: 600;
    }
    .logo {
        width: 5rem;
        margin: 0 2.5rem;
        margin-top: 3rem;
        margin-bottom: 1rem;
    }
    #operateDiv {
        width: 8rem;
        // height: 5rem;
        // background-color: #f00;
        margin: 0 auto;
        padding-bottom: 3rem;
        .content {
            
            img {
                // width: 0.6rem;
                position: absolute;
                margin-top: -48px;
            }
            .username_img{
                width: 25px;
            }
            .password_img{
                width: 20px;
            }
            .conpassword_img{
                width: 24px;
            }
            .mint-field-core{
                background-color: transparent;
                margin-left: 20px;
            }
            .mint-button {
                width: 8rem;
                margin: 0 auto;
                .mint-button-text{
                    color: #fff;
                }
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
    }
    .registerDiv {
        margin-top: 10px;
        .right {
            position: absolute;
            right: 1rem;
            text-align: right;
        }
    }
}
</style>