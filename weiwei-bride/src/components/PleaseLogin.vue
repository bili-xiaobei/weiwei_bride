<template>
    <div class="please_login">
        <router-link to="/login">前去登录</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.please_login{
    width: 10rem;
    // max-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-bottom: -100px;
    .shop_cart{
        min-height: 0;
        margin-bottom: 0;
    }
    a{
        display: flex;
        width: 4rem;
        height: 1rem;
        justify-content: center;
        align-items: center;
        font-size: 0.5rem;
        line-height: 1rem;
        border: 0;
        background-color: $bgColor;
        border-radius: 4px;
        color: #fff;
    }
}
</style>