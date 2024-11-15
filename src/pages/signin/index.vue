<script setup lang="ts">
import { useSearchStore } from "~/stores/test";
import { useQuery, useQueryClient, useMutation } from "@tanstack/vue-query";
import { DataStructure, TYPE } from "~/type";
import ComponentBuilder from "~/components/ComponentBuilder.vue";
const queryClient = useQueryClient();

const router = useRouter();

const head = ref("head");
const dttt = reactive({
  a: 1,
  b: 2,
});
provide("_data", dttt);

const stateTest = useSearchStore();
//console.log("state :::: ", stateTest.list);

// const testProxy = async () => {
//   mutate({ username: "fi000001", password: "admin1234!" });
// };
const movePage = () => {
  router.push("/notice");
};

const queryKeyTargetData = ref("todos");
const enabled = ref(false);
const { data: dt, error } = useQuery({
  queryKey: ["tttttttttt", "queryKeyTargetData"],
  queryFn: async () => {
    return await useCustomFetch("/serverApi/provider").then((res) => {
      console.log(res.data);
      return res.data;
    });
  },
  refetchOnWindowFocus: false,
  staleTime: 5000,
  enabled: enabled,
});
// const { mutate, isLoading, isError, data } = useMutation({
//   mutationFn: loginAction,
//   onMutate: (variables) => {},
//   onSuccess: (data) => {
//     queryClient.setQueryData(
//       ["tttttttttt", queryKeyTargetData],
//       `${Math.random()}`
//     );
//     // console.log(
//     //   "onSuccess",
//     //   queryClient.getQueryData(["tttttttttt", queryKeyTargetData])
//     // );
//   },
//   onError: (error, variables, context) => {
//     console.log("onError", error, variables, context);
//   },
// });

const testLocal = async () => {
  enabled.value = true;
  //console.log("testLocal", enabled.value, dt);
};

const display = computed(() => {
  //console.log("onSuccess", queryClient.getQueryData(["tttttttttt"]));
  return queryClient.getQueryData(["tttttttttt", queryKeyTargetData]);
});

//nuxt-auth
//definePageMeta({ auth: false });
const config = useRuntimeConfig();
const authBaseUrl = config.public.authBaseUrl;

const testSignin = async () => {
  const result = await useCustomFetch("/api/login", {
    method: "post",
    body: JSON.stringify({
      username: "fefea",
      password: "aaad!",
    }),
  });
  console.log("result : ", result);
  // if (result.status === 200) {
  //   router.push("/notice");
  // }
};

const ssssss = () => {
  useCustomFetch("/serverApi/cookie", { method: "post" });
};

const gggggg = () => {
  useCustomFetch("/serverApi/cookie", { method: "get" });
};
const testProxy = async () => {
  const result = await useCustomFetch("/serverApi/provider");
  console.log("result : ", result);
};

const testObject = new DataStructure({
  value: ref("1a"),
  type: TYPE.TEXT,
  require: true,
  option: reactive({
    skip: false,
    disabled: false,
    error: false,
    smallType: true,
    success: false,
    placeholder: "",
    hideRight: !true,
    style: { width: "100%", height: "2.25rem", padding: "0rem 0.5rem" },
    change(event: any, data: any, that: any) {
      //console.log("change", event, data, that);
      console.log("change");
    },
  }),
});

setTimeout(() => {
  testObject.value.value = "asdfasdf";
  console.log("settimeout");
}, 2000);
</script>
<template>
  <div>
    <div>value : {{ testObject.value }}</div>
    <ComponentBuilder :data="testObject" />
  </div>
  <div style="padding: 1rem">
    queryKeyTargetData : {{ display }} || {{ queryKeyTargetData }}
  </div>
  <img src="~/assets/img/image.png" />
  <NuxtLayout :name="'head'">
    <div>slot header~</div>
  </NuxtLayout>

  <button
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    @click="testSignin"
  >
    nuxt-auth 사인인
  </button>
  <button @click="testProxy">로그인 후 헤더 인터셉팅</button>
  <button @click="testLocal">test local</button>
  <button @click="movePage">페이지이동</button>

  <button @click="ssssss">set set set</button>

  <button class="test-btn" @click="gggggg">test-btnget get get</button>
  <div>1</div>
  <div>1</div>
  <div
    class="bg-clip-content p-6 bg-violet-600 border-4 border-violet-300 border-dashed"
  ></div>
  <div>1</div>
  <div
    class="bg-clip-padding p-6 bg-violet-600 border-4 border-violet-300 border-dashed"
  ></div>
  <div>1</div>
  <div
    class="bg-clip-border p-6 bg-violet-600 border-4 border-violet-300 border-dashed"
  ></div>
  <div class="text-5xl font-extrabold ...">
    <span
      class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
    >
      Hello world
    </span>
  </div>
</template>
<style scoped></style>
