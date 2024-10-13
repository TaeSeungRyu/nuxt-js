<script setup lang="ts">
useHead({
  title: "넉스트싫어요",
  meta: [{ name: "description", content: "My amazing site." }],
  bodyAttrs: {
    class: "test",
  },
  script: [{ innerHTML: "console.log('Hello world')" }],
});
</script>
<template>
  <div>
    <div>12</div>
    <BUButton />
  </div>
</template>
