<template>
    <div class="my">
        <theme />
    </div>
</template>

<script>
import Theme from '../components/Theme.vue'
export default {
    created(){
    },
    data() {
        return { };
    },
    methods: {
        showPopup() {
            this.show = true;
        }
    },
    components: {
        Theme
    }
};
</script>

<style lang="scss">
    
</style>