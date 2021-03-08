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
export default class ContentBoxBlockImageUploaderGIF extends Vue {
    @Prop() private text! : string;
    @Prop() private defaultSrc! : string;
    @Prop() private limitSize! : number;

    private url : string = '';
    private fileLoader : FileLoader = new FileLoader('.gif');
    private file : File = undefined;


    mounted() {
        this.fileLoader.on( 'onLoadFile', this.onLoadFile );
    }

    onLoadFile( data, file : File ) {

        if( this.limitSize && file.size > mbToByte( this.limitSize ) ) {
            alert(this.$t('contentBox.limitSizeErr') +` ${this.limitSize}MB) `);
            return;
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