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
      d="M3.33301 8.33333L9.99968 2.5L16.6663 8.33333L16.6663 16.6667H12.4997V13.3333C12.4997 12.6703 12.2363 12.0344 11.7674 11.5656C11.2986 11.0967 10.6627 10.8333 9.99968 10.8333C9.33664 10.8333 8.70075 11.0967 8.23191 11.5656C7.76307 12.0344 7.49968 12.6703 7.49968 13.3333V16.6667H3.33301L3.33301 8.33333Z"
      :stroke="stroke"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
