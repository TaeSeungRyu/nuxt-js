import type {
  DehydratedState,
  VueQueryPluginOptions,
} from "@tanstack/vue-query";
import {
  QueryClient,
  VueQueryPlugin,
  dehydrate,
  hydrate,
} from "@tanstack/vue-query";
export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>("vue-query");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Stale-While-Revalidate(SWR) 패턴을 사용한 캐싱 전략
        staleTime: 1, // 데이터가 1분간 신선하다고 간주
        refetchOnWindowFocus: false, // 윈도우 포커스 시 리패치 방지
      },
      mutations: {
        // 여기서 options를 설정할 수 있습니다
        retry: 1, // 실패한 mutation은 한 번만 재시도
        onError: (error) => {
          console.error("Mutation failed:", error);
        },
      },
    },
  });
  const options: VueQueryPluginOptions = { queryClient };
  nuxt.vueApp.use(VueQueryPlugin, options);
  if (import.meta.server) {
    nuxt.hooks.hook("app:rendered", () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }
  if (import.meta.client) {
    nuxt.hooks.hook("app:created", () => {
      hydrate(queryClient, vueQueryState.value);
    });
  }
});
