<script setup lang="ts">
import { useSearchStore } from "~/stores/test";

const stateTest = useSearchStore();

setTimeout(() => {
  console.log("head : ", stateTest.list);
}, 1000);
</script>
<template>
  <div>head layout</div>
  <slot></slot>
</template>
