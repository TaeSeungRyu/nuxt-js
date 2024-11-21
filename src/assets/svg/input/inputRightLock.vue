<script setup lang="ts">
import { ref, watchEffect } from "vue";
const { stroke } = defineProps(["stroke"]);
let color = ref("#A2A7E8");
if (stroke) {
  color.value = stroke;
}
watchEffect(() => {
  color.value = stroke;
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
      d="M10.0003 4.16675C4.6973 4.16675 1.66699 10.0001 1.66699 10.0001C1.66699 10.0001 4.6973 15.8334 10.0003 15.8334C15.3034 15.8334 18.3337 10.0001 18.3337 10.0001C18.3337 10.0001 15.3034 4.16675 10.0003 4.16675Z"
      :stroke="color"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.0003 12.5001C11.381 12.5001 12.5003 11.3808 12.5003 10.0001C12.5003 8.61937 11.381 7.50008 10.0003 7.50008C8.61961 7.50008 7.50033 8.61937 7.50033 10.0001C7.50033 11.3808 8.61961 12.5001 10.0003 12.5001Z"
      :stroke="color"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<style lang="scss" scoped></style>
