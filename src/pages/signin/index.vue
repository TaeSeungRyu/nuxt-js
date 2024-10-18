<script setup lang="ts">
import { useSearchStore } from "~/stores/test";
import { useQuery, useQueryClient, useMutation } from "@tanstack/vue-query";
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
</script>
<template>
  <div style="padding: 1rem">
    queryKeyTargetData : {{ display }} || {{ queryKeyTargetData }}
  </div>
  <img src="~/assets/image.png" />
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

  <button @click="gggggg">get get get</button>
</template>

<!-- <script setup lang="ts">
import { ref } from "vue";
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/vue-query";
const queryClient = useQueryClient();

// 페이지를 기반으로 데이터를 가져오는 함수입니다.
const fetcher = (page: any) =>
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page.value}&_limit=10`
  ).then((response) => response.json());

// 현재 페이지를 나타내는 ref입니다.
const page = ref(1);

// useQuery 훅을 사용하여 쿼리를 설정합니다.
const {
  isPending,
  isError,
  data: resultList,
  error,
  isFetching,
  isPlaceholderData,
} = useQuery({
  // 쿼리 키는 'projects'와 현재 페이지를 포함합니다.
  queryKey: ["aaaa", page],
  // 데이터를 가져오는 함수를 설정합니다.
  queryFn: () => fetcher(page),
  // placeholderData 옵션을 사용하여 이전 데이터를 유지합니다.
  placeholderData: keepPreviousData,
  /*
      또는 아래와 같이 선언
      placeholderData: (previousData, previousQuery) => previousData
    */
});

function ttttt(key: string) {
  const {
    isPending,
    isError,
    data: resultList,
    error,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: [key, page],
    queryFn: () => fetcher(page),
    placeholderData: keepPreviousData,
  });
}

onMounted(() => {
  let key = "2024-10-08";
  ttttt("2024-10-08");
  ttttt("2024-10-07");
  ttttt("2024-10-08");
});

// 이전 페이지로 이동하는 함수입니다.
const prevPage = () => {
  page.value = Math.max(page.value - 1, 1);
};

// 다음 페이지로 이동하는 함수입니다.
const nextPage = () => {
  // isPlaceholderData가 false인 경우에만 페이지를 증가시킵니다.
  if (!isPlaceholderData.value) {
    page.value = page.value + 1;
  }
};

//utils
const result = formatNumber([1, 2, 3]); // 1,000
console.log("result : ", result);

const config = useRuntimeConfig();

console.log("env test : ", config.public?.NUXT_PORT);
</script>
<template>
  <div>현재 페이지와 placeholderData를 표시합니다.</div>
  <h1>Posts</h1>
  <div>configure test : {{ config.public?.NUXT_PORT }}</div>
  <p>Current Page: {{ page }} | Previous data: {{ isPlaceholderData }}</p>
  <div>이전 페이지로 이동하는 버튼입니다.</div>
  <button @click="prevPage">Prev Page</button>
  <div>다음 페이지로 이동하는 버튼입니다.</div>
  <button @click="nextPage">Next Page</button>
  <div>데이터를 로드하는 동안에는 로딩 메시지를 표시합니다.</div>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="isError">
    An error has occurred: {{ error }}
    <div>에러가 발생한 경우 에러 메시지를 표시합니다.</div>
  </div>
  <div v-else-if="resultList">
    <div>데이터가 있을 경우 데이터를 렌더링합니다.</div>
    <ul>
      <li v-for="item in resultList" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template> -->
