<script setup lang="ts">
import { inject, toRefs, ref } from "vue";
import { DataStructure } from "@/type";

const datafromParent = inject<DataStructure>("data");
const { className, disabled, error, style, change } = toRefs(
  datafromParent?.option
);

const slider = ref("slider");

if (
  !datafromParent ||
  !datafromParent.value ||
  datafromParent.value.length < 2
) {
  throw new Error("toggle must be array[size 2]");
}

const isActive = ref(datafromParent?.value[1].selected);
const idx = datafromParent?.value.findIndex((arg: any) => arg.selected);
if (idx === 1) slider.value = "slider right";

const changeStatus = () => {
  if (disabled?.value === true) return; //전체 disable
  if (isActive.value) {
    if (slider.value === "slider right") {
      slider.value = "slider left";
      isActive.value = false;
    }
  } else {
    slider.value = "slider right";
    isActive.value = true;
  }
  datafromParent.value.map((_dt: any, index: number) => {
    _dt.selected = isActive.value === true ? index === 1 : index === 0;
    return _dt;
  });
  if (change?.value) change?.value(null, datafromParent.value, datafromParent);
};
</script>

<template>
  <ClientOnly>
    <div class="slider-main-area">
      <div v-if="datafromParent?.value[0].label">
        {{ datafromParent?.value[0].label }}
      </div>

      <div
        :class="{
          'slider-container': true,
          [className]: className,
          disabled: disabled,
          error: error,
          'is-active': isActive,
        }"
        :disabled="disabled"
        :style="style"
        :tabindex="datafromParent?.tabindex"
      >
        <div :class="slider" @click="changeStatus()"></div>
      </div>
      <div v-if="datafromParent?.value[1].label">
        {{ datafromParent?.value[1].label }}
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.slider-main-area {
  display: flex;
  gap: 6px;
  align-items: center;
  .slider-container {
    width: 40px;
    height: 22px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 100px;
    background: var(--Primary-50, #e6f2ff);
    .slider {
      position: absolute;
      transition-property: all;
      left: 10%;
      background: white;
      color: white;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
    .slider.right {
      animation: left-to-right 0.35s ease-in-out forwards;
    }
    .slider.left {
      animation: right-to-left 0.35s ease-in-out forwards;
    }
    @keyframes right-to-left {
      0% {
        left: 50%;
      }
      100% {
        left: 10%;
      }
    }
    @keyframes left-to-right {
      0% {
        left: 10%;
      }

      100% {
        left: 50%;
      }
    }
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .is-active {
    background: var(--Primary-500, #0080ff);
  }
}
</style>
