<script setup lang="ts">
import { signinLogo } from "~/assets/svg";
import { useSearchStore } from "~/stores/test";
const stateTest = useSearchStore();
</script>
<template>
  <div class="header">
    <signinLogo style="scale: 0.83"></signinLogo>
  </div>
  <slot></slot>
</template>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid var(--Neutral-200, #eaeaea);
  background: var(--Background-White, #fff);
  padding: 16px 24px;
}
</style>
