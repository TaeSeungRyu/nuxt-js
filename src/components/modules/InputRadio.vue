<script setup lang="ts">
import { inject, reactive } from "vue";
import { DataStructure } from "@/type";
import {
  radioActive,
  radioDefault,
  radioDisabled,
  radioActiveDisabled,
} from "@/assets/svg/radio";

const datafromParent = inject<DataStructure>("data");
const inputList = reactive(datafromParent?.value);

const setRadioStatus = (item: any, index: number) => {
  inputList.forEach((element: any, _index: number) => {
    if (index !== _index) {
      element.selected = false;
    }
  });
  if (!item.selected) {
    item.selected = !item.selected;
    inputList[index].selected = item.selected;
  }
  if (datafromParent?.option?.change !== undefined) {
    datafromParent?.option?.change(item, inputList, datafromParent);
  }
};
</script>
<template>
  <div
    :class="{
      'radio-box-area': true,
      'add-gap': inputList?.length > 1,
      'single-check': inputList?.length == 1,
    }"
    :style="datafromParent?.option?.containerStyle"
  >
    <div
      :class="{ 'radio-box-item': true }"
      v-for="(item, index) in inputList"
      @click="setRadioStatus(item, index)"
    >
      <div
        v-if="!datafromParent?.option?.disabled"
        class="radio-box-can-active-item"
      >
        <radioActive v-if="item.selected"></radioActive>
        <radioDefault v-else></radioDefault>
      </div>
      <radioActiveDisabled
        v-else-if="datafromParent?.option?.disabled && item.selected"
      ></radioActiveDisabled>
      <radioDisabled v-else></radioDisabled>
      <div
        v-if="item?.label"
        :class="{
          'radio-box-label': true,
          'small-type': datafromParent?.option?.smallType,
        }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.radio-box-area {
  display: flex;
  .radio-box-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    .radio-box-label {
      margin-left: 0.313rem;
      height: 1.5rem;
      font-size: 0.875rem;
      user-select: none;
    }
  }
}
.add-gap {
  gap: 0.625rem;
}
.small-type {
  font-size: 0.75rem !important;
  height: 1.25rem !important;
}
.single-check {
  align-items: center;
  justify-content: center;
}
</style>
