<template>
    <div class="title_com">
        <span class="g_title"><span class="weiwei">薇薇新娘</span>{{ good_title }}</span>
    </div>
</template>

<script>
export default {
    props: ["good_title"],
};
</script>

<style lang="scss">
.title_com {
  display: flex;
    .weiwei {
        display: inline-block;
        background-color:$bgColor;
        color: #fff;
        padding: 3px 8px;
        border-radius: 10px;
        margin-right: 2px;
        margin-top: -2px;
        font-size: 12px;
    }
    .g_title {
        display: inline-block;
        margin: 10px 20px;
    }
}
</style>