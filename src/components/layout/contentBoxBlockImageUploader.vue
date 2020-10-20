<template>
    <div class="uploader">
        <content-box-block-image v-if="url || defaultSrc" :src="url || defaultSrc"></content-box-block-image>
        <content-box-block-upload-button :text="text" v-on:@click="fileLoader.addFile()"></content-box-block-upload-button>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ContentBoxBlockImage from "@/components/layout/contentBoxBlockImage.vue";
import ContentBoxBlockUploadButton from "@/components/layout/contentBoxBlockUploadButton.vue";
import {FileLoader} from "@/common/fileLoader";

@Component({
    components: {ContentBoxBlockUploadButton, ContentBoxBlockImage}
})
export default class ContentBoxBlockImageUploader extends Vue {
    @Prop() private text! : string;
    @Prop() private defaultSrc! : string;

    private url : string = '';
    private fileLoader : FileLoader = new FileLoader();
    private file : File = undefined;


    mounted() {
        this.fileLoader.on( 'onLoadFile', this.onLoadFile );
    }

    onLoadFile( data, file ) {
        this.url = data;
        this.file = file;
        this.$emit('@file', this.file);
    }
}
</script>

<style scoped lang="scss">
.uploader {

}

</style>