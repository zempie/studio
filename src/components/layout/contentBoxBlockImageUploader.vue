<template>
    <div class="uploader">
        <content-box-block-image v-if="url || defaultSrc"  :src="url || defaultSrc"></content-box-block-image>
       <div class="btn_wrapper">
           <content-box-block-upload-button :text="text" v-on:@click="fileLoader.addFile()"></content-box-block-upload-button>
        <!-- 삭제 버튼 -->
        <template v-if="url || defaultSrc">
            <q-btn color="grey-9 q-mb-sm" class="removeBtn" @click="reset()"  >
                <q-icon name="far fa-trash-alt" style="font-size: 16px"></q-icon>
            </q-btn>
        </template>
       </div>
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
            alert(this.$t('contentBox.limitSizeErr') + `${this.limitSize}MB) `);
            return;
        }

        this.url = data;
        this.file = file;
        this.$emit('@file', this.file);
    }

    // getUrl() {
    //     if( this.url !== null ) {
    //         return this.url;
    //     }
    //     return this.defaultSrc;
    // }

    // 이미지 삭제
        reset(){
            this.url = '';
            this.file = null;
            this.$emit('@file', this.file);
             this.$emit('@remove', this.defaultSrc)
        }
}
</script>

<style scoped lang="scss">
.uploader {
    display: flex;
}
.btn_wrapper{
    display: flex ;
    flex-direction: column;
    
}
.removeBtn{
    margin-top: 20px;
    margin-left: 20px;
    max-width: 150px;
    width: 90%;
}

</style>