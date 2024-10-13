<script setup>
import { useSearchStore } from "~/stores/test";

const stateTest = useSearchStore();

const { signIn, signOut } = useAuth();

onMounted(() => {
  console.log("onMounted");
  signOut({ redirect: false }).then((arg) => {
    console.log("signOut", arg);
  });
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
