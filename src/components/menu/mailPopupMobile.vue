<template>
    <q-dialog :maximized="true" v-model="active" transition-show="slide-right" transition-hide="slide-left">
        <q-list class="root" separator>
            <q-item>
                <q-item-section>
                    <div class="row">
                        <q-avatar class="icon q-mr-md" @click="$store.commit('mailPopupMobile', false)">
                            <q-icon name="clear" class="q-mr-md"></q-icon>
                        </q-avatar>
                        <div class="menuText">알림</div>
                    </div>
                </q-item-section>
            </q-item>
            <q-item v-for="(item, idx) in $store.getters.mails" :key="idx" clickable @click="loadMailContent(item.id)">
                <q-item-section>
                    <div class="flex full-width">
                        <div class="category flex column items-center q-mr-sm">
                            <q-icon name="fas fa-bullhorn" class="q-mt-sm q-mb-sm block"></q-icon>
                            <q-badge color="red" v-if="!item.is_read" class="block">
                                new
                            </q-badge>
                        </div>
                        <div class="text">
                            <div class="text-weight-bold">
                                {{ item.title }}
                            </div>

                            <div class="content" v-if="item.content !== null && item.content !== undefined">
                                {{ item.content }}
                            </div>

<!--                            <div class="date">-->
<!--                                {{ item.date }}-->
<!--                            </div>-->
                        </div>
                    </div>
                </q-item-section>
            </q-item>

            <q-item v-if="$store.getters.mails.length === 0">
                <q-item-section>
                    <div class="flex">
                        <div class="text text-center">
                            알림이 없습니다.
                        </div>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </q-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import Login from "src/scripts/login";

@Component
export default class AccountPopupMobile extends Vue {

    private active : boolean = false;
    mails = [];

    mounted() {
        this.mails = [
            {
                title: "개발 스튜디오 이용 제한 안내",
                content: "이용약관 위반 활동이 감지되어 게임 업로드가 제한되었습니다.",
                date: "1일 전",
                icon: "fas fa-bullhorn",
            },
            {
                title: "커뮤니티 이용 제한 안내",
                content: "이용약관 위반 활동이 감지되어 댓글은 작성할 수 없습니다.",
                date: "1일 전",
                icon: "fas fa-bullhorn",
            },
            {
                title: "게임",
                content: "honey keeper에 좋아요가 올랐습니다.",
                date: "3일 전",
                icon: "fas fa-thumbs-up",
            },
            {
                title: "게임",
                content: "basketball papa에 새로운 댓글이 달렸습니다.",
                date: "일주일 전",
                icon: "fas fa-comment-dots",
            },
        ];
    }

    beforeDestroy() {
        // console.log(1234);
    }

    @Watch( 'active' )
    private onChangedActive() {
        this.$store.commit('mailPopupMobile', this.active);
    }

    @Watch( '$store.getters.mailPopupMobile' )
    private onChangedMailPopupMobile() {
        this.active = this.$store.getters.mailPopupMobile;
    }

    async loadMailContent( mail_id : number ) {
        let mail = this.$store.getters.mails.find(mail => mail.id == mail_id)
        if( mail.content !== null && mail.content !== undefined ) {
            return;
        }
        const result = await this.$api.readMail(mail_id);
        if( !result || result.error ) {
            console.error(result);
        }
        else {
            this.$store.commit('setMailContent', { id : mail_id, content : result.content });
        }
    }
}
</script>
<style lang="scss" scoped>
a {
    text-decoration: none;
}

.root {
    background-color: #282828;
    .menuItem {
        color: #b7b7b7;
    }

    .menuText {
        line-height: 48px;
        font-size: 18px;
    }

    .category {
        width: 34px;
    }

    .text {
        margin-top: 6px;
        width: calc(100% - 42px);

        .content {
            word-wrap: break-word;
            color: #d0d0d0;
        }
    }
}
</style>
