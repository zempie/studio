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
import {FileLoader, mbToByte} from "@/common/fileLoader";

@Component({
    components: {ContentBoxBlockUploadButton, ContentBoxBlockImage}
})
export default class ContentBoxBlockImageUploader extends Vue {
    @Prop() private text! : string;
    @Prop() private defaultSrc! : string;
    @Prop() private limitSize! : number;

    private url : string = '';
    private fileLoader : FileLoader = new FileLoader();
    private file : File = undefined;


    mounted() {
        this.fileLoader.on( 'onLoadFile', this.onLoadFile );
    }

    onLoadFile( data, file : File ) {

        if( this.limitSize && file.size > mbToByte( this.limitSize ) ) {
            alert(`파일 크기가 허용된 사이즈보다 큽니다. (최대 ${this.limitSize}MB) `);
        }

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