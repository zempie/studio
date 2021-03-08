<template>
    <div style="position: relative">
        <div class="box">
            <iframe :src="$store.getters.devTosUrl">

            </iframe>
            <p class="join_check">
                <input id="useAgree" v-model="useAgree" type="checkbox"><label for="useAgree" class="MAL5">  {{$t('agreement.title')}}</label>
            </p>
        </div>

        <fixed-bottom>
            <q-btn class="MAR10" color="light-blue" :label="$t('agreement.agreement')" @click="onAgree" />
            <a :href="$store.getters.zempieUrl">
                <q-btn class="MAR30" outline color="light-blue" :label="$t('agreement.disagreement')"/>
            </a>

        </fixed-bottom>

    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import FixedBottom from "@/components/fixedBottom.vue";
import { Notify } from 'quasar';

@Component({
    components: {FixedBottom}
})
export default class Tos extends Vue {
    private useAgree : boolean = false;
    private priAgree : boolean = false;
    private marktPrAgreAtChk : boolean = false;

    onAgree() {

        if( !this.useAgree || !this.useAgree ) {

            alert( this.$t('agreement.rules'))
            return;
        }

        this.$emit( '@agree', this.marktPrAgreAtChk );
    }
}
</script>

<style scoped lang="scss">

a {
    text-decoration: none;
}

p, ol, ul, dl, li {
    padding: 0;
    margin: 0;
    list-style: none;
    margin-inline-start: 0;
    line-height: 18px;
}

p, ol, ul, dl {
    margin-left: 15px;
}



.box {
    margin: 0 0 30px 0;
    padding-bottom: 0;
    border-bottom: 1px solid #9AA7B4;

    iframe {
        border: 1px solid #9AA7B4;
        width: 100%;
        height: 400px;

        ::-webkit-scrollbar {

        }
    }
}

.join_tit {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-weight: bold;
}

.join_agreement {
    overflow-y: auto;
    height: 100px;
    padding: 10px 10px 10px 0;
    border: 1px solid #777777;

    .personal_wrap {
        padding-bottom: 10px;
        font-size: 12px;
        line-height: 16px;
        h2 {
            line-height: 16px;
            font-size: 14px;
            font-weight: bold;
            margin: 35px 0 20px 0;
            color: #2c75a8;
            text-align: center;
        }

        h3 {
            line-height: 16px;
            font-size: 100%;
            margin: 25px 0 5px 10px;
            font-weight: bold;
            color: #787878;
        }


    }

}

.join_check {
    padding: 7px 0 7px 0;
    margin: 0 0 0 10px;

    input {
        vertical-align: middle;
        margin: 3px 3px 3px 4px;
    }

    label {
        vertical-align: middle;
    }

}


</style>