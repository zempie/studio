<template>
    <div class="contentBoxBlock">
        <div class="head"> {{title}} <span class="star">{{star}}</span> </div>
        <div class="body">
            <slot></slot>
        </div>
    </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class ContentBoxBlock extends Vue {
    @Prop() private title! : string;
    @Prop() private star! : string;
}
</script>

<style scoped lang="scss">
    .contentBoxBlock {
        display: grid;
        grid-template-columns: 20% auto;

        @media (max-width: 540px) {
            display: block;
        }

        .head {
            padding-top: 15px;
        }
        .body {

        }
        .star{
            color: #C10015;
        }
    }

</style>