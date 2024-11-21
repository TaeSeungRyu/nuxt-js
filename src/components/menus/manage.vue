<script setup lang="ts">
import { watchEffect, ref } from "vue";

const { stroke } = defineProps(["stroke"]);
const color = ref("#666666");
if (stroke) {
  color.value = stroke;
}
watchEffect(() => {
  if (stroke) {
    color.value = stroke;
  } else {
    color.value = "#666666";
  }
});
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M17.5003 15V5H6.66699L1.66699 10L6.66699 15H17.5003Z"
      :stroke="stroke"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.0003 10C10.0003 10.9205 9.25413 11.6667 8.33366 11.6667C7.41318 11.6667 6.66699 10.9205 6.66699 10C6.66699 9.07953 7.41318 8.33333 8.33366 8.33333C9.25413 8.33333 10.0003 9.07953 10.0003 10Z"
      :stroke="stroke"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
