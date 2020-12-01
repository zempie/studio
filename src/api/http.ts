import Vue, {PluginObject} from 'vue';
import store from '@/store';
import firebase from 'firebase';


export default class Http {
    constructor() {

    }

    async request( method : string, url : string, data : any, withCredentials : boolean = false, errorCallback : Function | null = null, retryCount : number = 0 ): Promise<any> {
        try {
            const result = await Vue.$axios({
                method : method,
                url,
                data,
                withCredentials
            }  );
            return result.data;
        }
        catch (error) {
            if ( error.response.data && error.response.data.error === 'Unauthorized' ) {
                const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    const idToken = await currentUser.getIdToken(true);
                    store.commit('idToken', idToken);
                    if ( retryCount < 3 ) {
                        return await this.request(method, url, data, withCredentials, errorCallback, ++retryCount );
                    }
                    else {
                        //3번 초과
                        errorCallback && errorCallback(error);
                        throw new Error(error);
                    }
                }
                else {
                    //로그인 안됨.
                    errorCallback && errorCallback(error);
                    throw new Error(error)
                    // return error;
                }
            }
            // throw error;
            return error.response.data;
        }
    }
    //USER
    async session() {
        const response = await this.request( 'get', '/user/verify-session', undefined, true );
        return response.result || response;
    }
    async getUserInfo() {
        const response = await this.request( 'get', '/user/info', undefined, true );
        return response.result || response;
    }
    async verifyEmail() {
        const response = await this.request( 'post', '/user/verify-email', undefined, false );
        return response.result || response;
    }

    async signupDev() {
        const response = await this.request( 'post', '/studio/developer', undefined, false );
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


        const response = await this.request( 'post', '/studio/project', formData, false );
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

        const response = await this.request( 'patch', `/studio/project/${options.id}`, formData, false );
        return response.result || response;
    }

    async getProjects() {
        const response = await this.request( 'get', '/studio/project', undefined, false );
        return response.result || response;
    }

    async getProject( id ) {
        const response = await this.request( 'get', `/studio/project/${id}`, undefined, false );
        return response.result || response;
    }

    async deleteProject( id ) {
        const response = await this.request( 'delete', `/studio/project/${id}`, undefined, false );
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

        const response = await this.request( 'post', `/studio/version`, formData, false );
        return response.result || response;
    }

    async deleteVersion( id ) {
        const response = await this.request( 'delete', `/studio/version/${id}`, undefined, false );
        return response.result || response;
    }

    async confirmGamePath( pathname : string ) {
        const response = await this.request( 'get', `/studio/verify-pathname/${pathname}`, undefined, false );
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