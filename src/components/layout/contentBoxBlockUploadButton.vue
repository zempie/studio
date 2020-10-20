<template>
    <button class="uploadButton" @click="$emit('@click');">
        <q-icon name="publish" />
        <div>{{ text }}</div>
    </button>
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
.uploadButton {
    margin-top: 20px;
    margin-left: 20px;
    max-width: 150px;
    width: 90%;
    color: #777777;
    border: 0;
    padding: 20px;
    user-select: none;

    @media (max-width: 165px) {
        margin-left: 0;
    }

    i {
        font-size: 20px;
    }

    &:hover {
        background-color: rgb(227, 224, 224);
        color: #474747;
    }
}

</style>