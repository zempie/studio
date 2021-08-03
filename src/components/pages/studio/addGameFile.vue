<template>
    <div class="grid-column">
        <content-box>
            <div class="text-h6 q-my-xl">
                {{ $t("addGame.firstVersionAdd") }}
            </div>

            <content-box-block
                class="q-mb-xl"
                :title="$t('addGame.gameFileUpload.title')"
                :star="'*'"
            >
                <q-input
                    @input="
                        (val) => {
                            uploadGameFile = val[0];
                        }
                    "
                    filled
                    type="file"
                    accept=".zip"
                    :error="uploadGameFileError !== ''"
                    :error-message="uploadGameFileError"
                />
                <div
                    v-if="uploadGameFiles.length"
                    class="text-body2 text-right"
                >
                    {{ $t("addGame.totalSize") }} :
                    {{
                        totalSize < 1
                            ? `${totalSize * 1000} KB`
                            : `${totalSize} MB`
                    }}
                </div>
                <div class="hintText">
                    {{ $t("addGame.gameFileUpload.rules") }}
                </div>
            </content-box-block>
            <q-slide-transition>
                <div v-if="uploadMore">
                    <content-box-block
                        class="q-mb-xl"
                        :title="$t('addGame.startFileSelect.title')"
                        :star="'*'"
                    >
                        <q-select
                            style="margin-top: 20px"
                            :label="$t('addGame.startFileSelect.desc')"
                            v-model="startFile"
                            :options="startFileOptions"
                            :error="startFileError !== ''"
                            :error-message="startFileError"
                        ></q-select>
                    </content-box-block>
                    <content-box-block
                        class="q-mb-xl"
                        :title="$t('addGame.autoDeployStatus.title')"
                    >
                        <q-toggle v-model="autoDeploy">{{
                            autoDeploy
                                ? $t("addGame.autoDeployStatus.autoDeployMode")
                                : $t(
                                      "addGame.autoDeployStatus.manualDeployMode"
                                  )
                        }}</q-toggle>
                        <div class="hintText">
                            {{ $t("addGame.autoDeployStatus.rules") }}
                        </div>
                    </content-box-block>
                    <!--                    <content-box-block class="q-mb-xl" title="버전 설명">-->
                    <!--                        <q-input type="textarea" counter maxlength="2000" v-model="versionDescription"/>-->
                    <!--                        <div class="hintText">-->
                    <!--                            새로운 버전에 대한 내용을 입력해 주세요.-->
                    <!--                        </div>-->
                    <!--                    </content-box-block>-->
                </div>
            </q-slide-transition>

            <q-btn flat class="full-width" @click="uploadMore = !uploadMore">
                {{ $t("advancedSetting") }}
                <q-icon v-if="!uploadMore" name="arrow_drop_down" />
                <q-icon v-else name="arrow_drop_up" />
            </q-btn>
        </content-box>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ZipUtil from "@/common/zipUtil";
import ContentBox from "@/components/layout/contentBox.vue";
import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
import store from "@/store";
@Component({
    components: { ContentBox, ContentBoxBlock },
})
export default class addGameFile extends Vue {
    private limitSize: number = 1024 * 1000 * 100;
    private totalSize: number = 0;
    private startFile: string = "";
    private uploadGameFileError: string = "";
    private uploadGameFile: File = null;
    private uploadGameFiles: File[] = [];
    private startFileOptions: string[] = [];

    private uploadMore: boolean = false;

    private autoDeploy: boolean = true;
    private versionDescription: string = "";

    beforeRouteEnter(to, undefined, next) {
        if (!store.getters.gameStage) {
            next("/selectStage");
        } else {
            next();
        }
    }

    mounted() {
        this.$store.commit("sendGameFileDone", false);
    }

    @Watch("uploadGameFile")
    private async onChangedFile() {
        if (!this.uploadGameFile) {
            return;
        }

        this.$store.commit("ajaxBar", true);
        this.$q.loading.show({
            message: this.$t("addGame.success.checkFile").toString(),
        });

        const zip = await ZipUtil.zipFileToZip(this.uploadGameFile);
        // console.log( zip );

        const files = await ZipUtil.zipToFiles(zip);
        let size = 0;
        for (let f in files) {
            size += files[f].size;
        }

        if (size > this.limitSize) {
            this.uploadGameFileError = this.$t(
                "addGame.error.fileSizeExceeded"
            ).toString();
            return;
        }

        this.totalSize = Number((size / (1024 * 1000)).toFixed(2));
        this.uploadGameFiles = files;
        // console.log(this.uploadGameFiles);

        const htmls = this.uploadGameFiles.filter((file) => {
            return file.name.indexOf(".html") > -1;
        });

        this.startFileOptions = htmls.map((file) => file.name);
        this.startFileOptions.sort((a, b) => a.length - b.length);
        const indexFiles = this.startFileOptions.filter((name) =>
            name.includes("index")
        );

        if (indexFiles.length) {
            indexFiles.sort((a, b) => a.length - b.length);
            this.startFile = indexFiles[0];
        } else {
            this.startFile = this.startFileOptions[0];
        }

        this.startFileOptions.sort((a, b) => a.length - b.length);

        if (this.startFileOptions.length) {
            this.uploadGameFileError = "";
        } else {
            this.uploadGameFileError = this.$t(
                "addGame.error.notFoundHtml"
            ).toString();
        }

        this.$store.commit("ajaxBar", false);
        this.$q.loading.hide();

        if (
            this.uploadGameFiles.length > 0 &&
            this.startFileOptions.length > 0
        ) {
            this.$store.commit("sendGameFileDone", true);
            const gameFileInfo = {
                autoDeploy: this.autoDeploy,
                starFile: this.startFile,
                size: this.totalSize,
                version_description: this.versionDescription,
            };
            console.log(gameFileInfo);
            this.$store.commit("gameFileInfoObj", gameFileInfo);
            this.$store.commit("uploadGameFiles", this.uploadGameFiles);
        } else {
            this.$store.commit("sendGameFileDone", false);
        }
    }

    //  if (!this.uploadGameFiles.length) {
    //         isError = true;
    //         this.uploadGameFileError = this.$t(
    //             "addGame.error.noLoadFile"
    //         ).toString();
    //     }
}
</script>

<style scoped>
</style>
