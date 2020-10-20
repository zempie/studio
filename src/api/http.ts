import Vue, {PluginObject} from 'vue';
import store from '@/store';
import firebase from 'firebase';


export default class Http {
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

    async createDev(name? : string, file? : File) {
        const formData = new FormData();
        if( name ) { formData.append( 'name', name ); }
        if( file ) { formData.append( 'file', file ); }

        const response = await this.request( Vue.$axios.post( '/studio/developer', formData ) );
        return response;
    }


    async updateDev( name? : string, file? : File ) {
        //파일 업로드

        const formData = new FormData();
        if( name ) { formData.append( 'name', name ); }
        if( file ) { formData.append( 'file', file ); }

        const response = await this.request( Vue.$axios.put( '/studio/developer', formData ) );
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