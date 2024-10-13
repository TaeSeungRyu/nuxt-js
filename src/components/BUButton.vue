<script setup lang="ts">
const prints = async () => {
  const a = await setTimeout(async () => {
    console.log("async");
    return;
  }, 3000);
  console.log(1234);
};
</script>
<template>
  <div @click="prints">12345</div>
</template>
