<template>
    <div class="content-grid">
        <div class="section-banner">
            <img
                class="section-banner-icon"
                src="img/banner/overview-icon.png"
                alt="overview-icon"
            />

            <p class="section-banner-title">모든 게임</p>

            <p class="section-banner-text">님이 올린 모든 게임</p>
        </div>
        <div class="add-game-container">
            <!-- 설문조사 btn -->
            <template
                v-if="
                    !survey.isDone &&
                    survey.url !== null &&
                    survey.url !== undefined &&
                    !isSurveyBtnClicked
                "
            >
                <a target="_blank" :href="survey.url + uid">
                    <button
                        class="button primary survey"
                        @click="isSurveyBtnClicked = true"
                    >
                        {{ $t("gameListPage.survey") }}
                    </button>
                </a>
            </template>
            <router-link to="/selectStage">
                <button class="button secondary add-game">
                    {{ $t("gameListPage.addGame") }}
                </button>
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
            :no-data-label="$t('gameListPage.label.no_data')"
            :no-results-label="$t('gameListPage.label.no_result')"
            :rows-per-page-label="$t('gameListPage.label.rows_per_page')"
        >
            <template v-slot:body="props">
                <template v-if="props.row.state === 1 || props.row.state === 2">
                    <q-tr :props="props" class="banned">
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
                            <q-td width="10%">{{ $t("ban.ban") }}</q-td>
                        </template>
                        <template v-else-if="props.row.state === 2">
                            <q-td width="10%">
                                {{ $t("ban.permanentBan") }}</q-td
                            >
                        </template>
                        <template v-else>
                            <q-td width="10%">
                                {{
                                    (props.row.deploy_version_id &&
                                        $t("gameListPage.status.deploy")) ||
                                    $t("gameListPage.status.noDeploy")
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
                    <q-tr class="ban-detail">
                        <a
                            :href="$store.getters.supportUrl + 'inquiry'"
                            target="_blank"
                        >
                            {{ $t("ban.messages.inquiry") }}
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
                            <q-td width="10%"> {{ $t("ban.ban") }}</q-td>
                        </template>
                        <template v-else-if="props.row.state === 2">
                            <q-td width="10%">
                                {{ $t("ban.permanentBan") }}</q-td
                            >
                        </template>
                        <template v-else>
                            <q-td width="10%">
                                {{
                                    (props.row.deploy_version_id &&
                                        $t("gameListPage.status.deploy")) ||
                                    $t("gameListPage.status.noDeploy")
                                }}</q-td
                            >
                        </template>
                        <q-td style="text-align: center">
                            {{
                                (props.row.game && props.row.game.count_over) ||
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
                    :placeholder="$t('gameListPage.search')"
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
import { LoginState } from "@/store/modules/user";
import { Notify } from "quasar";

import Form from "@/scripts/form";

interface ISurvey {
    url: string;
    isDone: boolean;
}
@Component({})
export default class Games extends Vue {
    private pagination = {
        rowsPerPage: 15,
        // rowsNumber: xx if getting data from a server
    };

    private columns = [
        {
            name: "picture",
            required: false,
            label: this.$t("gameListPage.columns.picture"),
            align: "left",
        },
        {
            name: "name",
            required: true,
            label: this.$t("gameListPage.columns.name"),
            align: "left",
            field: (row: any) => row.name,
            format: (val: any) => `${val}`,
            sortable: true,
        },
        {
            name: "updated_at",
            align: "left",
            label: this.$t("gameListPage.columns.updated_at"),
            field: "updated_at",
            sortable: true,
        },
        {
            name: "state",
            label: this.$t("gameListPage.columns.state"),
            field: "state",
            align: "left",
            sortable: true,
        },
        {
            name: "count_over",
            label: this.$t("gameListPage.columns.count_over"),
            field: "count_over",
            align: "center",
            sortable: true,
        },
        {
            name: "count_heart",
            label: this.$t("gameListPage.columns.count_heart"),
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
        Form.formInput();
        this.loading = true;
        const loginState = await this.$store.dispatch("loginState");

        if (loginState === LoginState.login) {
            this.$store.commit("pageName", this.$t("studioMenu.allGames"));
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
                message: this.$t("gameListPage.error.loadFail").toString(),
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
</style>