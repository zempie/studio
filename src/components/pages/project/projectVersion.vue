<template>
    <div class="grid">
        <div class="text-right">
            <router-link :to="`/project/addVersion/${projectId}`">
                <q-btn class="q-my-sm add-version-btn" color="primary">
                    {{ $t("projectVersion.versionListText") }}</q-btn
                >
            </router-link>
        </div>
        <q-table
            :data="versions"
            :columns="columns"
            row-key="number"
            :pagination="pagination"
            :filter="filter"
            ref="table"
            :no-data-label="$t('projectVersion.label.no_data')"
            :no-results-label="$t('projectVersion.label.no_results')"
            :rows-per-page-label="$t('projectVersion.label.rows_per_page')"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td auto-width>
                        <q-btn
                            size="sm"
                            color="primary"
                            round
                            dense
                            @click="expand(props)"
                            :icon="props.expand ? 'remove' : 'add'"
                        />
                    </q-td>
                    <q-td :props="props" key="number">
                        {{ props.row.number }}
                    </q-td>
                    <q-td>
                        {{ props.row.version }}
                    </q-td>
                    <q-td>
                        <span
                            style="color: #f2c037; font-weight: bold"
                            v-if="props.row.state === 'process'"
                            >{{ $t("projectVersion.status.process")
                            }}{{ `( ${props.row.state} )` }}</span
                        >
                        <span
                            style="color: #027be3; font-weight: bold"
                            v-else-if="props.row.state === 'passed'"
                            >{{ $t("projectVersion.status.passed")
                            }}{{ `( ${props.row.state} )` }}</span
                        >
                        <span
                            style="color: #c10015; font-weight: bold"
                            v-else-if="props.row.state === 'fail'"
                            >{{ $t("projectVersion.status.fail")
                            }}{{ ` ( ${props.row.state} )` }}</span
                        >
                        <span
                            style="color: #2ac940; font-weight: bold"
                            v-else-if="props.row.state === 'deploy'"
                            >{{ $t("projectVersion.status.deploy")
                            }}{{ `( ${props.row.state} )` }}</span
                        >
                        <span
                            style="color: #c10015; font-weight: bold"
                            v-else-if="props.row.state === 'ban'"
                            >{{ $t("projectVersion.status.ban")
                            }}{{ `( ${props.row.state} )` }}</span
                        >
                    </q-td>
                    <q-td>
                        {{ new Date(props.row.created_at).toLocaleString() }}
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
                            <!--                            <content-box-block class="q-mb-lg"  v-if="props.row.description" title="버전 설명">-->
                            <!--                                <q-input type="textarea" v-model="props.row.description" readonly></q-input>-->
                            <!--                            </content-box-block>-->

                            <content-box-block
                                class="q-mb-lg"
                                v-if="props.row.reason"
                                :title="$t('projectVersion.failReason')"
                            >
                                <q-input
                                    type="textarea"
                                    v-model="props.row.reason"
                                    readonly
                                ></q-input>
                            </content-box-block>
                            <content-box-block
                                class="q-mb-lg"
                                :title="$t('projectVersion.fileInfo')"
                            >
                                <div class="q-my-md">
                                    <div>
                                        {{ $t("projectVersion.fileSize") }}:
                                        {{
                                            props.row.size
                                                ? props.row.size + " MB"
                                                : $t(
                                                      "projectVersion.unknowFileSize"
                                                  )
                                        }}
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

                            <!-- 배포 버튼 -->
                            <!-- <content-box-block class="q-mb-xl" title="배포" v-if="props.row.state === 'passed'">
                                <div class="q-my-md">
                                    현재 진행중인 버전을 대신하여 이 버전을 배포 합니다.
                                </div>
                                <div class="text-right">
                                    <q-btn>
                                        배포
                                    </q-btn>
                                </div>
                            </content-box-block> -->
                            <content-box-block
                                class="q-mb-lg"
                                :title="$t('projectVersion.delete.title')"
                            >
                                <div class="q-my-md">
                                    <div>
                                        {{ $t("projectVersion.delete.desc1") }}
                                    </div>
                                    <div>
                                        {{ $t("projectVersion.delete.desc2") }}
                                    </div>
                                </div>
                                <div class="text-right">
                                    <q-btn
                                        class="delete-btn"
                                        :loading="wait[props.row.id]"
                                        @click="deleteVersion(props.row)"
                                    >
                                        {{ $t("projectVersion.delete.btn") }}
                                    </q-btn>
                                </div>
                            </content-box-block>
                        </content-box>
                    </q-td>
                </q-tr>
            </template>
            <template v-slot:top-right>
                <q-input
                    input-class="input"
                    borderless
                    dense
                    debounce="300"
                    v-model="filter"
                    :placeholder="$t('projectVersion.columns.search')"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
        </q-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ContentBox from "@/components/layout/contentBox.vue";
import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
import _ from "lodash";
import { Notify } from "quasar";

@Component({
    components: {
        ContentBoxBlock,
        ContentBox,
    },
})
export default class ProjectVersion extends Vue {
    private projectId: number = parseInt(this.$route.params.projectId);

    private preExpandProps: any = null;

    private wait: { [id: number]: boolean } = {};
    private autoPlay: boolean = false;

    private pagination = {
        rowsPerPage: 15,
        // rowsNumber: xx if getting data from a server
    };

    private columns = [
        {},
        {
            name: "number",
            required: true,
            label: this.$t("projectVersion.columns.number"),
            align: "left",
            field: (row: any) => row.number,
            format: (val: any) => `${val}`,
            sortable: true,
        },
        {
            name: "version",
            align: "left",
            label: this.$t("projectVersion.columns.version"),
            field: "number",
            format: (val: any) => `v${val}`,
            sortable: true,
        },
        {
            name: "state",
            label: this.$t("projectVersion.columns.state"),
            field: "state",
            align: "left",
            sortable: true,
        },
        {
            name: "created_at",
            align: "left",
            label: this.$t("projectVersion.columns.created_at"),
            field: "created_at",
            sortable: true,
        },
        // { name: 'support', align: 'left', label: '호환성', field: '' },
        // { name: 'count', label: '조회수', field: 'count',align: 'center', sortable: true },
    ];
    private filter: string = "";
    private versions: any[] = [
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
        await this.$store.dispatch("loginState");
        await this.$store.dispatch("project", this.projectId);
        this.$store.commit("pageName", this.$t("projectVersion.toolbarTitle"));
        await this.loadVersions();
    }

    async loadVersions() {
        this.versions = this.$store.getters.versionList(this.projectId);
        console.log(this.versions);
    }

    async expand(props) {
        props.expand = !props.expand;
        if (props.expand) {
            if (this.preExpandProps) {
                this.preExpandProps.expand = false;
            }
            this.preExpandProps = props;
        } else {
            this.preExpandProps = null;
        }
    }

    async deleteVersion(rowInfo) {
        let id = rowInfo.id;
        let state = rowInfo.state;

        if (state === "deploy") {
            Notify.create({
                message: this.$t(
                    "projectVersion.error.deleteDeployFail"
                ).toString(),
                position: "top",
                color: "negative",
                timeout: 2000,
            });
        } else {
            const ok = confirm(
                this.$t("projectVersion.delete.confirm").toString()
            );
            if (ok) {
                this.wait[id] = true;

                const result = await this.$http.deleteVersion(id);
                if (!result || result.error) {
                    Notify.create({
                        message: this.$t(
                            "projectVersion.error.deleteVersion"
                        ).toString(),
                        position: "top",
                        color: "negative",
                        timeout: 2000,
                    });
                    console.error((result && result.error) || "error");
                } else {
                    const versionList = this.$store.getters.versionList(
                        this.projectId
                    );
                    const versions = this.$store.getters.versions(
                        this.projectId
                    );
                    const idx = _.findIndex<any>(
                        versionList,
                        (v) => v.id === id
                    );
                    if (idx > -1) {
                        versionList.splice(idx, 1);
                    }
                    delete versions[id];
                    const project = this.$store.getters.project(this.projectId);
                    if (project.update_version_id) {
                        project.update_version_id = null;
                    }
                    this.versions = this.$store.getters.versionList(
                        this.projectId
                    );
                }

                this.wait[id] = false;
            }
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
.add-version-btn {
    width: 150px !important;
}
.delete-btn {
    width: 100px !important;
    background-color: #fd4350;
}
</style>