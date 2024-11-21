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
      d="M16.667 12.3612C17.7571 11.1098 18.3337 10 18.3337 10C18.3337 10 15.3034 4.16667 10.0003 4.16667C9.71597 4.16667 9.43816 4.18344 9.16699 4.21518C8.88181 4.24857 8.60399 4.29852 8.33366 4.36293M10.0003 7.5C10.2925 7.5 10.573 7.55013 10.8337 7.64225C11.544 7.89333 12.107 8.45632 12.3581 9.16667C12.4502 9.42732 12.5003 9.7078 12.5003 10M2.50033 2.5L17.5003 17.5M10.0003 12.5C9.70812 12.5 9.42764 12.4499 9.16699 12.3577C8.45664 12.1067 7.89365 11.5437 7.64258 10.8333C7.59521 10.6993 7.55894 10.5601 7.53489 10.4167M3.45617 7.5C3.1993 7.78709 2.96894 8.06868 2.76586 8.33333C2.04438 9.27353 1.66699 10 1.66699 10C1.66699 10 4.6973 15.8333 10.0003 15.8333C10.2847 15.8333 10.5625 15.8166 10.8337 15.7848"
      :stroke="color"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<style lang="scss" scoped></style>
