<template>
    <q-page class="q-pa-md center-container">
        <div class="text-right">
            <router-link :to="`/project/addVersion/${projectId}`">
                <q-btn class="q-my-sm" color="primary">버전 추가하기</q-btn>
            </router-link>
        </div>
        <q-table
            :data="versions"
            :columns="columns"
            row-key="number"
            :pagination="pagination"
            :filter="filter"
            ref="table"
            no-data-label="등록된 버전이 없습니다."
            no-results-label="검색된 버전이 없습니다."
            rows-per-page-label="한 페이지에 표시할 버전수"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td auto-width>
                        <q-btn size="sm" color="primary" round dense @click="expand( props )" :icon="props.expand ? 'remove' : 'add'" />
                    </q-td>
                    <q-td :props="props" key="number">
                        {{props.row.number}}
                    </q-td>
                    <q-td>
                        {{ props.row.version }}
                    </q-td>
                    <q-td>
                        <span style="color: #F2C037; font-weight: bold" v-if="props.row.state === 'process'">{{`심사 중 ( ${props.row.state} )`}}</span>
                        <span style="color: #027BE3; font-weight: bold" v-else-if="props.row.state === 'passed'">{{`심사 완료 ( ${props.row.state} )`}}</span>
                        <span style="color: #C10015; font-weight: bold" v-else-if="props.row.state === 'fail'">{{`심사 미통과 ( ${props.row.state} )`}}</span>
                        <span style="color: #2AC940; font-weight: bold" v-else-if="props.row.state === 'deploy'">{{`배포 중 ( ${props.row.state} )`}}</span>
                    </q-td>
                    <q-td>
                        {{ new Date(props.row.created_at).toLocaleString()}}

                    </q-td>
                </q-tr>
                <q-tr :props="props" v-if="props.expand">
                    <q-td colspan="100%">
                        <content-box>
<!--                            <content-box-block class="q-mb-lg" title="호환성">-->
<!--                                <div class="support">-->
<!--                                    <q-img class="icon" contain src="./icon/chrome.svg"><q-tooltip> Chrome </q-tooltip></q-img>-->
<!--                                    <q-img class="icon" contain src="./icon/edge.svg"><q-tooltip> Edge </q-tooltip></q-img>-->
<!--                                    <q-img class="icon" contain src="./icon/firefox.svg"><q-tooltip> Firefox </q-tooltip></q-img>-->
<!--                                    <q-img class="icon not" contain src="./icon/internet-explorer.svg"><q-tooltip> Internet Explore </q-tooltip></q-img>-->
<!--                                    <q-img class="icon" contain src="./icon/opera.svg"><q-tooltip> Opera </q-tooltip></q-img>-->
<!--                                    <q-img class="icon not" contain src="./icon/safari.svg"><q-tooltip> Safari </q-tooltip></q-img>-->
<!--                                    <q-img class="icon" contain src="./icon/android.svg"><q-tooltip> Android Webview </q-tooltip></q-img>-->
<!--                                    <q-img class="icon" contain src="./icon/chrome.svg"><q-tooltip> Chrome for Android </q-tooltip></q-img>-->
<!--                                    <q-img class="icon" contain src="./icon/firefox.svg"><q-tooltip> Firefox for Android </q-tooltip></q-img>-->
<!--                                    <q-img class="icon" contain src="./icon/opera.svg"><q-tooltip> Opera for Android </q-tooltip></q-img>-->
<!--                                    <q-img class="icon not" contain src="./icon/safari.svg"><q-tooltip> Safari for iOS </q-tooltip></q-img>-->
<!--                                    <q-img class="icon" contain src="./icon/samsung-internet.svg"><q-tooltip> Samsung Internet </q-tooltip></q-img>-->
<!--                                    <q-img class="icon not" contain src="./icon/ruler-horizontal-solid.svg"><q-tooltip> Horizontal Mode </q-tooltip></q-img>-->
<!--                                    <q-img class="icon" contain src="./icon/ruler-vertical-solid.svg"><q-tooltip> Vertical Mode </q-tooltip></q-img>-->
<!--                                    <q-img class="icon" contain src="./icon/volume-up-solid.svg"><q-tooltip> Sound Effect </q-tooltip></q-img>-->
<!--                                    <q-img class="icon not" contain src="./icon/music-solid.svg"><q-tooltip> Background Sound </q-tooltip></q-img>-->
<!--                                    <q-img class="icon not" contain src="./icon/group-24px.svg"><q-tooltip> Multiplayer </q-tooltip></q-img>-->
<!--                                    <span class="text-green-8">(90점)</span>-->
<!--                                </div>-->
<!--                            </content-box-block>-->
                            <content-box-block class="q-mb-lg"  v-if="props.row.reason" title="실패사유">
                                <q-input type="textarea" v-model="props.row.reason" readonly></q-input>
                            </content-box-block>
                            <content-box-block class="q-mb-lg" title="업로드 파일 정보">
                                <div class="q-my-md">
                                    <div>
                                        파일 크기 : {{ props.row.size ? props.row.size + ' MB' : '알 수 없음' }}
                                    </div>
<!--                                    <div class="text-right">-->
<!--                                        <q-btn>-->
<!--                                            다운로드-->
<!--                                        </q-btn>-->
<!--                                    </div>-->
                                </div>
                            </content-box-block>
<!--                            <content-box-block class="q-mb-lg" title="자동 배포">-->
<!--                                <div class="q-my-md">-->
<!--                                    <q-toggle value="autoPlay" v-model="autoPlay">-->
<!--                                    </q-toggle>-->
<!--                                    <div class="hintText">-->
<!--                                        자동 배포를 활성화면 하면 심의통과시 자동으로 배포가 진행됩니다.-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </content-box-block>-->
                            <content-box-block class="q-mb-xl" title="배포" v-if="props.row.state === 'passed'">
                                <div class="q-my-md">
                                    현재 진행중인 버전을 대신하여 이 버전을 배포 합니다.
                                </div>
                                <div class="text-right">
                                    <q-btn>
                                        배포
                                    </q-btn>
                                </div>
                            </content-box-block>
                            <content-box-block class="q-mb-lg" title="버전 삭제">
                                <div class="q-my-md">
                                    <div>
                                        삭제된 버전은 복구 할 수 없습니다.
                                    </div>
                                    <div>
                                        배포 중인 버전은 삭제 할 수 없습니다.
                                    </div>
                                </div>
                                <div class="text-right">
                                    <q-btn :loading="wait[ props.row.id ]" @click="deleteVersion( props.row.id )">
                                        삭제
                                    </q-btn>
                                </div>
                            </content-box-block>
                        </content-box>
                    </q-td>
                </q-tr>
            </template>
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="검색">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
        </q-table>
    </q-page>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import ContentBox from "@/components/layout/contentBox.vue";
    import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
    import _ from 'lodash';
    import {Notify} from "quasar";

    @Component({
        components: {
            ContentBoxBlock,
            ContentBox

        }
    })
    export default class ProjectVersion extends Vue {
        @Prop() private projectId! : number;

        private preExpandProps : any = null;

        private wait : { [id:number] : boolean } = {};
        private autoPlay : boolean = false;

        private pagination = {
            rowsPerPage: 15
            // rowsNumber: xx if getting data from a server
        };

        private columns =  [
            {
            },
            {
                name: 'number',
                required: true,
                label: '번호',
                align: 'left',
                field: (row : any) => row.number,
                format: (val : any) => `${val}`,
                sortable: true
            },
            { name: 'version', align: 'left', label: '세부 버전', field: 'number', format: (val : any) => `v${val}`, sortable: true },
            { name: 'state', label: '상태', field: 'state',align: 'left', sortable: true },
            { name: 'created_at', align: 'left', label: '생성 일시', field: 'created_at', sortable: true },
            // { name: 'support', align: 'left', label: '호환성', field: '' },
            // { name: 'count', label: '조회수', field: 'count',align: 'center', sortable: true },
        ];
        private filter : string = '';
        private versions : any[] = [
            // {
            //     number : 1,
            //     version : '0.0.2',
            //     state : 'passed',
            //     url : 'http://gtest.fromthered.com',
            //     description : '',
            //     reasonForFail : '',
            // },
            // {
            //     number : 2,
            //     version : '0.0.1',
            //     state : 'none',
            //     url : '',
            //     description : '',
            //     reasonForFail : '',
            // }
        ];

        async mounted() {
            this.$store.commit('pageName', '버전 목록');
            await this.loadVersions();
        }

        async loadVersions() {
            this.versions = this.$store.getters.versionList( this.projectId );
            // console.log( this.versions );
        }

        async expand( props ) {
            props.expand = !props.expand;
            if( props.expand ) {
                if( this.preExpandProps ) {
                    this.preExpandProps.expand = false;
                }
                this.preExpandProps = props;
            }
            else {
                this.preExpandProps = null;
            }
        }

        async deleteVersion( id ) {

            const ok = confirm('한번 삭제한 버전은 다시 복구 할수 없습니다. 정말 삭제 하시겠습니까?');
            if( ok ) {
                this.wait[id] = true;

                const result = await this.$http.deleteVersion( id );

                if( !result || result.error ) {
                    Notify.create({
                        message : result && result.error || '프로젝트를 삭제하는데 실패 하였습니다.',
                        position : 'top',
                        color : 'negative',
                        timeout: 2000
                    });
                    console.error( result && result.error || 'error' );
                }
                else {
                    const versionList = this.$store.getters.versionList( this.projectId );
                    const versions = this.$store.getters.versions( this.projectId );
                    const idx = _.findIndex<any>( versionList, v => v.id === id);
                    if( idx > -1 ) {
                        versionList.splice( idx, 1 );
                    }

                    delete versions[id];
                    this.versions = this.$store.getters.versionList( this.projectId );
                }

                this.wait[id] = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    a {
        color: inherit;
        text-decoration: none;
    }

    .support {
        padding-top: 14px;

        .icon {
            margin-right: 4px;
            filter: invert(100%);
            height: 16px;
            width: 16px;
            background-size: contain;


            &.not {
                filter: invert(30%);
            }
        }


    }
</style>