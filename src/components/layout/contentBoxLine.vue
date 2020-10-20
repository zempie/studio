<template>
    <div class="contentBoxLine">
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class ContentBoxLine extends Vue {
    @Prop() private title! : string;
}
</script>

<style scoped lang="scss">
.contentBoxLine {
    margin: 20px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    line-height: 1px;
}

</style>