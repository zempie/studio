import Vue from 'vue';
import * as _ from 'lodash';


export default {
    state : {
        projects : {},
    },
    getters : {
        projects(state) {
            return state.projects;
        },
        project : ( state : any ) => ( id : number ) => {
            return state.projects[id];
        },
        versions : ( state : any ) => ( project_id : number ) => {
            return state.projects[ project_id ] && state.projects[ project_id ].versions || {};
        },
        versionList : ( state : any ) => ( project_id : number ) => {
            return state.projects[ project_id ] && state.projects[ project_id ].projectVersions || [];
        },
        deployVersion : ( state : any ) => ( project_id : number ) => {
            const versions = state.projects[project_id] && state.projects[project_id].projectVersions;
            const deployVersionId = state.projects[project_id].deploy_version_id;
            let deployVersion = null;

            if( versions && deployVersionId ) {
                for( let i = 0; i < versions.length; i++ ) {
                    if( versions[i].id === deployVersionId ) {
                        deployVersion = versions[i];
                        break;
                    }
                }
            }

            return deployVersion
        },

        updateVersion : ( state : any ) => ( project_id : number ) => {

            const versions = state.projects[project_id] && state.projects[project_id].projectVersions;
            const updateVersionId = state.projects[project_id].update_version_id;
            let updateVersion = null;

            if( versions && updateVersionId ) {
                for( let i = 0; i < versions.length; i++ ) {
                    if( versions[i].id === updateVersionId ) {
                        updateVersion = versions[i];
                        break;
                    }
                }
            }

            return updateVersion
        },
        lastVersion: ( state : any ) => ( project_id : number ) => {
            const versions = state.projects[project_id] && state.projects[project_id].versions;
            if( !versions ) {
                return null;
            }

            let maxNumVersion = null;
            for( let k in versions ) {
                const ver = versions[k];
                if( !maxNumVersion || maxNumVersion.number < ver.number) {
                    maxNumVersion = ver;
                }
            }
            return maxNumVersion;
        }
    },

    mutations : {
        project( state, payload ) {
            state.projects[payload.id] = payload;
            if( payload.projectVersions ) {
                // this.versions( state, payload.projectVersions  );
                // this.commit('project', prj);
                this.commit('versions', payload.projectVersions);
            }
        },
        projects( state, payload ) {
            for( let i = 0; i < payload.length; i++ ) {
                const prj = payload[i];
                // state.projects[ prj.id ] = prj;
                // this.project( state, prj );
                this.commit('project', prj);
            }
        },
        version( state, payload ) {
            state.projects[payload.project_id].versions[ payload.number ] = payload;
        },
        versions( state, payload ) {
            for( let i = 0; i < payload.length; i++ ) {
                const version = payload[i];
                const project = state.projects[ version.project_id ];
                project.versions = project.versions || {};

                // this.version( state, payload[i] );
                this.commit('version', payload[i] );
                // project.projectVersions = versions;
                // versions[ version.number ] = version;
            }
        },
        clear( state, payload ) {
            state.projects = {};
        }
    },

    actions : {
        async project( context : any, id : number ) {
            let project = context.getters.project( id );
            // let project = null;
            if( !project ) {
                const result = await Vue.$http.getProject( id );

                if( !result || result.error ) {
                    console.error( result && result.error || 'error' );
                    alert( '프로젝트를 불러오는데 실패하였습니다.' );
                }
                else {
                    context.commit('project', result);
                    project = result;
                }


            }
            return project;
        }
    }
}