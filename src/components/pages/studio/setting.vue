<template>
    <q-page class="stdSetting">
        <div class="box">
            <div>
                개발자 프로필
            </div>
            <table>
                <tr>
                    <td style="width: 20%"><span>개발자 이름</span></td>
                    <td style="width: 80%">
                        <q-input counter maxlength="50" v-model="devName" />
                        <div class="hintText">개발자 이름은 애플리케이션 이름 아래에 공개적으로 표시됩니다. 개발자 이름 변경은 Google의 검토를 거쳐야 하며 최대 7일이 소요됩니다.</div>
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>개발자 이미지</span></td>
                    <td style="width: 80%">
                        <q-img v-if="imgUrl" width="250px" height="250px" style="margin-right: 20px" :src="imgUrl">
                        </q-img>
                       <button class="addImage" @click="fileLoader.addFile()">
                           <q-icon name="publish" />
                           <div>썸네일 업로드</div>
                       </button>
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>실제 주소(사용 안함)</span></td>
                    <td style="width: 80%">
                        <q-input counter maxlength="1000" v-model="address" />
                        <div class="hintText">연락 가능한 현재의 유효한 우편 주소를 입력하세요. 앱 또는 인앱 상품을 판매하는 경우 Google의 개발자 약관 및 소비자 보호법에 따라 주소를 제공해야 합니다. 주소를 제공하지 않는 경우 계정 또는 앱의 판매가 일시중지될 수 있습니다. 이러한 세부정보가 변경된 경우 변경된 정보로 업데이트하시기 바랍니다. 이메일 또는 우편 주소를 제공하면 Google이 앱과 관련하여 정보를 공개적으로 표시하거나 밝히는 것에 동의하는 것입니다.</div>
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>이메일 주소(사용 안함)</span></td>
                    <td style="width: 80%">
                        <q-input v-model="email" />
<!--                        <div class="hintText">연락 가능한 현재의 유효한 우편 주소를 입력하세요. 앱 또는 인앱 상품을 판매하는 경우 Google의 개발자 약관 및 소비자 보호법에 따라 주소를 제공해야 합니다. 주소를 제공하지 않는 경우 계정 또는 앱의 판매가 일시중지될 수 있습니다. 이러한 세부정보가 변경된 경우 변경된 정보로 업데이트하시기 바랍니다. 이메일 또는 우편 주소를 제공하면 Google이 앱과 관련하여 정보를 공개적으로 표시하거나 밝히는 것에 동의하는 것입니다.</div>-->
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>전화번호(사용 안함)</span></td>
                    <td style="width: 80%">
                        <q-input v-model="phoneNumber" />
                        <div class="hintText">더하기 기호, 국가코드 및 지역번호를 포함하세요(예: +1-800-555-0199).</div>
                    </td>
                </tr>
            </table>
            <div class="fixed">
                <q-btn class="saveButton" color="primary" @click="save">저장</q-btn>
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {FileLoader} from "@/common/fileLoader";

    @Component({
        components: {

        }
    })
    export default class Setting extends Vue {

        private devName : string = '';
        private address : string = '';
        private email : string = '';
        private phoneNumber : string = '';

        private fileLoader : FileLoader = new FileLoader();
        private file : File = undefined;
        private imgUrl : string = '';


        mounted() {
            this.$store.commit('pageName', '설정');
            this.fileLoader.on( 'onLoadFile', this.onLoadFile );
            this.devName = this.$store.getters.developer.name;
            this.imgUrl = this.$store.getters.developer.picture || this.$store.getters.developer.user.picture;
        }

        onLoadFile( data, file ) {
            this.imgUrl = data;
            this.file = file;
        }

        async save() {

            if( !this.devName && !this.file ) {
                return;
            }

            this.$store.commit('ajaxBar', true);
            const result = await this.$http.updateDev( this.devName, this.file )
            this.$store.commit('ajaxBar', false);
            console.log(result);
        }
    }
</script>

<style scoped lang="scss">

    .stdSetting {
        position: relative;
        padding: 16px;


        .box {
            max-width: 960px;
            width: 100%;
            padding:16px;
            margin: 0 auto 180px auto;
            background-color: white;
            box-shadow: 0 3px 1px -2px rgba(0,0,0,.14), 0 2px 2px 0 rgba(0,0,0,.098), 0 1px 5px 0 rgba(0,0,0,.084);


            table {
                width: 100%;
                border-collapse: collapse;

                tr {
                    width: 100%;
                    border-bottom: 1px solid #d7d7d7;

                    &:last-child {
                        border-bottom:0;
                    }


                    td {
                        padding: 30px 16px 30px 16px;
                        vertical-align: top;

                        .hintText {
                            padding: 16px 0 16px 0;
                            color: #777;
                            font-size: 13px;
                        }

                        .addImage {
                            border: 0;
                            padding: 20px;
                        }
                    }
                }
            }
        }

        .addImage {

            color: #777777;

            i {
                font-size: 20px;
            }

            &:hover {
                background-color: rgb(227, 224, 224);
                color: #474747;
            }
        }

        .fixed {
            width: 100%;
            height: 70px;
            background-color: white;
            position: fixed;
            bottom: 0;
            left: 0;
            text-align: right;

            .saveButton {
                margin: 20px 20px 0 0;
            }
        }
    }

</style>