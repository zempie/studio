<template>
    <q-menu>
        <q-list style="border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.28)" separator>
            <q-item v-for="(item, idx) in $store.getters.mails" :key="idx" clickable @click="onClickMail(item)" class="mailItem">
                <q-item-section>
                    <div class="flex">
                        <div class="category flex column items-center q-mr-sm">
                            <q-icon :name="categoryList[item.category]" class="q-mt-sm q-mb-sm block"></q-icon>
                            <q-badge color="red" v-if="!item.is_read" class="block">
                                new
                            </q-badge>
                        </div>
                        <div class="text">
                            <div class="text-weight-bold q-mb-xs">
                                {{ item.title }}
                            </div>

                            <div class="content" v-if="item.open">
                                {{ item.content }}
                            </div>

                            <div class="date">
                                {{ dateFormat( item.created_at ) }}{{ $t('mailPopup.date.before') }}
                            </div>
                        </div>

                        <div class="delete q-mt-xs" @click.prevent.stop="deleteMail(item.id)">
                            &times;
                        </div>
                    </div>
                </q-item-section>
            </q-item>

            <q-item v-if="$store.getters.mails.length === 0">
                <q-item-section>
                    <div class="flex">
                        <div class="text text-center">
                            {{ $t('mailPopup.noMail') }}
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

    categoryList = [
        'fas fa-bullhorn', // 일반 알림
        'fas fa-bullhorn', // 일반 알림
        'fas fa-check-circle', // 심사 완료
        'fas fa-exclamation-circle', // 제재
        'fas fa-exclamation-circle', // 제재
        'fas fa-exclamation-circle', // 제재
        'fas fa-exclamation-circle', // 제재
        'fas fa-gratipay', // 하트
        'fas fa-bullhorn',
        'fas fa-bullhorn',
    ]

    async onClickMail( mail ) {
        if( !mail.content ) {
            await this.loadMailContent( mail.id );
        } else {
            if( mail.open ) {
                this.$store.commit( 'closeMail', { id : mail.id } );
            } else {
                this.$store.commit( 'openMail', { id : mail.id } );
            }
        }
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
        const result = await this.$http.deleteMail(mail_id);
        if( !result || result.error ) {
            console.error(result);
        }
        else {
            await this.$store.dispatch('deleteMail', { id : mail_id });
        }
    }

    dateFormat( createdAt ) {
        let minute = Math.ceil((new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60));
        const timeUnit = [60, 24, 30, 12];
        let time = [minute < 0 ? 0 : minute];
        const timeLabel = [
            this.$t('mailPopup.date.minute') as string,
            this.$t('mailPopup.date.hour') as string,
            this.$t('mailPopup.date.day') as string,
            this.$t('mailPopup.date.month') as string,
            this.$t('mailPopup.date.year') as string,
        ];
        for( let i = 0; i < timeUnit.length; i++ ) {
            time[i + 1] = Math.floor(time[i] / timeUnit[i]);
            if( time[i + 1] == 0 ) {
                return time[i] + timeLabel[i];
            }
        }
        return time[ time.length - 1 ] + timeLabel[ time.length - 1 ];
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

.mailItem {
    width: 350px;
}

.text {
    margin-top: 6px;
    width: 256px;
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
