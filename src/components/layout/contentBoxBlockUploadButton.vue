<template>
    <q-btn class="uploadButton" @click="$emit('@click');">
        <q-icon name="publish" />
        <div>{{ text }}</div>
    </q-btn>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class ContentBoxBlockUploadButton extends Vue {
    @Prop() private text! : string;
}
</script>

<style scoped lang="scss">
@import "src/styles/quasar";

.uploadButton {
    background-color: $grey-8;

    margin-top: 20px;
    margin-left: 20px;
    max-width: 150px;
    width: 90%;
    border: 0;
    padding: 10px;
    user-select: none;

    @media (max-width: 165px) {
        margin-left: 0;
    }

    i {
        font-size: 20px;
    }
}

</style>