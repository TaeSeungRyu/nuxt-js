<script setup lang="ts">
import { useSearchStore } from "~/stores/test";
const _data = inject("_data");
console.log(_data);

const stateTest = useSearchStore();

setTimeout(() => {
  console.log(stateTest.list);
}, 1000);
</script>
<template>
  <div>head layout</div>
  <slot></slot>
</template>
