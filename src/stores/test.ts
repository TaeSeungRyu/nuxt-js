import { defineStore } from "pinia";

//검색 데이터를 담아두는 상태 입니다 (새로고침과 뒤로가기 하면 날라가므로..)
export const useSearchStore = defineStore("search", {
  persist: true,
  state: () => {
    return {
      list: [1],
      currentUrl: "", //현재 URL과 비교하여 페이지 이동시 데이터를 초기화 하기 위한 변수
    };
  },
  actions: {
    setStatus(key: string, url: string, value: any) {
      this.list.push(3);
    },
    removeStatus(url: string) {},
  },
  getters: {},
});
