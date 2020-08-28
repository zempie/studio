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
        version : ( state : any ) => ( project_id : number, number : number ) => {
            const versions = state.projects[project_id] && state.projects[project_id].versions || {};
            return versions[number] || null;
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
        },
        projects( state, payload ) {
            for( let i = 0; i < payload.length; i++ ) {
                const prj = payload[i];
                state.projects[ prj.id ] = prj;
            }
        },
        version( state, payload ) {
            state.projects[payload.project_id].versions[ payload.number ] = payload;
        },
        versions( state, payload ) {
            for( let i = 0; i < payload.length; i++ ) {
                const version = payload[i];
                const project = state.projects[ version.project_id ];
                const versions = project.versions || {};
                project.versions = versions;
                versions[ version.number ] = version;
            }
        },
    },

    actions : {
        async project( context : any, id : number ) {
            let project = context.getters.project( id );
            if( !project ) {
                const result = await Vue.$rpc.getProject( id );
                context.commit('project', result);
                project = result;
            }
            return project;
        }
    }
}