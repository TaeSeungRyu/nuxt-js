<script setup lang="ts">
import { useRouter } from "vue-router"; // useRouter import 추가

const router = useRouter(); // router 객체 선언
const { clear } = useUserSession();

onMounted(() => {
  clear();
  router.push("/signin");
});
</script>
<template></template>
