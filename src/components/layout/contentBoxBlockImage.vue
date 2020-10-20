<template>
    <q-img class="blockImage" :src="src">
    </q-img>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class ContentBoxBlockImage extends Vue {
    @Prop() private src! : string;
}
</script>

<style scoped lang="scss">
.blockImage {
    max-width: 250px;
    width: 90%;
    margin-top: 20px;
}

</style>