import Vue from 'vue';


export default {
    state: {
        gameStage: null,
        sendGameInfoDone: false,
        sendGameFileDone: false,
        gameInfoObj: null,
        gameFileInfoObj: null,
        uploadGameFiles: null,
        zipOriginFile:null,
    },
    getters: {
        gameStage: (state: any) => {
            return state.gameStage;
        },
        sendGameInfoDone: (state: any) => {
            return state.sendGameInfoDone;
        },
        sendGameFileDone: (state: any) => {
            return state.sendGameFileDone;
        },
        gameInfoObj: (state: any) => {
            return state.gameInfoObj;
        },
        gameFileInfoObj: (state: any) => {
            return state.gameFileInfoObj;
        },
        uploadGameFiles: (state: any) => {
            return state.uploadGameFiles;
        },
        zipOriginFile: (state: any) => {
            return state.zipOriginFile;
        },
    },
    mutations: {
        gameStage: (state: any, payload: any) => {
            state.gameStage = payload;
        },
        sendGameInfoDone: (state: any, payload: any) => {
            state.sendGameInfoDone = payload;
        },
        sendGameFileDone: (state: any, payload: any) => {
            state.sendGameFileDone = payload;
        },
        gameInfoObj: (state: any, payload: any) => {
            state.gameInfoObj = payload;
        },
        gameFileInfoObj: (state: any, payload: any) => {
            state.gameFileInfoObj = payload;
        },
        uploadGameFiles: (state: any, payload: any) => {
            state.uploadGameFiles = payload;
        },
        zipOriginFile: (state: any, payload: any) => {
            state.zipOriginFile = payload;
        },
    },
    actions: {

    }

}