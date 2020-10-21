<template>
    <div class="contentBox">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class ContentBox extends Vue {

    mounted() {

    }
}
</script>

<style scoped lang="scss">

.contentBox {
    max-width: 960px;
    width: 100%;
    padding: 16px;
    margin: 0 auto;
    background-color: black;

    &.shadowBox {
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .14), 0 2px 2px 0 rgba(0, 0, 0, .098), 0 1px 5px 0 rgba(0, 0, 0, .084);
    }

    &.borderBox {
        border : 1px solid #000000;
    }
}



</style>