<template>
  <q-page >
    <div class="text-center q-my-lg">
      <span class="zempie-logo">ZEMPLATE</span>
    </div>
    <div class="text-center">개발을 모르는 사람도 쉽게 개발해보세요</div>
    <div class="game-selection row flex-center flex text-center">
      <q-card class="my-card col-3 q-mr-lg">
        <q-card-section >
        <div class="shooting"></div>
        </q-card-section >
        <q-separator />
        <q-card-section class="zemplate-desc">
          <div class="text-h6 q-mb-md">슈팅게임</div>
          <div>
            적의 공격을 피하며 무기를 쏘는 게임입니다.
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card col-3 q-mr-lg ">
        <q-card-section >
        <div class="shooting"></div>
        </q-card-section >
        <q-separator />
        <q-card-section class="zemplate-desc">
          <div class="text-h6 q-mb-md">플랫포머</div>
          <div>
            점프 앤 런!<br />
            발판이 등장하는 게임입니다.
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card col-3">
        <q-card-section class="dimmed">
          <div class="dimmed-above"> COMING<br> SOON!</div>
        <div class="shooting"></div>
        </q-card-section>
<q-separator />
        <q-card-section class="zemplate-desc">
          <div class="text-h6 q-mb-md">???</div>
          <div>다음 장르는 무엇일까요?</div>
        </q-card-section>
      </q-card>
    </div>
    
  </q-page>
</template>


<script  lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
export default class CreateGame extends Vue {
};
</script>
<style scoped>
.zempie-logo {
  border: 1px solid;
  border-radius: 20px;
  padding: 10px 40px 10px 40px;
}
.shooting {
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
}
.my-card{
  background-color: rgb(126, 126, 126);
}
.game-selection{
  display: flex;
    align-items: center;
    height: 500px;
}
.dimmed-above{
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
    justify-content: center
}
</style>