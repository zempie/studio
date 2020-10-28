<template>
    <div class="fixedBottom fixed-bottom text-right q-py-md q-color-picker--dark q-mb-xl">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class FixedBottom extends Vue {
    mounted() {
    }
}
</script>

<style scoped lang="scss">
    .fixedBottom {
        background-color: #000000;
        z-index: 1000;
    }
</style>