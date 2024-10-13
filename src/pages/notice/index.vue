<script setup>
const router = useRouter();

definePageMeta({
  layout: false,
  middleware: ["auth"],
});
const movePage = () => {
  router.push("/signin");
};
</script>
<template>
  <div>notice index</div>
  <div>레이아웃 안쓰도록 해봄</div>
  <button @click="movePage">z222221111zzzz</button>
</template>
