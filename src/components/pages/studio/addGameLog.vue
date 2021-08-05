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
                    v-on:@url="
                        (url) => {
                            thumbFileUrl = url;
                        }
                    "
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
                    v-on:@url="
                        (url) => {
                            thumbFile2Url = url;
                        }
                    "
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
import store from "@/store/index";
import { urltoFile } from "@/scripts/util";
import { resetLocalStorage } from "@/scripts/form";
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
export default class addGameLog extends Vue {
    private title: string = "" || localStorage.getItem("gameTitle");
    private titleError: string = "";
    private description: string = "" || localStorage.getItem("description");
    private descError: string = "";
    private hashtags: string = "";

    private thumbFile: File = null;
    private thumbFileUrl: string = "";
    private thumbnailErr: boolean = false;
    private thumbFile2: File = null;
    private thumbFile2Url: string = "";

    private autoGamePath: boolean = true;
    private gamePath: string = "" || localStorage.getItem("gamePath");
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

    beforeRouteEnter(to, undefined, next) {
        console.log(store);
        if (!store.getters.gameStage) {
            next("/selectStage");
        } else {
            next();
        }
    }

    beforeRouteLeave(to, from, next) {
        if (to.name == "AddGameFile") {
            let hashtag = JSON.stringify(this.hashtagsArr)
                .substring(1, JSON.stringify(this.hashtagsArr).length - 1)
                .replaceAll('"', "");

            // 브라우저 저장
            if (this.title) {
                localStorage.setItem("gameTitle", this.title);
            }
            if (this.description) {
                localStorage.setItem("description", this.description);
            }
            if (!this.autoGamePath) {
                localStorage.setItem("gamePath", this.gamePath);
            }
            if (this.hashtagsArr) {
                localStorage.setItem("hashtagsArr", hashtag);
            }
            if (this.thumbFileUrl) {
                localStorage.setItem("thumbFileUrl", this.thumbFileUrl);
                localStorage.setItem("thumbFileName", this.thumbFile.name);
                localStorage.setItem("thumbFileType", this.thumbFile.type);
            }
            if (this.thumbFile2Url) {
                localStorage.setItem("thumbFile2Url", this.thumbFile2Url);
                localStorage.setItem("thumbFile2Name", this.thumbFile2.name);
                localStorage.setItem("thumbFile2Type", this.thumbFile2.type);
            }
        } else {
            resetLocalStorage();
        }
        next();
    }
    // resetLocalStorage() {
    //     localStorage.removeItem("gameTitle");
    //     localStorage.removeItem("description");
    //     localStorage.removeItem("gamePath");
    //     localStorage.removeItem("hashtagsArr");
    //     localStorage.removeItem("thumbFileUrl");
    //     localStorage.removeItem("thumbFileName");
    //     localStorage.removeItem("thumbFileType");
    //     localStorage.removeItem("thumbFile2Url");
    //     localStorage.removeItem("thumbFile2Name");
    //     localStorage.removeItem("thumbFile2Type");
    // }
    mounted() {
        this.$store.commit("sendGameInfoDone", false);

        if (localStorage.getItem("hashtagsArr")) {
            this.hashtagsArr = localStorage.getItem("hashtagsArr").split(",");
        }
        if (localStorage.getItem("gamePath")) {
            this.autoGamePath =
                localStorage.getItem("gamePath").length > 0 ? false : true;
        }

        urltoFile(
            localStorage.getItem("thumbFileUrl"),
            localStorage.getItem("thumbFileName"),
            localStorage.getItem("thumbFileType")
        ).then((file) => {
            this.thumbFile = file;
            console.log(file);
        });

        urltoFile(
            localStorage.getItem("thumbFile2Url"),
            localStorage.getItem("thumbFile2Name"),
            localStorage.getItem("thumbFile2Type")
        ).then((file) => {
            this.thumbFile2 = file;
        });
        //새로고침
        window.onbeforeunload = () => {
            console.log("this.title", this.title);
            if (
                this.title.length > 0 ||
                this.description.length > 0 ||
                this.gamePath.length > 0 ||
                this.hashtagsArr.length > 0 ||
                this.thumbFile ||
                this.thumbFile2
            ) {
                resetLocalStorage();
                return "지금까지 작성한 내용이 사라집니다. 정말 새로고침하시겠습니까?";
            }
        };
    }
    destroyed() {
        window.onbeforeunload = () => undefined;
    }

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
        const gameInfo = {
            name: this.title,
            description: this.description,
            pathname: this.gamePath,
            project_picture: this.thumbFile,
            project_picture2: this.thumbFile2,
            hashtags: this.hashtagsArr.toString(),
        };
        // this.$emit("gameInfo", gameInfo);
        this.$store.commit("gameInfoObj", gameInfo);

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
