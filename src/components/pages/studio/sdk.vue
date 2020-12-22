<template>
    <q-page class="q-pa-lg">
        <content-box>
            <q-markdown>
                ## 설치
            </q-markdown>
            <q-markdown>
                ### npm
            </q-markdown>
            <q-markdown
                :no-highlight="true"
                :no-line-numbers="true"
            >
                ``` javascript
                $ npm install zempie-sdk-test
                ```
            </q-markdown>
        </content-box>
    </q-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ContentBox from "@/components/layout/contentBox.vue";
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'

@Component({
    components: {
        ContentBox,
        QMarkdown
    }
})
export default class ProjectVersion extends Vue {

}
</script>

<style scoped>

</style>