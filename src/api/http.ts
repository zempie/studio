import Vue, { PluginObject } from 'vue';
import store from '@/store';
import firebase from 'firebase';


export default class Http {
    constructor() {

    }

    async request(method: string, url: string, data: any, withCredentials: boolean = false, errorCallback: Function | null = null, retryCount: number = 0): Promise<any> {
        try {
            const result = await Vue.$axios({
                method: method,
                url,
                data,
                withCredentials
            });
            return result.data;
        }
        catch (error) {
            if ( error?.response?.data?.code === 10001 ) {
                const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    const idToken = await currentUser.getIdToken(true);
                    store.commit('idToken', idToken);
                    if (retryCount < 3) {
                        return await this.request(method, url, data, withCredentials, errorCallback, ++retryCount);
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
            const result = error && error.response && error.response.data || {
                error: error.message || error,
            };
            return result;
        }
    }
    //USER
    async session() {
        const response = await this.request('get', '/user/verify-session', undefined, true);
        return response.result || response;
    }
    async getUserInfo() {
        const response = await this.request('get', '/user/info', undefined, true);
        return response.result || response;
    }
    async verifyEmail() {
        const response = await this.request('post', '/user/verify-email', undefined, false);
        return response.result || response;
    }
    async signOut() {
        const response = await this.request('post', `/user/sign-out`, undefined, true);
        return response.result || response;
    }

    async signupDev() {
        const response = await this.request('post', '/studio/developer', undefined, false);
        return response.result || response;
    }

    async createProject(options: { name?: string, description?: string, hashtags?: string, pathname?: string, project_picture?: File, project_picture2?: File },
        updateVersion: { version?: string, autoDeploy?: boolean, startFile?: string, size?: number, version_description?: string }, files: File[]) {


        const formData = new FormData();
        for (let k in options) {
            formData.append(k, options[k]);
        }

        for (let k in updateVersion) {
            formData.append(k, updateVersion[k]);
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i] as File;
            formData.append(`file_${i + 1}`, file);
        }


        const response = await this.request('post', '/studio/project', formData, false);
        return response.result || response;
    }

    async updateProject(options: { id: number, name?: string, description?: string, hashtags?: string, deploy_version_id?: string }, file?: File, file2?: File) {
        //파일 업로드

        const formData = new FormData();
        if (options.id) { formData.append('id', options.id.toString()); }
        if (options.name) { formData.append('name', options.name); }
        if (options.description) { formData.append('description', options.description); }
        if (options.hashtags) { formData.append('hashtags', options.hashtags); }
        if (options.deploy_version_id !== undefined) { formData.append('deploy_version_id', options.deploy_version_id); }
        if (file) {
            formData.append('file', file);
        }
        if (file2) {
            formData.append('file2', file2);
        }

        const response = await this.request('post', `/studio/project/${options.id}`, formData, false);
        store.commit('project', response.result)
        return response.result || response;
    }

    async getProjects() {
        const response = await this.request('get', '/studio/project', undefined, false);
        return response.result || response;
    }

    async getProject(id) {
        const response = await this.request('get', `/studio/project/${id}`, undefined, false);
        return response.result || response;
    }

    async deleteProject(id) {
        const response = await this.request('delete', `/studio/project/${id}`, undefined, false);
        return response.result || response;
    }


    async createVersion(project_id: number, version: string, files: File[], startFile: string, autoDeploy: boolean, size: number, description: string) {
        //파일 업로드

        const formData = new FormData();
        formData.append('project_id', project_id.toString());
        formData.append('version', version);
        formData.append('startFile', startFile);
        formData.append('autoDeploy', String(autoDeploy));
        formData.append('description', description);
        if (size) {
            formData.append('size', size.toFixed(2));
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i] as File;
            formData.append(`file_${i + 1}`, file);
        }

        const response = await this.request('post', `/studio/version`, formData, false);
        return response.result || response;
    }

    async deleteVersion(id) {
        const response = await this.request('delete', `/studio/version/${id}`, undefined, false);
        return response.result || response;
    }

    async confirmGamePath(pathname: string) {
        const response = await this.request('get', `/studio/verify-pathname/${pathname}`, undefined, false);
        return response.result || response;
    }
    //알람 
    async mails() {
        const response = await this.request('get', '/user/mails', undefined, false);
        return response.result || response;
    }

    async readMail(mail_id: number) {
        const response = await this.request('get', `/user/mail/${mail_id}`, undefined, false);
        return response.result || response;
    }

    async deleteMail(mail_id: number) {
        const response = await this.request('post', '/user/mail/d', { mail_id }, false);
        return response.result || response;
    }

    //survey
    async surveyStatus(){
        const response = await this.request('get', '/studio/survey', undefined)
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