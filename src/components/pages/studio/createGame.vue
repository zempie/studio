<template>
    <q-page class="no-drag">
        <div class="title-area">
        <div class="text-center">
            <span class="zempie-logo">ZEMPLATE</span><br><br>
        </div>
        <div class="text-center q-my-lg" style="font-size:20px; font-weight: 500;">  {{$t('createGame.description')}}</div>
        </div>
        <div class="game-selection row flex-center flex text-center">
            <q-card class="my-card col-3 q-mr-lg" >
                <!-- <a :href="$store.getters.shootingTemplateUrl" target="_blank"> -->
                    <q-card-section class="dimmed">
                               <div class="dimmed-above">
                        COMING<br />
                        SOON!
                             </div>
                        <i class="round-icon fas fa-rocket"></i>
                    </q-card-section>
                    
                    <q-card-section class="zemplate-desc">
                        <div class="text-h6 q-mb-md zemplate-title">
                            {{$t('createGame.shootingGame.title')}}
                        </div>
                        <div>{{$t('createGame.shootingGame.desc')}}</div>
                    </q-card-section>
                </a>
            </q-card>
            <q-card class="my-card col-3 q-mr-lg">
                <!-- <a href="#"> -->
                    <q-card-section class="dimmed">
                         <div class="dimmed-above">
                        COMING<br />
                        SOON!
                             </div>
                        <i class="round-icon fas fa-running"></i>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="zemplate-desc">
                        <div class="text-h6 q-mb-md zemplate-title">
                            {{$t('createGame.platformer.title')}}
                        </div>
                        <div>{{$t('createGame.platformer.desc')}}
                        </div>
                    </q-card-section>
                <!-- </a> -->
            </q-card>
            <q-card class="my-card col-3">
                <q-card-section class="dimmed">
                    <div class="dimmed-above">
                        COMING<br />
                        SOON!
                    </div>
                    <i class="round-icon fas fa-question"></i>
                </q-card-section>
                <q-separator />
                <q-card-section class="zemplate-desc">
                    <div class="text-h6 q-mb-md">???</div>
                    <div>{{$t('createGame.next.desc')}}</div>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>


<script  lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
    
})
export default class CreateGame extends Vue {
    async mounted() {
        this.$store.commit('pageName', this.$t('createGame.toolbarTitle'));
        
    }
}
</script>
<style scoped>
.no-drag {-ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;}

.title-area{
    height:330px;
   height: 330px;
    padding-top: 116px;
}

.zempie-logo {
    font-weight: bold;
    font-size: 16px;
    border: 2px solid;
    border-radius: 20px;
    padding: 10px 40px 10px 40px;
     flex-direction: row;
    flex-wrap: wrap;
}
.round-icon {
    background-color: #0009;
    width: 100px;
    height: 100px;
    border-radius: 75px !important;
    text-align: center;
    margin: 10px auto 10px auto;
    font-size: 12px;
    color: #fff;
    vertical-align: middle;
    line-height: 100px;
}
.zemplate-desc {
    min-height: 70px;
    height: 150px;
    background-color: #181818 !important;
    font-weight: 300;
    text-align: left;
}
.q-card{
box-shadow: none !important;
}
.q-card__section--vert {
    background-color: rgb(126, 126, 126);
}
.game-selection {
    display: flex;
    align-items: center;
    max-width: 1440px;
    margin: 0 auto
}
.dimmed-above {
    z-index: 999;
    position: absolute;
    font-size: 30px;
    font-weight: 700;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;
    top: 0;
    justify-content: center;
}
.fa-running:before,
.fa-rocket:before,
.fa-question::before {
    font-size: 67px;
}
a:link {
    text-decoration: none;
}
a:visited {
    color: #fff;
}
a {
    color: #fff;
}
a:hover {
    color: #d5d5d5;
}

.zemplate-title {
    font-weight: 700;
}
</style>