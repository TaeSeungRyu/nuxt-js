import { defineStore } from "pinia";

//검색 데이터를 담아두는 상태 입니다 (새로고침과 뒤로가기 하면 날라가므로..)
export const useAuthStore = defineStore("useAuthStore", {
  //persist: true,
  state: () => {
    return {
      token: "",
    };
  },
  actions: {},
  getters: {},
});
