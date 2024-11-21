<script setup lang="ts">
import { watchEffect, ref } from "vue";

const { stroke } = defineProps(["stroke"]);
const color = ref("#4D515B");
if (stroke) {
  color.value = stroke;
}
watchEffect(() => {
  if (stroke) {
    color.value = stroke;
  } else {
    color.value = "#D8DBE1";
  }
});
</script>
<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="19" height="19" rx="4.5" fill="white" />
    <rect x="0.5" y="0.5" width="19" height="19" rx="4.5" :stroke="stroke" />
    <path
      d="M12.25 4L6.25 10L12.25 16"
      stroke="#3D3D3D"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
