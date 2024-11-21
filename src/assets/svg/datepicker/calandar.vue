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
    <path
      d="M16.6663 9.16667H3.33301M16.6663 9.16667V15.8333C16.6663 16.7538 15.9201 17.5 14.9997 17.5H4.99967C4.0792 17.5 3.33301 16.7538 3.33301 15.8333V5.83333C3.33301 4.91286 4.0792 4.16667 4.99967 4.16667H14.9997C15.9201 4.16667 16.6663 4.91286 16.6663 5.83333V9.16667ZM12.4997 2.5V5.83333M7.49967 2.5V5.83333"
      :stroke="stroke"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
