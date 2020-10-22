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
    border-bottom: 1px solid rgba(95, 81, 81, 1);
    line-height: 1px;
}

</style>