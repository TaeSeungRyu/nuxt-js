<script setup lang="ts">
import "@/assets/input.scss";
import { inject, reactive, ref, watchEffect } from "vue";
import { DataStructure } from "@/type";
import { downIcon, upIcon } from "@/assets/svg/select/";
import { useComponentState } from "../ComponentState";

const useState = useComponentState();
const datafromParent = inject<DataStructure>("data");
const inputList = reactive(datafromParent?.value);
const isInputFocus = ref(false);
const isMouseOver = ref(false);

const myScrollId = randomString(10);
//const elementHeight = 38;
const previewElement: any = ref(null);
const selectedItem = reactive({
  label: datafromParent?.option?.placeholder || "데이터를 선택하여주세요.",
  item: {},
  index: -1,
});
const isRun = ref(false);

//스크롤 아이디 값 기억
const stateRandomId = randomString(10);
const perfectScroll = ref();
const recordScrollPositionValue: any = ref(null);

watchEffect(() => {
  if (datafromParent?.option?.trigger) {
    let isSelect = false;
    inputList.forEach((item: any, index: number) => {
      if (item.selected) {
        selectedItem.label = item.label;
        selectedItem.item = item;
        selectedItem.index = index;
        isSelect = true;
      }
    });
    if (!isSelect) {
      selectedItem.label =
        datafromParent?.option?.placeholder || "데이터를 선택하여주세요.";
      selectedItem.item = {};
      selectedItem.index = -1;
    }
  }

  if (useState.getComponentState() != stateRandomId) {
    isRun.value = false;
  }
});

if (inputList.length > 0) {
  inputList.forEach((item: any, index: number) => {
    if (item.selected) {
      selectedItem.label = item.label;
      selectedItem.item = item;
      selectedItem.index = index;
    }
  });
}
const runDropBoxItem = () => {
  if (datafromParent?.option?.disabled) {
    return;
  }
  isInputFocus.value = !isRun.value;
  isRun.value = !isRun.value;
  if (isRun.value) {
    setScrollValue();
    useState.setComponentState(stateRandomId);
  }
};
const setMouseOver = (over: boolean) => {
  if (datafromParent?.option?.disabled) {
    return;
  }
  isMouseOver.value = over;
};
const setScrollValue = () => {
  setTimeout(() => {
    const container = document.querySelector(`#${myScrollId}`);
    if (
      recordScrollPositionValue.value &&
      selectedItem.index > -1 &&
      perfectScroll?.value?.ps
    ) {
      if (container) container.scrollTop = recordScrollPositionValue.value;
    }
  }, 40);
};

const setSelectItem = (item: any, index: number) => {
  selectedItem.label = item.label;
  selectedItem.item = item;
  selectedItem.index = index;
  inputList.forEach((listItem: any, idx: number) => {
    listItem.selected = false;
    if (idx === index) {
      listItem.selected = true;
    }
  });
  if (datafromParent?.value?.forEach) {
    datafromParent?.value?.forEach((listItem: any, idx: number) => {
      listItem.selected = false;
      if (idx === index) {
        listItem.selected = true;
      }
    });
  }
  datafromParent?.option?.change(item, inputList, datafromParent);
  runDropBoxItem();
  recordScrollPositionValue.value = perfectScroll?.value?.ps?.lastScrollTop;
};
</script>
<template>
  <ClientOnly>
    <div
      :style="{
        position: 'relative',
        ...datafromParent?.option?.containerStyle,
      }"
    >
      <div
        :class="{
          'input-area-no-padding': true,
          [datafromParent?.option?.class]: datafromParent?.option?.class,
          'input-focus': isInputFocus,
          'input-error': datafromParent?.option?.error,
          'input-error-mouseover': datafromParent?.option?.error && isMouseOver,
          'input-disabled': datafromParent?.option?.disabled,
          'cursor-pointer': true,
        }"
        @mouseover="setMouseOver(true)"
        @mouseleave="setMouseOver(false)"
        @click="runDropBoxItem()"
        :style="{ ...datafromParent?.option?.style }"
        ref="previewElement"
      >
        <!-- 선택된 데이터 표출   -->
        <div
          :class="{
            'prev-item': true,
            'font-error': datafromParent?.option?.error,
            'not-selected': selectedItem.index == -1,
          }"
        >
          <div style="user-select: none">{{ selectedItem.label }}</div>
          <upIcon v-if="isRun"></upIcon>
          <downIcon v-else></downIcon>
        </div>
      </div>
      <div
        v-if="isRun"
        class="select-box-container"
        :style="{ width: `${previewElement?.clientWidth}px` }"
      >
        <div class="select-box-drop-down-area">
          <ClientOnly>
            <PerfectScrollbar ref="perfectScroll" :id="myScrollId">
              <div
                v-for="(item, idx) in inputList"
                :class="{
                  'select-box-item': true,
                  selected: item.selected,
                  'small-type': datafromParent?.option?.smallType,
                }"
                @click="setSelectItem(item, idx)"
              >
                <div>{{ item.label }}</div>
              </div>
            </PerfectScrollbar>
          </ClientOnly>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.ps {
  max-height: 140px; /* or max-height: 400px; */
}

@keyframes select-box-animation {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(3px);
    opacity: 1;
  }
}

.input-area-no-padding {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.313rem;
  border: 1px solid var(--Neutral-300, #e1e1e1);
  background: var(--black-white-white, #fff);
  justify-content: space-between;
  min-height: 36px;
}

.prev-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 1rem;
  padding-right: 0.95rem;
  color: var(--Neutral-600, #4b4b4b);
  font-size: 13px;
}
.not-selected {
  color: var(--Neutral-400, #cacaca);
}
.select-box-container {
  position: relative;
  border-radius: 5px;
  border: 1px solid var(--Neutral-200, #eee);
  box-shadow: 0px 0.313rem 0.625rem 0px rgba(0, 0, 0, 0.08);
  min-width: max-content;
  font-size: 13px;
  animation: select-box-animation 0.25s linear;
  transform: translateY(1px);
  position: absolute;
  z-index: 2;
  top: 33px;
  left: 0;
  background: white;
  user-select: none;
  .select-box-drop-down-area {
    // overflow-y: auto;
    // max-height: v-bind(dropDownTopMaxHeight);
    width: calc(100%);
    padding: 6px;
    .select-box-item {
      height: 28px;
      display: flex;
      align-items: center;
      //border-bottom: 1px solid var(--Neutral-200, #eee);
      cursor: pointer;
      padding-left: 0.875rem;
    }
    .select-box-item:hover {
      background: rgba(245, 245, 245, 0.6);
      border-radius: 5px;
    }
    .selected {
      background: var(--Primary-50, #e6f2ff);
      border-radius: 5px;
    }
  }
}
</style>
