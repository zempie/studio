import Vue, {PluginObject} from 'vue';
import store from '@/store';
import firebase from 'firebase';


export default class Http {
    constructor() {

    }

    async request( promise : Promise<any>, errorCallback : Function | null = null, retryCount : number = 1 ) : Promise<any> {
        try {
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
            console.error( error.response.data );
            return error.response.data;
            //throw error;
        }
    }
    //USER
    async session() {
        const response = await this.request( Vue.$axios.get(`/user/verify-session`) );
        return response.result || response;
    }
    async getUserInfo() {
        const response = await this.request( Vue.$axios.get( '/user/info' ) );
        return response.result || response;
    }
    async verifyEmail() {
        const response = await this.request( Vue.$axios.post(`/user/verify-email`) );
        return response.result || response;
    }



    async signupDev() {
        const response = await this.request( Vue.$axios.post( '/studio/developer' ) );
        return response.result || response;
    }

    async createProject( options : { name? : string, description? : string, pathname? : string, project_picture? : File },
                         updateVersion : { version? : string, autoDeploy? : boolean, startFile? : string }, files : File[] ) {
        const formData = new FormData();
        for( let k in options ) {
            formData.append( k, options[k] );
        }

        for( let k in updateVersion ) {
            formData.append( k, updateVersion[k] );
        }

        for( let i = 0; i < files.length; i++ ) {
            const file = files[i] as File;
            formData.append( `file_${i + 1}`, file );
        }


        const response = await this.request( Vue.$axios.post( '/studio/project', formData ) );
        return response.result || response;
    }

    async updateProject( options : { id : number, name? : string, description? : string, deploy_version_id? : string  }, file? : File ) {
        //파일 업로드

        const formData = new FormData();
        if( options.id ) { formData.append( 'id', options.id.toString() ); }
        if( options.name ) { formData.append( 'name', options.name ); }
        if( options.description ) { formData.append( 'description', options.description ); }
        if( options.deploy_version_id ) { formData.append( 'deploy_version_id', options.deploy_version_id ); }
        if( file ) {
            formData.append( 'file', file );
        }

        const response = await this.request( Vue.$axios.patch( `/studio/project/${options.id}`, formData ) );
        return response.result || response;
    }

    async getProjects() {
        const response = await this.request( Vue.$axios.get('/studio/project') );
        return response.result || response;
    }

    async getProject( id ) {
        const response = await this.request( Vue.$axios.get(`/studio/project/${id}`) );
        return response.result || response;
    }

    async deleteProject( id ) {
        const response = await this.request( Vue.$axios.delete(`/studio/project/${id}`) );
        return response.result || response;
    }


    async createVersion( project_id : number, version : string, files : File[], startFile : string , autoDeploy : boolean) {
        //파일 업로드

        const formData = new FormData();
        formData.append( 'project_id', project_id.toString() );
        formData.append( 'version', version );
        formData.append( 'startFile', startFile );
        formData.append( 'autoDeploy', String(autoDeploy) );

        for( let i = 0; i < files.length; i++ ) {
            const file = files[i] as File;
            formData.append( `file_${i + 1}`, file );
        }

        const response = await this.request( Vue.$axios.post( '/studio/version', formData ) );
        return response.result || response;
    }

    async deleteVersion( id ) {
        const response = await this.request( Vue.$axios.delete(`/studio/version/${id}`) );
        return response.result || response;
    }

    async confirmGamePath( pathname : string ) {
        const response = await this.request( Vue.$axios.get(`/studio/verify-pathname/${pathname}`) );
        return response.result || response;
    }



}


const _http = new Http();
const Plugin: PluginObject<any> = {
    install: (Vue) => {
        Vue.$http = _http;
    },
};
Plugin.install = (Vue) => {
    Vue.$http = _http;
    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return _http;
            },
        },
    });
};

Vue.use(Plugin);