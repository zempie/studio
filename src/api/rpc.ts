import Vue, {PluginObject} from 'vue';
import store from '@/store';
import firebase from 'firebase';


export default class Rpc {
    constructor() {

    }

    async request( promise : Promise<any>, errorCallback : Function | null = null, retryCount : number = 1 ) : Promise<any> {
        try {
            // const result = await p
            // romise;

            const res = await promise;
            return res.data;
        }
        catch (error) {
            if ( error.response.data === 'Unauthorized' ) {
                const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    const idToken = await currentUser.getIdToken(true);
                    store.commit('idToken', idToken);
                    console.log( idToken );
                    if ( retryCount < 3 ) {
                        return await this.request(promise, errorCallback, ++retryCount);
                    }
                    else {
                        errorCallback && errorCallback(error);
                        throw new Error('읭?')
                    }
                }
                else {
                    errorCallback && errorCallback(error);
                    throw new Error('읭?')
                    // return error;
                }
            }
            // return error;
            throw error;
        }
    }

    async requestRpc( method : string, params : any = {}, errorCallback : Function | null = null, retryCount : number = 1 ) : Promise<any> {
        if ( store.getters.idToken ) {
            params.authorization = `Bearer ${store.getters.idToken}`;
        }

        try {
            const res =  await Vue.$axios.post( '/rpc', {
                jsonrpc: '2.0',
                method,
                params,
                id: '0'
            } ) as any;
            return res.data;
        }
        catch (error) {
            if ( error.response.data.error.message === 'Unauthorized') {
                const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    const idToken = await currentUser.getIdToken(true);
                    store.commit('idToken', idToken);
                    console.log( idToken );
                    if ( retryCount < 3 ) {
                        return await this.requestRpc(method, params, errorCallback, ++retryCount);
                    }
                    else {
                        errorCallback && errorCallback(error);
                        throw new Error('error')
                    }
                }
                else {
                    errorCallback && errorCallback(error);
                    throw new Error('error')
                    // return error;
                }
            }
            // return error;
            throw error;
        }
    }


    async getDev() {
        const response = await this.requestRpc( 'get-developer', {

        } );
        console.log(response);
        return response;
    }

    async createDev() {
        const response = await this.requestRpc( 'create-developer', {

        } );
        return response;
    }

    async updateDev( name? : string, file? : File ) {
        //파일 업로드

        const formData = new FormData();
        if( name ) { formData.append( 'name', name ); }
        if( file ) { formData.append( 'file', file ); }

        const response = await this.request( Vue.$axios.post( '/studio/developer', formData ) );
        return response;
    }

    async getProjects() {
        const response = await this.requestRpc( 'get-projects', {

        } );
        return response;
    }

    async getProject( id ) {
        const response = await this.requestRpc( 'get-project', {
            id
        } );
        return response;
    }

    async createProject( name, description, control_type ) {
        const response = await this.requestRpc( 'create-project', {
            name,
            description,
            control_type
        } );
        return response;
    }

    async updateProject( options : { id : number, name? : string, control_type? : number, description? : string, deploy_version_id? : string, pathname? : string  }, file? : File ) {
        //파일 업로드

        const formData = new FormData();
        formData.append( 'id', options.id.toString() );

        if( options.name ) { formData.append( 'name', options.name ); }
        if( options.control_type ) { formData.append( 'control_type', options.control_type.toString() ); }
        if( options.description ) { formData.append( 'description', options.description ); }
        if( options.deploy_version_id ) { formData.append( 'deploy_version_id', options.deploy_version_id ); }
        if( options.pathname ) { formData.append( 'pathname', options.pathname ); }
        if( file ) {
            formData.append( 'file', file );
        }

        //{id, name, picture, control_type, description, game_id, version_id}
        // const response = await this.requestRpc( 'set-project', options );
        try {
            const res = await this.request( Vue.$axios.post( '/studio/project', formData ) );
            return res;
        }
        catch (e) {
            console.log(e.response);
            return e.response.data;
        }
    }

    async deleteProject() {

    }

    async getVersions(project_id) {
        const response = await this.requestRpc( 'get-versions', {
            project_id
        } );
        return response;
    }

    async getVersion(id) {
        const response = await this.requestRpc( 'get-version', {
            id
        } );
        return response;
    }

    async createVersion( project_id : number, version : string, description : string, files : File[], startFile : string ) {
        //파일 업로드

        const formData = new FormData();
        formData.append( 'project_id', project_id.toString() );
        formData.append( 'version', version );
        formData.append( 'startFile', startFile );
        formData.append( 'description', description );

        for( let i = 0; i < files.length; i++ ) {
            const file = files[i] as File;
            formData.append( `file_${i + 1}`, file );
        }

        const response = await this.request( Vue.$axios.post( '/studio/version', formData ) );
        return response;
    }

    async updateVersion( options : { id : number, state? : string, url? : string, description? : string }) {
        //id, state, url, description
        const response = await this.requestRpc( 'set-version', options );
        return response;
    }
}


const _rpc = new Rpc();
const Plugin: PluginObject<any> = {
    install: (Vue) => {
        Vue.$rpc = _rpc;
    },
};
Plugin.install = (Vue) => {
    Vue.$rpc = _rpc;
    Object.defineProperties(Vue.prototype, {
        $rpc: {
            get() {
                return _rpc;
            },
        },
    });
};

Vue.use(Plugin);