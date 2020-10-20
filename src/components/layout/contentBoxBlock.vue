<template>
    <div class="contentBoxBlock">
        <div class="head"> {{title}} </div>
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
            .hintText {
                padding: 16px 0 16px 0;
                color: #777;
                font-size: 13px;
            }
        }
    }

</style>