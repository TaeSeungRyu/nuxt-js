<script setup lang="ts">
import { inject, reactive, ref, watchEffect } from "vue";
import { DataStructure } from "@/type";
import {
  checkboxActive,
  checkboxDefault,
  checkboxDisabled,
  checkboxActiveDisabled,
} from "@/assets/svg/check/";

const datafromParent = inject<DataStructure>("data");
const inputList = reactive(datafromParent?.value);

const setCheckBoxStatus = (item: any, index: number) => {
  item.checked = !item.checked;
  inputList[index].checked = item.checked;
  if (datafromParent?.option?.change !== undefined) {
    datafromParent?.option?.change(item, inputList, datafromParent);
  }
};
</script>
<template>
  <ClientOnly>
    <div
      :class="{
        'check-box-area': true,
        'add-gap': inputList?.length > 1,
        'single-check': inputList?.length == 1,
      }"
      :style="datafromParent?.option?.containerStyle"
    >
      <div
        :class="{ 'check-box-item': true }"
        v-for="(item, index) in inputList"
        @click="setCheckBoxStatus(item, index)"
      >
        <div
          v-if="!datafromParent?.option?.disabled"
          class="check-box-can-active-item"
        >
          <checkboxActive v-if="item.checked"></checkboxActive>
          <checkboxDefault v-else></checkboxDefault>
        </div>
        <checkboxActiveDisabled
          v-else-if="datafromParent?.option?.disabled && item.checked"
        ></checkboxActiveDisabled>
        <checkboxDisabled v-else></checkboxDisabled>
        <div
          v-if="item?.label"
          :class="{
            'check-box-label': true,
            'small-type': datafromParent?.option?.smallType,
          }"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.check-box-area {
  display: flex;
  .check-box-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    .check-box-label {
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
