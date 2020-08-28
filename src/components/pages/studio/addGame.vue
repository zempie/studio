<template>
    <q-page class="addGame">
        <div class="box">
            <div>
                게임 프로필
            </div>
            <table>
                <tr>
                    <td style="width: 20%"><span>게임 제목</span></td>
                    <td style="width: 80%">
                        <q-input :error="titleError.isError" :error-message="titleError.errorMsg" counter maxlength="50" v-model="title" />
<!--                        <div class="hintText">개발자 이름은 애플리케이션 이름 아래에 공개적으로 표시됩니다. 개발자 이름 변경은 Google의 검토를 거쳐야 하며 최대 7일이 소요됩니다.</div>-->
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>자세한 설명</span></td>
                    <td style="width: 80%">
                        <q-input type="textarea" counter maxlength="2000" v-model="description" />
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>컨트롤 타입</span></td>
                    <td style="width: 80%">
                        <q-select v-model="controlType.value" :options="controlType.options"/>
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
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

    @Component({
        components: {

        }
    })
    export default class AddGame extends Vue {

        private title : string = '';
        private titleError = {
            isError : false,
            errorMsg : '제목을 입력 해 주세요.',
        }
        private description : string = '';
        private controlType = {
            value : '일반',
            options : [
                '아이프레임',
                '멀티',
                '일반',
            ]
        };

        mounted() {
            this.$store.commit('pageName', '게임 추가');
        }

        @Watch('title')
        onChangeTitle() {
            if( this.title ) {
                this.titleError.isError = false;
            }
        }

        async save() {
            if( !this.title ) {
                this.titleError.isError = true;
                return ;
            }

            const controlType = this.controlType.options.indexOf( this.controlType.value );

            this.$store.commit('ajaxBar', true);
            const result = await this.$rpc.createProject( this.title, this.description, controlType  );
            this.$store.commit('ajaxBar', false);
        }
    }
</script>

<style scoped lang="scss">

    .addGame {

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

                tr {
                    td {
                        padding: 30px 16px 30px 16px;
                        vertical-align: top;

                        .hintText {
                            padding: 16px 0 16px 0;
                            color: #777;
                            font-size: 13px;
                        }
                    }
                }
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