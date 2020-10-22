import Vue, {PluginObject} from 'vue';
import store from '@/store';
import firebase from 'firebase';


export default class Rpc {
    constructor() {

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

    //회원가입
    async getUserInfo() {
        const response = await this.requestRpc( 'get-user-info', {

        } );
        return response;
    }

    async getDev() {
        const response = await this.requestRpc( 'get-developer', {

        } );
        return response;
    }

    async confirmGamePath( pathname : string ) {
       const response = await this.requestRpc( 'verify-pathname', {
           pathname,
       } );
       return response;
    }

    // async createDev() {
    //     const response = await this.requestRpc( 'create-developer', {
    //
    //     } );
    //     return response;
    // }

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