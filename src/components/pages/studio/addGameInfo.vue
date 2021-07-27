<template>
    <div class="grid-column">
        <content-box>
            <content-box-block
                class="q-my-xl"
                :title="$t('addGame.title')"
                :star="'*'"
            >
                <q-input
                    input-class="input"
                    :error="titleError !== ''"
                    :error-message="titleError"
                    counter
                    maxlength="50"
                    v-model="title"
                    @change="
                        (str) => {
                            if (str) {
                                titleError = '';
                            }
                        }
                    "
                />
            </content-box-block>
            <content-box-block
                class="q-mb-xl"
                :title="$t('addGame.description')"
                :star="'*'"
            >
                <q-input
                    type="textarea"
                    counter
                    maxlength="2000"
                    v-model="description"
                    :error="descError !== ''"
                    :error-message="descError"
                />
            </content-box-block>
            <content-box-block
                class="q-mb-xl"
                :title="$t('addGame.tag.title')"
                :star="'*'"
            >
                <q-select
                    ref="hashtagsArr"
                    v-model="hashtagsArr"
                    multiple
                    use-chips
                    use-input
                    new-value-mode="add-unique"
                    hide-dropdown-icon
                    @input.native="createTagChip($event.target.value)"
                    @new-value="createValue"
                    :error="hashtagsError !== ''"
                    :error-message="hashtagsError"
                >
                    <template v-slot:selected-item="scope">
                        <q-chip
                            removable
                            @remove="scope.removeAtIndex(scope.index)"
                            class="q-chip"
                        >
                            {{ scope.opt }}
                        </q-chip>
                    </template>
                </q-select>

                <!-- <q-input counter maxlength="255" :error="hashtagsError !== ''" :error-message="hashtagsError" v-model="hashtags" @change="onChangeHashtags"/> -->
                <div class="hintText">
                    {{ $t("addGame.tag.rules") }}
                </div>
            </content-box-block>
            <content-box-block
                class="q-mb-xl"
                :title="$t('addGame.thumbnailImg.title')"
                :star="'*'"
            >
                <content-box-block-image-uploader
                    v-on:@file="
                        (file) => {
                            thumbFile = file;
                        }
                    "
                    :text="$t('addGame.thumbnailImg.text')"
                    limit-size="4"
                ></content-box-block-image-uploader>
                <div
                    :class="
                        thumbnailErr && !thumbFile
                            ? 'thumbnailErr'
                            : 'thumbnailErr off'
                    "
                >
                    {{ $t("addGame.error.thumbnailBlank") }}
                </div>
                <div class="hintText">
                    {{ $t("addGame.thumbnailImg.rules") }}
                </div>
            </content-box-block>

            <content-box-block
                class="q-mb-xl"
                :title="$t('addGame.previewImg.title')"
            >
                <content-box-block-image-uploader-g-i-f
                    v-on:@file="
                        (file) => {
                            thumbFile2 = file;
                        }
                    "
                    :text="$t('addGame.thumbnailImg.text')"
                    limit-size="10"
                ></content-box-block-image-uploader-g-i-f>
                <div class="hintText">
                    {{ $t("addGame.previewImg.rules") }}
                </div>
            </content-box-block>

            <content-box-block
                class="q-mb-xl"
                :title="$t('addGame.engGameIdSetting.title')"
            >
                <q-toggle v-model="autoGamePath">{{
                    autoGamePath
                        ? $t("addGame.engGameIdSetting.autoInput")
                        : $t("addGame.engGameIdSetting.manualInput")
                }}</q-toggle>
                <q-slide-transition>
                    <div v-if="!autoGamePath">
                        <q-input
                            input-class="input"
                            :disable="waitGamePath"
                            v-model="gamePath"
                            :mask="'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'"
                            :error="gamePathError !== ''"
                            :error-message="gamePathError"
                            @change="
                                (str) => {
                                    confirmedGamePath = false;
                                    if (str) {
                                        gamePathError = '';
                                    }
                                }
                            "
                        >
                            <template v-slot:append>
                                <q-btn
                                    v-if="!confirmedGamePath"
                                    :loading="waitGamePath"
                                    style="background-color: #3b3b3b"
                                    @click="checkGamePath"
                                    >{{
                                        $t(
                                            "addGame.engGameIdSetting.duplicateCheck"
                                        )
                                    }}</q-btn
                                >
                                <span class="text-body2 text-primary" v-else>{{
                                    $t("addGame.engGameIdSetting.completeBtn")
                                }}</span>
                            </template>
                        </q-input>
                        <div class="hintText">
                            {{ $t("addGame.engGameIdSetting.rules") }}
                        </div>
                    </div>
                </q-slide-transition>
            </content-box-block>
        </content-box>
        <div class="btn-container">
            <button :loading="waitSave" class="button">임시저장</button>
            <button
                :loading="waitSave"
                color="primary"
                class="button secondary q-ml-md"
                @click="save()"
            >
                다음
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
import ContentBoxBlockImageUploaderGIF from "@/components/layout/contentBoxBlockImageUploaderGIF.vue";
import ContentBoxBlockImageUploader from "@/components/layout/contentBoxBlockImageUploader.vue";
import ContentBoxLine from "@/components/layout/contentBoxLine.vue";
import ContentBox from "@/components/layout/contentBox.vue";
import { verifySelectHashtags } from "@/scripts/verifySelectHashtags";
import { randomString } from "@/common/util";
import { Notify } from "quasar";
import { event } from "vue-gtag";
// import { useQuasar } from "quasar";
@Component({
    components: {
        ContentBoxBlockImageUploaderGIF,
        ContentBox,
        ContentBoxLine,
        ContentBoxBlockImageUploader,
        ContentBoxBlock,
    },
})
export default class addGameInfo extends Vue {
    private title: string = "";
    private titleError: string = "";
    private description: string = "";
    private descError: string = "";
    private hashtags: string = "";

    private thumbFile: File = null;
    private thumbnailErr: boolean = false;
    private thumbFile2: File = null;

    private autoGamePath: boolean = true;
    private gamePath: string = "";
    private confirmedGamePath: boolean = false;
    private gamePathError: string = "";
    private waitGamePath: boolean = false;
    private hashtagsError: string = "";

    private hashtagsArr: string[] = [];
    private inputValue: string = "";
    private isShowTag: boolean = false;
    private star: string = "";

    private waitSave: boolean = false;

    private isClickedSave: boolean = false;

    beforeRouteLeave(to, from, next) {
        //todo: 브라우저에 잠깐 저장했다가 돌아가면 바로 보여주기
        if(to.name === 'AddGameFile'){

        }
        // console.log(to.name)
        if (this.isClickedSave) {
            next();
        } else if (
            this.title.length > 0 ||
            this.description.length > 0 ||
            this.gamePath.length > 0 ||
            this.hashtagsArr.length > 0 ||
            this.thumbFile ||
            this.thumbFile2
        ) {
            this.$q
                .dialog({
                    class: "modal-dialog",
                    message:
                        "<div class='text-center'>지금까지 작성한 내용이 사라집니다. <br>정말 나가시겠습니까 </div>",
                    ok: {
                        push: true,
                        label: "네",
                    },
                    cancel: {
                        push: true,
                        color: "negative",
                        label: "아니요",
                    },
                    html: true,
                    persistent: true,
                })
                .onOk(() => {
                    next();
                })
                .onCancel(() => {});
        } else {
            next();
            console.log("다 비어있음");
        }
    }
    mounted() {
          console.log(this.$route)
        this.$store.commit("sendGameInfoDone", false);
        // window.addEventListener("keydown", this.handleRefresh);
        // window.addEventListener("click", this.handleRefresh);
        window.onbeforeunload = function() {
        return "Dude, are you sure you want to refresh? Think of the kittens!";
}
    }
    // destroyed() {
        
    //     window.removeEventListener("keydown", this.handleRefresh);
    // }
    // handleRefresh(e) {
    //     console.log(e)
    //     if (e.code === "F5") {
    //         e.preventDefault();

    //         this.$q
    //             .dialog({
    //                 class: "modal-dialog",
    //                 message:
    //                     "<div class='text-center'>지금까지 작성한 내용이 사라집니다. <br>정말 새로고침하시겠습니까?</div>",
    //                 ok: {
    //                     push: true,
    //                     label: "네",
    //                 },
    //                 cancel: {
    //                     push: true,
    //                     color: "negative",
    //                     label: "아니요",
    //                 },
    //                 html: true,
    //                 persistent: true,
    //             })
    //             .onOk(() => {
    //               location.reload();
    //             })
    //             .onCancel(() => {
    //                 e.preventDefault();
    //             });
    //     }
    // }

    private onChangeHashtags() {
        if (this.hashtags === "") {
            this.hashtagsError = "";
        } else {
            this.hashtagsError = verifySelectHashtags(this.hashtags);
        }
    }

    async checkGamePath() {
        this.waitGamePath = true;
        const result = await this.$http.confirmGamePath(this.gamePath);
        if (result && result.success) {
            this.confirmedGamePath = true;
            this.gamePathError = "";
        } else {
            this.gamePathError = this.$t("addGame.error.usedId").toString();
        }
        this.waitGamePath = false;
    }
    @Watch("description")
    watchDesc() {
        if (this.description.length > 0) {
            this.descError = "";
        }
    }

    createValue(val, done) {
        this.isShowTag = false;

        if (this.hashtagsArr.length <= 20) {
            if (val === "") {
                this.hashtagsError = "";
            } else {
                this.hashtagsError = verifySelectHashtags(val.trim());
            }
            if (this.hashtagsError === "") {
                if (done) {
                    done(val.trim());
                }
            }
        } else {
            this.hashtagsError = this.$t(
                "addGame.error.tooManyInputs"
            ).toString();
        }
    }

    createTagChip(val) {
        this.isShowTag = true;
        this.inputValue = val;
    }

    async save() {
        this.isClickedSave = true;
        if (this.waitSave) {
            return;
        }

        this.waitSave = true;

        let isError = false;

        if (!this.title) {
            this.titleError = this.$t("addGame.error.blankTitle").toString();
            isError = true;
        }
        if (!this.description) {
            this.descError = this.$t(
                "addGame.error.blankDescription"
            ).toString();
            isError = true;
        }
        if (this.hashtagsArr.length === 0) {
            this.hashtagsError = this.$t(
                "addGame.error.blankHashtag"
            ).toString();
            isError = true;
        }
        if (!this.thumbFile) {
            this.thumbnailErr = true;
            isError = true;
        }
        if (this.hashtagsError) {
            isError = true;
        }

        if (!this.confirmedGamePath) {
            if (!this.autoGamePath) {
                this.gamePathError = this.$t(
                    "addGame.error.doubleCheckEngId"
                ).toString();
                isError = true;
            } else {
                let count = 0;
                while (!this.confirmedGamePath && count < 10) {
                    count++;
                    this.gamePath = randomString(11);
                    const result = await this.$http.confirmGamePath(
                        this.gamePath
                    );
                    if (result && result.success) {
                        this.confirmedGamePath = true;
                    }
                }

                if (!this.confirmedGamePath) {
                    Notify.create({
                        message: this.$t("commonError").toString(),
                        position: "top",
                        color: "negative",
                        timeout: 2000,
                    });
                    this.waitSave = false;
                    return;
                }
            }
        }
        if (isError) {
            this.waitSave = false;
            return;
        }

        // this.$store.commit("ajaxBar", true);
        // this.$q.loading.show({
        //     message: this.$t("waiting").toString(),
        // });
        console.log({
            name: this.title,
            description: this.description,
            pathname: this.gamePath,
            project_picture: this.thumbFile,
            project_picture2: this.thumbFile2,
            hashtags: this.hashtagsArr.toString(),
        });
        this.$store.commit("sendGameInfoDone", true);

        this.$router.push("/addGameFile");
    }
}
</script>

<style scoped lang="scss">
.btn-container {
    display: flex;
    justify-content: flex-end;

    .button {
        width: 15% !important;
    }
}

.thumbnailErr.off {
    display: none;
}
.thumbnailErr {
    color: #c10015;
    font-size: 12px;
    margin-top: 2px;
}

.q-chip {
    background-color: rgb(244, 186, 47);
    border-radius: 5px;
    color: black;
    padding: 15px;
}
.dialog {
    background-color: #c10015 !important;
    .q-card {
    }
}
</style>
