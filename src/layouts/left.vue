<script setup lang="ts">
import { downArrow, upArrow } from "~/assets/svg";
import { ComponentAccess } from "~/components/ComponentAccess";
import { getMenuItems, LEFT_MENU_WIDTH } from "~/constants";

const leftWidth = `${LEFT_MENU_WIDTH}px`;
const leftMenu = reactive([...getMenuItems()]);
const mainContentsHeight = inject("provideHeight");
const perfectScroll: any = ref();

const updateScrollBarStatus = () => {
  setTimeout(() => {
    //에니메이션 렌더링이 0.5초 걸리므로 지연 0.5초
    perfectScroll?.value?.ps.update();
    if (!perfectScroll) {
      setTimeout(() => {
        perfectScroll?.value?.ps.update();
      }, 10);
    }
  }, 300);
};

const runMenuItem = (index?: number) => {
  if (index && leftMenu[index].option) {
    leftMenu[index].option.show = !leftMenu[index].option.show;
  }

  updateScrollBarStatus();
};

onMounted(() => {
  window.addEventListener("click", updateScrollBarStatus);
});
onUnmounted(() => {
  window.removeEventListener("click", updateScrollBarStatus);
});
</script>
<template>
  <ClientOnly>
    <PerfectScrollbar ref="perfectScroll">
      <div class="left-menu-area flex flex-col gap-[10px]">
        <div v-for="(menu, index) in leftMenu">
          <div
            :class="{
              'left-menu-item flex items-center justify-between': true,
              'bg-[#fff]': menu?.option?.show,
            }"
            @click="runMenuItem(index)"
          >
            <div class="flex items-center gap-2">
              <component
                v-if="menu.icon"
                :is="{
                  ...ComponentAccess.getComponentCase(menu.icon)?.component,
                }"
                :stroke="menu?.option?.show ? '#0080FF' : '#666666'"
              ></component>
              <div
                :class="{
                  'menu-name': true,
                  'text-[#0080FF]': menu?.option?.show,
                  'transition-all': true,
                }"
              >
                {{ menu.name }}
              </div>
            </div>

            <template v-if="menu.children">
              <upArrow v-if="menu?.option?.show"></upArrow>
              <downArrow v-else></downArrow>
            </template>
          </div>
          <div class="item-children" v-if="menu.children && menu?.option?.show">
            <div v-for="child in menu.children">
              <div class="item-children-name">{{ child.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </PerfectScrollbar>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.ps {
  background: var(--Neutral-100, #f8f8f8);
  max-height: v-bind(mainContentsHeight); /* or max-height: 400px; */
}
.left-menu-area {
  width: v-bind(leftWidth);
  height: 100%;

  padding: 16px 10px;
  .left-menu-item {
    padding: 8px 10px;
    border-radius: 5px;
    //background: var(--Background-White, #fff);
    cursor: pointer;
    .menu-name {
      font-size: 13px;
    }
  }
}
.item-children {
  animation: drop-down-open 0.3s ease forwards;
  cursor: pointer;
  user-select: none;
  .item-children-name {
    padding: 8px 0px 8px 40px;
    color: var(--Neutral-700, #666);
    font-size: 13px;
    &:hover {
      color: var(--Neutral-500, #aaa) !important;
    }
  }
}
@keyframes drop-down-open {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
