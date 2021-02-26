<template>
    <q-page class="q-pa-md center-container no-drag">
        <div class="text-right">
            <!-- 설문조사 btn --> 
            <template v-if="!survey.isDone && survey.url !== null && survey.url !== undefined && !isSurveyBtnClicked">
                <a target="_blank" :href="survey.url + uid">
                    <q-btn class="q-my-sm q-mr-md font-weight-300" color="primary" @click="isSurveyBtnClicked=true"
                        >설문조사</q-btn
                    >
                </a>            
            </template>
            <router-link to="/addGame">
                <q-btn class="q-my-sm font-weight-300" color="primary">게임 추가하기</q-btn>
            </router-link>
        </div>

        <q-table
            :data="projects"
            :columns="columns"
            row-key="name"
            separator="vertical"
            class="table"
            :pagination="pagination"
            :filter="filter"
            no-data-label="등록된 게임이 없습니다."
            no-results-label="검색된 게임이 없습니다."
            rows-per-page-label="한 페이지에 표시할 게임수"
        >
            <template v-slot:body="props">
                <template v-if="props.row.state === 1 || props.row.state === 2">
                    <q-tr
                        :props="props"
                        @click="$router.push(`/project/${props.row.id}`)"
                        class="banned "
                    >
                        <q-td width="10%">
                            <q-img
                                :src="
                                    props.row.picture_webp ||
                                    props.row.picture ||
                                    'img/default.png'
                                "
                            ></q-img>
                        </q-td>
                        <q-td width="30%" :props="props" key="name">
                            {{ props.row.name }}
                        </q-td>
                        <q-td width="20%">
                            {{
                                new Date(props.row.updated_at).toLocaleString()
                            }}
                        </q-td>

                        <!-- 제재 상태-->
                        <template v-if="props.row.state === 1">
                            <q-td width="10%" > 제재</q-td>
                        </template>
                        <template v-else-if="props.row.state === 2">
                            <q-td  width="10%">
                                영구 제재</q-td
                            >
                        </template>
                        <template v-else>
                            <q-td width="10%">
                                {{
                                    (props.row.deploy_version_id &&
                                        "배포 중") ||
                                    "배포 안됨"
                                }}</q-td
                            >
                        </template>

                        <q-td style="text-align: center">
                            {{
                                (props.row.game &&
                                    props.row.game.count_start) ||
                                0
                            }}
                        </q-td>
                        <q-td style="text-align: center">
                            {{
                                (props.row.game &&
                                    props.row.game.count_heart) ||
                                0
                            }}
                        </q-td>
                    </q-tr>

                    <!-- <q-tr class="ban-detail" @click="checkBanDetail"> -->
                      <q-tr class="ban-detail">  <a href="https://support.zempie.com/#/inquiry"  target="_blank">
                        자세한 제재 내용은 고객센터를 통해 문의해주세요.
                        </a>
                      </q-tr>
                    <!-- </q-tr> -->
                </template>

                <template v-else>
                    <q-tr
                        :props="props"
                        @click="$router.push(`/project/${props.row.id}`)"
                    >
                        <q-td width="10%">
                            <q-img
                                :src="
                                    props.row.picture_webp ||
                                    props.row.picture ||
                                    'img/default.png'
                                "
                            ></q-img>
                        </q-td>
                        <q-td width="30%" :props="props" key="name">
                            {{ props.row.name }}
                        </q-td>
                        <q-td width="20%">
                            {{
                                new Date(props.row.updated_at).toLocaleString()
                            }}
                        </q-td>

                        <!-- 제재 상태-->
                        <template v-if="props.row.state === 1">
                            <q-td width="10%" > 제재</q-td>
                        </template>
                        <template v-else-if="props.row.state === 2">
                            <q-td  width="10%">
                                영구 제재</q-td
                            >
                        </template>
                        <template v-else>
                            <q-td width="10%">
                                {{
                                    (props.row.deploy_version_id &&
                                        "배포 중") ||
                                    "배포 안됨"
                                }}</q-td
                            >
                        </template>
                          <q-td style="text-align: center">
                            {{
                                (props.row.game &&
                                    props.row.game.count_over) ||
                                0
                            }}
                        </q-td>
                         <q-td style="text-align: center">
                            {{
                                (props.row.game &&
                                    props.row.game.count_heart) ||
                                0
                            }}
                        </q-td>
                    </q-tr>
                </template>
            </template>
            
            <template v-slot:top-right>
                <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="filter"
                    placeholder="검색"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
        </q-table>
            
    </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LoginState } from "@/store/modules/user";
import { Notify } from "quasar";

interface ISurvey {
    url: string;
    isDone: boolean;
}
@Component({
    
})
export default class Games extends Vue {
    

    private pagination = {
        rowsPerPage: 15,
        // rowsNumber: xx if getting data from a server
    };

    private columns = [
        {
            name: "picture",
            required: false,
            label: "썸네일",
            align: "left",
        },
        {
            name: "name",
            required: true,
            label: "게임 이름",
            align: "left",
            field: (row: any) => row.name,
            format: (val: any) => `${val}`,
            sortable: true,
        },
        {
            name: "updated_at",
            align: "left",
            label: "최종 업데이트",
            field: "updated_at",
            sortable: true,
        },
        {
            name: "state",
            label: "상태",
            field: "state",
            align: "left",
            sortable: true,
        },
        {
            name: "count_over",
            label: "플레이수",
            field: "count_over",
            align: "center",
            sortable: true,
        },
          {
            name: "count_heart",
            label: "좋아요수",
            field: "count_heart",
            align: "center",
            sortable: true,
        },
    ];
    private filter: string = "";
    private projects = [];
    private loading: boolean = false;
    
    //설문조사
    private isSurveyBtnClicked: boolean = false;
    private uid: string = "";
    survey: ISurvey = {
        url: "",
        isDone: false,
    };

    

    async mounted() {
        this.loading = true;
        const loginState = await this.$store.dispatch("loginState");

        if (loginState === LoginState.login) {
            this.$store.commit("pageName", "모든 게임");
            this.uid = this.$store.getters.user.uid;
            await this.loadProjects();
            await this.surveyStatus();
        } else {
            await this.$router.replace("/login");
        }
        this.loading = false;
    }
    
    async loadProjects() {
        const result = await this.$http.getProjects();
        if (!result || result.error) {
            Notify.create({
                message:
                    (result && result.error) ||
                    "프로젝트 목록을 불러오는데 실패하였습니다.",
                position: "top",
                color: "negative",
                timeout: 2000,
            });
            console.error((result && result.error) || "error");
            this.projects = [];
            this.$store.commit("projects", []);
        } else {
            this.projects = result;
            this.$store.commit("projects", result);
        }

        // console.log(res);

        // this.projects = [
        //     {
        //         name : '2048',
        //         picture : 'http://gtest.fromthered.com/Deploy_images/zeminiplay/2048.png',
        //         update_at : '0',
        //         state: 'passed',
        //         count : 100,
        //     },
        //     {
        //         name : 'knightrush',
        //         picture : 'http://gtest.fromthered.com/Deploy_images/zeminiplay/2048.png',
        //         update_at : Date.now(),
        //         state: 'passed',
        //         count : 100,
        //     }
        // ]

        // console.log(res);
    }

    // checkBanDetail() {
    //     console.log("제재내용확인하기");
    // }

    //survey
    async surveyStatus() {
        const result = await this.$http.surveyStatus();
        this.survey.url = result.survey_url;
        this.survey.isDone = result.done;
    }
   
}
</script>

<style scoped lang="scss">
.no-drag {-ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;}

.font-weight-300{
    font-weight: 300 !important;
}
.font-weight-100{
    font-weight: 100 !important;
}
a {
    color: inherit;
    text-decoration: none;
}
.banned {
    opacity: 0.2;
    pointer-events: none;
}
.ban-detail {
    height: 74px;
    position: absolute;
    width: 100%;
    text-align: center;
    margin-top: -74px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.ban-detail:hover {
    cursor: pointer;
    text-decoration: underline;
}
.q-table tbody td {
    height: 74px;
    
}
*{
    font-weight: 100 !important;
}

</style>