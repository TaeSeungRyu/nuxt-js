<script setup lang="ts">
import { DataStructure, TYPE } from "~/type";

const name = new DataStructure({
  value: ref(""),
  type: TYPE.TEXT,
  require: true,
  option: reactive({
    skip: false,
    disabled: false,
    error: false,
    success: false,
    placeholder: "이름을 입력해주세요.",
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

const emailAddress = new DataStructure({
  value: ref(""),
  type: TYPE.TEXT,
  require: true,
  option: reactive({
    skip: false,
    disabled: false,
    error: false,
    success: false,
    placeholder: "이메일을 입력해주세요.",
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
  return isEmpty(name.value.value) || isEmpty(emailAddress.value.value);
});
</script>
<template>
  <div class="h-full">
    <NuxtLayout :name="'account'">
      <div class="find-id-title">아이디 찾기</div>
      <div class="inform-item">
        <div class="inform-item-name">이름</div>
        <ComponentBuilder :data="name" />
      </div>
      <div class="inform-item">
        <div class="inform-item-name">이메일 주소</div>
        <ComponentBuilder :data="emailAddress" />
      </div>
      <div class="inform-item">
        <button
          type="button"
          class="btn btn-primary w-full text-[14px] h-[48px]"
          :disabled="isDisabled"
        >
          아이디 찾기
        </button>
      </div>
    </NuxtLayout>
  </div>
</template>
<style lang="scss" scoped>
.find-id-title {
  color: var(--Neutral-800, #3d3d3d);
  font-size: 20px;
  font-weight: 500;
}
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
