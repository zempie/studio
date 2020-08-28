<template>
    <q-page class="q-pa-md games">
        <div class="top">
            <q-btn class="addButton" color="primary" @click="$router.push('/addGame')">게임 추가하기</q-btn>
        </div>

        <q-table
                :data="projects"
                :columns="columns"
                row-key="name"
                separator="vertical"
                class="table"
        >
            <template v-slot:body="props">
                <q-tr :props="props" @click="onClick(props)">
                    <q-td width="30%" :props="props" key="name">
                        {{props.row.name}}
                    </q-td>
                    <q-td width="20%">
                        {{ new Date(props.row.updated_at).toLocaleString()}}
                    </q-td>
                    <q-td width="10%" >
                        {{props.row.deploy_version_id && '배포 중' || '배포 안됨'}}
                    </q-td>
                    <q-td width="15%">
                        {{props.row.game && props.row.game.count_start || 0}}
                    </q-td>
                    <q-td>
                        <q-icon name="delete" style="font-size: 26px" />
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </q-page>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {

        }
    })
    export default class Games extends Vue {

        private columns =  [
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
            { name: 'count', label: '조회수', field: 'count',align: 'left', sortable: true },
            { name: 'remove', icon:'settings', align: 'left', label: '' },
        ];

        private projects = [];

        mounted() {
            this.$store.commit('pageName', '모든 게임');
            this.loadProjects();
        }

        async loadProjects() {
            const res = await this.$rpc.getProjects();
            this.projects = res;
            this.$store.commit('projects', res);

            console.log(res);

        }

        onClick(data) {
            console.log(data);
            this.$router.push( `/project/${data.row.id}` );
        }
    }
</script>

<style scoped lang="scss">
    .games {
        max-width: 960px;
        margin: 0 auto;

        .top {

            text-align: right;

            .addButton {
                margin: 10px 0;
            }
        }


    }


</style>