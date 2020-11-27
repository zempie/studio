<template>
    <q-page class="testGame">
        <q-expansion-item
                expand-separator
                icon="settings"
                label="옵션 열기"
                caption=""
        >
            <div class="optionContainer">

                <q-btn class="button" color="primary" @click="pass">심사 통과</q-btn>
                <q-btn class="button" color="deep-orange" @click="fail">심사 보류</q-btn>

                <q-input v-model="reason.text" counter maxlength="255" :error="reason.error" :error-message="reason.errorMsg" label="보류 사유" />


                <q-badge color="secondary">
                    width: {{ size.w }} (100 to 720)
                </q-badge>
                <q-badge color="secondary" style="margin-left: 20px">
                    height: {{ size.h }} (100 to 1280)
                </q-badge>
                <q-slider v-model="size.w" :min="100" :max="720"/>
                <q-slider v-model="size.h" :min="100" :max="1280"/>

                <div style="text-align: center; font-weight: 500; font-size: 16px">
                    <span ref="size" id="iFrameSizeScale">{{ size.w }} x {{ size.h }}</span>
                    (<span ref="rate" style=" color: #00b4ff"> {{ size.h / size.w }} </span>)
                </div>

                <q-select v-model="control_type.value" :options="control_type.options" label="control_type"></q-select>
                <div style="margin-top: 10px" v-if="control_type.value === control_type.options[0]">
                    <q-btn @click="onButton('@gamePlay')">시작</q-btn>
                    <q-btn @click="onButton('@gameRetry')">재시작</q-btn>
                    <q-btn @click="onButton('@gamePause')">일시정지</q-btn>
                    <q-btn @click="onButton('@gameResume')">일시정지 해제</q-btn>
                    <q-btn @click="onButton('@soundOn')">시운드 온</q-btn>
                    <q-btn @click="onButton('@soundOff')">사운드 오프</q-btn>
                </div>
            </div>
        </q-expansion-item>

        <div class="iframeContainer">
            <div class="iframeBase"
                 :class="control_type.value===control_type.options[0]?'isIframe':''"
                 :style="{width:size.w + 'px', height:size.h+ 'px'}">
                <div class="scoreBar">
                    score <span ref="score">0</span>
                </div>
                <iframe ref="iframe" :src="src"></iframe>
                <div ref="cover" class="cover"></div>
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import * as _ from 'lodash';


    @Component({
        components: {

        }
    })
    export default class TestGame extends Vue {
        @Prop() private versionId! : number;

        private size : { w : number, h : number } = {w : 540, h : 960}

        private version : any = null;
        private project : any = null;
        private developer : any = null;

        private reason = {
            text : '',
            error : false,
            errorMsg : ''
        }

        private control_type = {
            options : ['아이프레임', '', '일반'],
            value : ''
        }

        private src : string = '';

        mounted() {
            this.$store.commit('pageName', '게임 테스트');
            this.loadVersion();

            window.addEventListener('message', this.onMessage);
        }

        beforeDestroy() {
            window.removeEventListener('message', this.onMessage);
        }

        onMessage( message ) {
            if( this.control_type.value !== this.control_type.options[ 0 ] ) {
                return;
            }

            const { type, score } = message.data;
            if( !type ) return;
            switch ( type ) {
                case '@gameReady':
                {
                    // cover.style.visibility = 'visible';
                    (this.$refs.cover as HTMLDivElement).style.visibility = 'visible';
                    alert( type );
                    break;
                }

                case '@updateScore':
                {
                    // scoreDiv.textContent = score;
                    (this.$refs.score as HTMLSpanElement).textContent = score;
                    break;
                }

                case '@gameOver':
                {
                    (this.$refs.cover as HTMLDivElement).style.visibility = 'visible';
                    alert( `@gameOver : ${score}` );
                    (this.$refs.score as HTMLSpanElement).textContent = score;
                    break;
                }

            }
        }

        onButton( type ) {
            if( (this.$refs.iframe as HTMLIFrameElement).contentWindow ) {

                switch ( type ) {
                    case '@gamePause':
                    {
                        (this.$refs.cover as HTMLDivElement).style.visibility = 'visible';
                        break;
                    }
                    case '@gamePlay' :
                    case '@gameRetry' :
                    case '@gameResume' :
                    {
                        (this.$refs.cover as HTMLDivElement).style.visibility = 'hidden';
                        break;
                    }

                }


                const message = {
                    type,
                    data : null
                };
                (this.$refs.iframe as HTMLIFrameElement).contentWindow.postMessage( message, '*' );
            }
        }

        @Watch('reason.text')
        onChangeReasonText() {
            if( this.reason.text ) {
                this.reason.error = false;
            }
        }

        @Watch( 'control_type.value' )
        onChangeControlType() {
            this.src = `${this.version.url}?refreshTest=${Math.random()}`;
        }

        async loadVersion() {

            const result = await this.$rpc.requestRpc( 'admin-get-version', {
                version_id : this.versionId
            } );
            this.version = result.version;
            this.project = result.project;
            this.developer = result.developer;
            this.control_type.value = this.control_type.options[ this.project.control_type ];
        }

        async pass() {
            this.$store.commit('ajaxBar', true);
            const result = await this.$rpc.requestRpc( 'admin-set-version', {
                state : 'passed',
                id : this.versionId,
            } );
            this.$store.commit('ajaxBar', false);
        }

        async fail() {
            if( !this.reason.text ) {
                this.reason.error = true;
                this.reason.errorMsg = '심사 보류 사유를 입력 해 주세요.'
                return;
            }
            this.$store.commit('ajaxBar', true);
            const result = await this.$rpc.requestRpc( 'admin-set-version', {
                state : 'fail',
                reason : this.reason.text,
                id : this.versionId
            } );
            this.$store.commit('ajaxBar', false);
        }

    }
</script>

<style scoped lang="scss">
    .testGame {
        .optionContainer {
            margin: 0 auto;
            padding: 20px;
            width: 100%;
            max-width: 960px;
            text-align: center;
            .button {
                margin: 5px;
            }
        }
        .iframeContainer {
            .iframeBase {
                position: relative;
                margin: 0 auto;

                .scoreBar {
                    height: 40px;
                    background-color: #fff;
                    color: #505050;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 40px;
                    vertical-align: middle;
                    text-align: center;
                    display: none;

                    span {
                        font-size: 20px;
                        color: #00b4ff;
                        font-weight: 700;
                    }
                }

                iframe {
                    width: 100%;
                    height: 100%;
                    border: 0;
                }

                .cover {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    background-color: rgba(0, 0, 0, 0.7);
                    top: calc(50%);
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    visibility: hidden;
                }

                &.isIframe {
                    .scoreBar {
                        display: block;
                    }

                    .cover {
                        top: calc(50% + 20px);
                        height: calc(100% - 40px);
                        /*visibility: visible;*/
                    }

                    iframe {
                        height: calc(100% - 40px);
                    }
                }


            }
        }
    }
</style>