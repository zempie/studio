<template>
    <q-menu>
        <q-list style="border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.28)" separator>
            <q-item v-for="(item, idx) in $store.getters.mails" :key="idx" clickable @click="loadMailContent(item.id)">
                <q-item-section>
                    <div class="flex">
                        <div class="category flex column items-center q-mr-sm">
                            <q-icon name="fas fa-bullhorn" class="q-mt-sm q-mb-sm block"></q-icon>
                            <q-badge color="red" v-if="!item.is_read" class="block">
                                new
                            </q-badge>
                        </div>
                        <div class="text">
                            <div class="text-weight-bold q-mb-xs">
                                {{ item.title }}
                            </div>

                            <div class="content" v-if="item.content !== null && item.content !== undefined">
                                {{ item.content }}
                            </div>

<!--                            <div class="date">-->
<!--                                {{ item.date }}-->
<!--                            </div>-->
                        </div>

<!--                        <div class="delete" @click.prevent="deleteMail(item.id)">-->
<!--                            ❌-->
<!--                        </div>-->
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
    </q-menu>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class MailPopupDesktop extends Vue {
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

    async loadMailContent( mail_id : number ) {
        let mail = this.$store.getters.mails.find(mail => mail.id == mail_id)
        if( mail.content !== null && mail.content !== undefined ) {
            return;
        }
        const result = await this.$http.readMail(mail_id);
        if( !result || result.error ) {
            console.error(result);
        }
        else {
            this.$store.commit('setMailContent', { id : mail_id, content : result.content });
        }
    }

    async deleteMail( mail_id : number ) {
        const result = await Vue.prototype.deleteMail(mail_id);
        if( !result || result.error ) {
            console.error(result);
        }
        else {
            this.$store.commit('deleteMail', { id : mail_id });
        }
    }
}
</script>
<style lang="scss" scoped>
a {
    color: inherit;
    text-decoration: none;
}

.category {
    width: 34px;
}

.text {
    margin-top: 6px;
    width: 280px;
    margin-right: 6px;

    .title {
    }
    .content {
        word-wrap: break-word;
        color: #d0d0d0;
    }
    .date {
        color: #d0d0d0;
        font-size: 0.9em;
    }
}
</style>
