<script setup lang="ts">
//import "~/assets/input.scss";
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
    success: false,
    placeholder: "",
    hideRight: !true,
    style: { width: "333px", height: "2.25rem" },
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

const testNumber = new DataStructure({
  value: ref("111"),
  type: TYPE.NUMBER,
  require: true,
  option: reactive({
    skip: false,
    disabled: false,
    error: false,
    success: false,
    placeholder: "",
    hideRight: !true,
    // min: "1",
    // max: "10",
    style: { width: "333px", height: "2.25rem" },
    change(event: any, data: any, that: any) {
      console.log("change", event, data, that);
      //console.log("change");
    },
  }),
});

setTimeout(() => {
  testNumber.option.max = "255555";
  console.log(
    "testNumber value  testNumber value  testNumber value : ",
    testNumber.value.value
  );
}, 6000);

import Chart from "chart.js/auto";

const idArray: any = [];
for (let i = 0; i < 10; i++) {
  idArray.push(`myChart${i}`);
}

const randomstringa = randomString(10);
onMounted(() => {
  setTimeout(() => {
    const ctx: any = document.getElementById(randomstringa);
    console.log("ctx", ctx);
    if (ctx != null) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, 550);
});

import ComponentDatePickerTypeProps from "@/components/ComponentDatePicker.vue";
import { ComponentAccess } from "~/components/ComponentAccess";
import { downArrow, upArrow } from "~/assets/svg";
const reportDate = reactive({
  current: "2024.11.19",
  trigger: randomString(0),
  disabled: null,
  style: { width: "347px", height: "34px" },
  inputStyle: { width: "347px", height: "34px" },
});

const checkbox = new DataStructure({
  value: reactive([
    { value: "ALL", checked: true, label: "전체" },
    { value: "aaa", checked: false, label: "1개선택" },
  ]),
  type: TYPE.CHECK,
  require: true,
  option: reactive({
    skip: false,
    disabled: false,
    error: false,
    success: false,
    containerStyle: {
      "margin-right": "10px",
    },
    change(event: any, data: any, that: any) {},
  }),
});

const radiobox = new DataStructure({
  value: reactive([
    { value: "ALL", selected: true, label: "전체" },
    { value: "aaa", selected: false, label: "1개선택" },
  ]),
  type: TYPE.RADIO,
  require: true,
  option: reactive({
    skip: false,
    disabled: false,
    error: false,
    success: false,
    containerStyle: {
      "margin-right": "10px",
    },
    change(event: any, data: any, that: any) {},
  }),
});

const selectbox = new DataStructure({
  value: reactive([
    { value: "ALL", selected: true, label: "전체" },
    { value: "aaa", selected: false, label: "1개선택" },
    { value: "aaag", selected: false, label: "2g개선택" },
    { value: "aaab", selected: false, label: "2d개선택" },
    // { value: "aaac", selected: false, label: "2e개선택" },
    // { value: "aaad", selected: false, label: "2f개선택" },
  ]),
  type: TYPE.SELECT,
  require: true,
  option: reactive({
    skip: false,
    disabled: false,
    error: false,
    success: false,
    containerStyle: {
      "margin-right": "10px",
      width: "160px",
    },
    change(event: any, data: any, that: any) {},
  }),
});

const toogle = new DataStructure({
  value: reactive([
    { value: "ALL", selected: true, label: "AA" },
    { value: "aaa", selected: false, label: "BB" },
  ]),
  type: TYPE.TOGGLE,
  require: true,
  option: reactive({
    skip: false,
    disabled: false,
    error: false,
    success: false,
    containerStyle: {
      "margin-right": "10px",
      width: "160px",
    },
    change(event: any, data: any, that: any) {},
  }),
});

//////메뉴 구조 잡기//////
type menuType = {
  id: number;
  name: string;
  url?: string;
  hideUrl?: Array<string>;
  icon: string;
  children?: Array<menuType>;
  auth?: Array<string>;
  role?: Array<string>;
  option?: {
    show: boolean;
  };
};

const menus: menuType[] = reactive([
  {
    id: 1,
    name: "메뉴1",
    url: "/",
    icon: TYPE.home,
    option: {
      show: true,
    },
  },
  {
    id: 1,
    name: "메뉴2",
    icon: TYPE.manage,
    option: {
      show: false,
    },
    children: [
      {
        id: 2,
        name: "메뉴2 - 1",
        url: "/manage/list",
        icon: "manage",
      },
      {
        id: 2,
        name: "메뉴2 - 2",
        url: "/manage/write ",
        icon: "manage",
      },
    ],
  },
]);
const runMenuItem = (index: number) => {
  console.log("runMenuItem", index);
  if (menus[index].option) {
    menus[index].option.show = !menus[index].option.show;
  }
};
</script>
<template>
  <div style="height: 200px">11</div>

  <div v-for="(menu, index) in menus">
    <div class="flex items-center gap-2" @click="runMenuItem(index)">
      <component
        v-if="menu.icon"
        :is="{ ...ComponentAccess.getComponentCase(menu.icon)?.component }"
        :stroke="menu?.option?.show ? '#0080FF' : '#666666'"
      ></component>
      {{ menu.name }}
      <template v-if="menu.children">
        <upArrow v-if="menu?.option?.show"></upArrow>
        <downArrow v-else></downArrow>
      </template>
    </div>
    <div v-if="menu.children && menu?.option?.show">
      <div v-for="child in menu.children">
        <div>{{ child.name }}</div>
      </div>
    </div>
  </div>

  <ComponentDatePickerTypeProps :data="reportDate">
  </ComponentDatePickerTypeProps>

  <div style="width: 300px; background: gray">
    <div>value : {{ toogle.value }}</div>
    <ComponentBuilder :data="toogle" />
  </div>

  <div>
    <div>value : {{ selectbox.value }}</div>
    <ComponentBuilder :data="selectbox" />
  </div>

  <div>
    <div>value : {{ radiobox.value }}</div>
    <ComponentBuilder :data="radiobox" />
  </div>

  <div>
    <div>value : {{ checkbox.value }}</div>
    <ComponentBuilder :data="checkbox" />
  </div>

  <div>
    <div>value : {{ testObject.value }}</div>
    <ComponentBuilder :data="testObject" />
  </div>
  <div>
    <div>value : {{ testNumber.value }}</div>
    <ComponentBuilder :data="testNumber" />
  </div>
  <div style="padding: 1rem">
    queryKeyTargetData : {{ display }} || {{ queryKeyTargetData }}
  </div>

  <div style="width: 700px; height: 320px">
    <ClientOnly>
      <canvas :id="randomstringa" width="400" height="200"></canvas>
    </ClientOnly>
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
  <div class="aaaddd">444444</div>
</template>
<style scoped>
.aaaddd {
  color: blue;
  font-weight: bold;
  font-size: 22px;
}
</style>
