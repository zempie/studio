<template>
    <q-page class="q-pa-md center-container">


        <div class="text-right">
            <q-btn class="q-my-sm" color="primary" @click="$router.push('/addGame')">게임 추가하기</q-btn>
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
                <q-tr :props="props" @click="onClick(props)">
                    <q-td width="10%">
                        <q-img :src="props.row.picture || 'img/default.png'"></q-img>
                    </q-td>
                    <q-td width="30%" :props="props" key="name">
                        {{props.row.name}}
                    </q-td>
                    <q-td width="20%">
                        {{ new Date(props.row.updated_at).toLocaleString()}}
                    </q-td>
                    <q-td width="10%" >
                        {{props.row.deploy_version_id && '배포 중' || '배포 안됨'}}
                    </q-td>
                    <q-td style="text-align: center">
                        {{props.row.game && props.row.game.count_start || 0}}
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
    import {LoginState} from "@/store/modules/user";

    @Component({
        components: {

        }
    })
    export default class Games extends Vue {

        private pagination = {
            rowsPerPage: 15
            // rowsNumber: xx if getting data from a server
        };

        private columns =  [
            {
                name: 'picture',
                required: false,
                label: '썸네일',
                align: 'left'
            },
            {
                name: 'name',
                required: true,
                label: '게임 이름',
                align: 'left',
                field: (row : any) => row.name,
                format: (val : any) => `${val}`,
                sortable: true
            },
            { name: 'updated_at', align: 'left', label: '최종 업데이트', field: 'updated_at', sortable: true },
            { name: 'state', label: '상태', field: 'state',align: 'left', sortable: true },
            { name: 'count', label: '조회수', field: 'count',align: 'center', sortable: true },
        ];
        private filter : string = '';
        private projects = [];
        private loading : boolean = false;

        async mounted() {
            this.loading = true;
            const loginState = await this.$store.dispatch('loginState');

            if( loginState === LoginState.login ) {
                this.$store.commit('pageName', '모든 게임');
                await this.loadProjects();
            }
            else {
                await this.$router.replace('/login');
            }


            this.loading = false;
        }

        async loadProjects() {


            const res = await this.$http.getProjects();
            // console.log(res);
            this.projects = res;

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
            this.$store.commit('projects', res);

            // console.log(res);

        }

        onClick(data) {
            // console.log(data);
            this.$router.push( `/project/${data.row.id}` );
        }
    }
</script>

<style scoped lang="scss">
</style>