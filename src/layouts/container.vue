<script setup lang="ts">
import { LEFT_MENU_WIDTH, HEADER_HEIGHT } from "~/constants";

const slotItemsWidth = `calc(100% - ${LEFT_MENU_WIDTH}px)`;
const mainContentsHeight = `calc(100% - ${HEADER_HEIGHT}px)`;
const mainContents: any = ref(null);
const provideHeight = ref(mainContentsHeight);

onMounted(() => {
  if (mainContents.value) {
    provideHeight.value = `${mainContents?.value.clientHeight}px`;
  }
  window.addEventListener("resize", () => {
    if (mainContents.value) {
      mainContents.value.style.height = mainContentsHeight;
      provideHeight.value = `${mainContents?.value.clientHeight}px`;
    }
  });
});
provide("provideHeight", provideHeight);
</script>
<template>
  <div class="main-body">
    <NuxtLayout :name="'head'"></NuxtLayout>
    <div class="main-contents" ref="mainContents">
      <NuxtLayout :name="'left'"></NuxtLayout>
      <div class="slot-items">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-body {
  width: inherit;
  height: inherit;
  .main-contents {
    display: flex;
    width: inherit;
    height: v-bind(provideHeight);
    width: 100%;
    overflow-y: auto;
    .slot-items {
      width: v-bind(slotItemsWidth);
      height: v-bind(provideHeight);
      overflow-y: auto;
    }
  }
}
</style>
