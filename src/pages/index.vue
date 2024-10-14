<script setup>
import { useSearchStore } from "~/stores/test";
const { clear } = useUserSession();

const stateTest = useSearchStore();

//const { signIn, signOut } = useAuth();

onMounted(() => {
  console.log("onMounted");
  clear();

  //stateTest.setStatus("test", "a", "b");
});
const router = useRouter();
const movePage = () => {
  router.push("/signin");
};
</script>
<template>
  index

  <button @click="movePage">get get get</button>
</template>
