import Vue from 'vue';


export default {
    state: {
        gameStage: null,
        sendGameInfoDone: false,
        sendGameFileDone: false,

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
    },
    actions: {

    }

}