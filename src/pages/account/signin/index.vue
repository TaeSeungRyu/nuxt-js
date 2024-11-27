<script setup lang="ts">
import { signinLogo } from "~/assets/svg";
import { DataStructure, TYPE } from "~/type";
const router = useRouter();
const username = new DataStructure({
  value: ref(""),
  type: TYPE.TEXT,
  require: true,
  option: reactive({
    skip: false,
    disabled: false,
    error: false,
    success: false,
    placeholder: "아이디를 입력해주세요.",
    hideRight: !true,
    // min: "1",
    // max: "10",
    style: { width: "100%", height: "48px" },
    change(event: any, data: any, that: any) {
      //console.log("change", event, data, that);
      //console.log("change");
    },
  }),
});

const password = new DataStructure({
  value: ref(""),
  type: TYPE.PASSWORD,
  require: true,
  option: reactive({
    skip: false,
    disabled: false,
    error: false,
    success: false,
    placeholder: "비밀번호를 입력해주세요.",
    hideRight: !true,
    // min: "1",
    // max: "10",
    style: { width: "100%", height: "48px" },
    change(event: any, data: any, that: any) {
      //console.log("change", event, data, that);
      //console.log("change");
    },
  }),
});

const isDisabled = computed(() => {
  return isEmpty(username.value.value) || isEmpty(password.value.value);
});

const movePage = (pageName: string) => {
  router.push(`/account/${pageName}`);
};
</script>
<template>
  <div class="h-full">
    <NuxtLayout :name="'account'">
      <signinLogo></signinLogo>
      <div class="inform-item">
        <div class="inform-item-name">아이디</div>
        <ComponentBuilder :data="username" />
      </div>
      <div class="inform-item">
        <div class="inform-item-name">비밀번호</div>
        <ComponentBuilder :data="password" />
      </div>
      <div class="inform-item">
        <button
          type="button"
          class="btn btn-primary w-full text-[14px] h-[48px]"
          :disabled="isDisabled"
        >
          로그인
        </button>
      </div>
      <div class="inform-item-last">
        <div class="cursor-pointer" @click="movePage('find-id')">
          아이디 찾기
        </div>
        <div class="w-[1px] h-[13px] bg-[#AAAAAA]"></div>
        <div class="cursor-pointer" @click="movePage('find-password')">
          비밀번호 찾기
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<style lang="scss" scoped>
.inform-item {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 4px;
  .inform-item-name {
    color: var(--Neutral-800, #3d3d3d);
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
  }
}
.inform-item-last {
  display: flex;
  @include contants.flex-middle;
  width: 100%;
  gap: 10px;
  color: var(--Neutral-600, #848484);
  font-size: 12px;
}
</style>
