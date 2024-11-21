<script setup lang="ts">
import "@/assets/input.scss";
import { reactive, ref, toRefs, inject, watch, watchEffect } from "vue";
import dayjs, { Dayjs } from "dayjs";
import {
  calculateDay,
  DAT_OF_WEEK_KOR,
  type calendarType,
} from "./ComponentUtil";
import { iconLeft, iconRight, calandar } from "~/assets/svg/datepicker/";
import { useComponentState } from "./ComponentState";

const data: any = defineProps(["data"]);

const dataFromParent = toRefs(data.data);
const useState = useComponentState();
const stateRandomId = randomString(10);
const DISABLED = "disabled";
const SUCCESS = "success";

let nowDate = dayjs();
let selected: any = null;
if (dataFromParent?.current?.value) {
  nowDate = dayjs(dataFromParent?.current?.value);
  selected = dayjs(nowDate);
} else {
  nowDate = dayjs();
  selected = dayjs(nowDate);
}

//표시할 데이터 목록 입니다.
const displayNow = ref(nowDate.format("YYYY년 MM월"));
const dayArray: Array<calendarType> = reactive([]);
const showPicker = reactive({
  onOff: false,
  className: "finit-date-picker hider",
});

//년도를 바꾸는 기능 구간 입니다-----
const showYear = ref(false);
let futureDate: Dayjs | null = null;
const displayFuture: any = ref(null);

//showPicker 데이터가 변화하는 것을 확인하고 선택한 날짜와 이동한 지역여부를 판별하는 변수 입니다.
let isReInit = false;

//다음달, 이전달로 넘기는 함수 입니다.
const moveNext = (arg?: number) => {
  if (arg) nowDate = nowDate.add(arg, "month");
  displayNow.value = nowDate.format("YYYY년 MM월");
  calculateDay(dayArray, nowDate);
  if (dataFromParent?.onNextMonthClick?.value) {
    dataFromParent?.onNextMonthClick?.value(nowDate);
  }
};

//날짜 데이터를 계산하는 함수를 사용 합니다.
calculateDay(dayArray, nowDate);

//년도를 눌러서 년도선택 영역을 불러 옵니다.
const showYearData = () => {
  futureDate = dayjs(nowDate.format("YYYY-MM-DD"));
  displayFuture.value = futureDate.format("YYYY");
  showYear.value = !showYear.value;
};

//년도를 바꿉니다.
const moveYearNext = (arg: number) => {
  if (futureDate) {
    futureDate = futureDate.add(arg, "year");
    displayFuture.value = futureDate.format("YYYY");
  }
};

//년도 선택기를 종료 합니다.
const closeYear = () => {
  showYear.value = false;
};

//년도 선택기에서 해당 년도와 월을 선택 합니다.
const changeYearMonth = (arg: number) => {
  showYear.value = false;
  nowDate = dayjs(`${futureDate?.format("YYYY")}-${arg}`);
  moveNext();
};
//텍스트 필드에게 바인딩 할 데이터 입니다.
const selectedDay = reactive({
  value: dataFromParent?.current?.value || "",
  status: dataFromParent?.disabled?.value ? DISABLED : SUCCESS,
  containerStyle: {},
  style: {
    "padding-left": "1.7rem",
    "padding-right": " 0.31rem",
  },
  class: "",
  readonly: true,
  placeholder: "",
  click() {
    showAndHideAnimation(true);
  },
  change: (value: string) => {
    parseDay(value);
    selectedDay.value = selected?.format("YYYY-MM-DD");
    data.data.current = selected?.format("YYYY-MM-DD");
    data.data.trigger = randomString(10);
  },
});

//선택된 날짜가 존재하면 색상을 바꿉니다.
const makeSelectedDay = (date: Dayjs | string) => {
  if (typeof date === "string") {
    date = dayjs(date.replace("년", "") + "-1");
    return date.diff(nowDate.startOf("month"), "month", true) == 0;
  } else {
    const arg = date.diff(selected, "day", true);
    if (isNaN(arg)) {
      return false;
    } else if (arg == 0 && date.diff(nowDate, "month", true) == 0) {
      return true;
    }
  }
  return false;
};

//인풋 텍스트 또는 클릭 이벤트의 값을 받아서 데이터를 변화 시킵니다.
const parseDay = (arg: any, calback?: any) => {
  try {
    const value = dayjs(arg);
    if (value.isValid() != null) {
      selected = value;
      nowDate = value;
      displayNow.value = nowDate.format("YYYY년 MM월");
      calculateDay(dayArray, nowDate);
      if (calback) calback();
      //showAndHideAnimation();
    }
  } catch (error) {
    console.log(error);
  }
};

//데이트 피커 내부 일자를 선택 한 경우 입니다.
const choiceDay = (item: any) => {
  parseDay(item?.stringFormat, () => {
    selectedDay.value = item.stringFormat;
    data.data.current = item.stringFormat;
  });
};

//피커를 동작 시키거나 또는 가립니다.
const showAndHideAnimation = (type?: any) => {
  if (dataFromParent?.disabled?.value) return;
  if (data?.data?.onloadShow) return;
  if (type && typeof type == "boolean") {
    showPicker.onOff = true;
    useState.setDatePickerState(stateRandomId);
    setTimeout(() => {
      showPicker.className = "finit-date-picker";
    }, 0);
  } else {
    showPicker.className = "finit-date-picker hider";
    setTimeout(() => {
      showPicker.onOff = false;
      closeYear();
    }, 200);
  }
};

//watch 함수를 통해서 보이기 가리기가 동작하였을 때 현재 날짜로 이동이 되어있지 않다면 조정 해 줍니다.
watch(showPicker, (arg) => {
  if (!isReInit && selected?.diff(nowDate, "month", true) != 0) {
    //선택한 날짜 이외의 영역에 머물러 있다면
    isReInit = true;
    nowDate = dayjs(selected);
    displayNow.value = nowDate.format("YYYY년 MM월");
    calculateDay(dayArray, nowDate);
    isReInit = false;
  }
});

//부모가 강제로 날짜를 바꾼 경우 입니다.
watchEffect((arg) => {
  if (data?.data?.trigger || stateRandomId != useState.getDatePickerState()) {
    nowDate = dayjs(data.data.current);
    selected = dayjs(data.data.current);
    selectedDay.value = selected?.format("YYYY-MM-DD");
    displayNow.value = nowDate.format("YYYY년 MM월");
    calculateDay(dayArray, nowDate);
    data.data.trigger = null;
  }
  if (stateRandomId != useState.getDatePickerState()) {
    showPicker.onOff = false;
    closeYear();
  }
  if (dataFromParent?.disabled?.value) {
    selectedDay.status = DISABLED;
    showPicker.className = "finit-date-picker hider";
    setTimeout(() => {
      showPicker.onOff = false;
      closeYear();
    }, 200);
  } else {
    selectedDay.status = SUCCESS;
  }
});

const closeCalendar = () => {
  showAndHideAnimation();
};
</script>

<template>
  <div
    :class="{
      'finit-picker-main': true,
    }"
    :style="{ ...data?.data?.style }"
  >
    <div class="show-box" v-if="!data?.onloadShow">
      <div
        :class="{
          'input-area': true,
          'input-focus': showPicker.onOff,
          'disabled-picker': data?.data?.disabled != null,
        }"
        style="width: 100%"
      >
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          v-model="selectedDay.value"
          :readonly="selectedDay.readonly"
          :class="{
            'disabled-picker-text': data?.data?.disabled != null,
          }"
          :style="{
            width: '100%',
            'font-size': '13px',
            ...data?.data?.inputStyle,
          }"
        />
      </div>
      <calandar
        class="calendar-icon-area"
        @click.prevent.stop="showAndHideAnimation(true)"
        :stroke="
          data?.data?.disabled != null
            ? '#EAEAEA'
            : showPicker.onOff
            ? '#0080FF'
            : '#8E8E8E'
        "
      ></calandar>
    </div>

    <div
      v-if="showPicker.onOff"
      :class="{
        [showPicker.className]: true,
        'top-zero': data?.data?.onloadShow,
      }"
      :style="{ ...dataFromParent?.layoutStyle }"
    >
      <!-- 년도를 선택하면 실행 -->
      <div class="calendar-year-picker" v-if="showYear">
        <div class="calendar-year-picker-child1">
          <div class="calendar-year-picker-main">
            <iconLeft
              class="grid-head-cursor"
              @click.prevent.stop="moveYearNext(-1)"
              :stroke="'rgb(48 131 219)'"
            ></iconLeft>
            <div class="display-future">{{ displayFuture }}</div>
            <iconRight
              class="grid-head-cursor"
              @click.prevent.stop="moveYearNext(1)"
              :stroke="'rgb(48 131 219)'"
            ></iconRight>
          </div>
          <div class="header-close-area">
            <div class="header-close-text">월 선택</div>
            <div class="header-close" @click.prevent.stop="closeYear">닫기</div>
          </div>
        </div>
        <div class="years">
          <div
            :class="{
              'grid-cursor': true,
              selected: makeSelectedDay(displayFuture + '-' + i),
            }"
            v-for="i in 12"
            :key="i"
            @click.prevent.stop="changeYearMonth(i)"
          >
            <div>{{ i }}</div>
          </div>
        </div>
      </div>

      <!-- 달력 헤더, 움직이는 기능 -->

      <!-- 달력 데이터 영역 -->
      <div
        :class="{
          'grid-main': true,
          'off-shadow': data?.offShadow,
          'off-border': data.offBorder,
        }"
      >
        <div class="grid-head">
          <div style="display: flex; padding-top: 3px">
            <iconLeft
              class="grid-head-cursor"
              @click.prevent.stop="moveNext(-1)"
              :stroke="'#3D3D3D'"
            ></iconLeft>
          </div>
          <div
            class="grid-cursor"
            @click.prevent.stop="showYearData"
            style="color: black"
          >
            {{ displayNow }}
          </div>
          <div style="display: flex; padding-top: 3px">
            <iconRight
              class="grid-head-cursor"
              @click.prevent.stop="moveNext(1)"
              :stroke="'#DFDEDE '"
            ></iconRight>
          </div>
        </div>
        <div class="grid-container">
          <!-- 달력 요일 상단 -->
          <div
            v-for="(item, idx) in DAT_OF_WEEK_KOR"
            :key="item"
            :class="{
              'grid-day-of-week': true,
              'grid-7-layer': true,
              'right-line': idx != 0 && idx % 6 == 0,
            }"
          >
            {{ item }}
          </div>
          <!-- 달력 일자 -->
          <template v-for="(item, idx) in dayArray" :key="idx">
            <div
              SAT
              :class="{
                'cursor-pointer': true,
                'grid-7-layer': true,
                selected: makeSelectedDay(item.date),
                [item.dayOfWeek]: true,
              }"
              @click.prevent.stop="choiceDay(item)"
              style="position: relative"
            >
              <div
                :class="{
                  [item.type]: true,
                }"
              >
                {{ item.dayString }}
              </div>
            </div>
          </template>
        </div>
        <div
          v-if="!data?.onloadShow"
          class="grid-footer"
          @click.prevent.stop="closeCalendar()"
        >
          <button class="btn btn-primary">적용</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-area {
  position: relative;
  display: flex;
  height: auto;
  align-items: center;
  border-radius: 0.313rem;
  border: 1px solid var(--Neutral-200, #eaeaea);
  background: var(--black-white-white, #fff);
  padding-left: 12px;
}
.calendar-icon-area {
  position: absolute;
  right: 1.063rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.show-box {
  display: flex;
  position: relative;
  //width: 10.938rem;
}

.finit-picker-main {
  position: relative;

  .finit-date-picker {
    position: absolute;
    width: 256px;
    height: calc(16rem + 1.75rem);
    z-index: 5;
    transition: 0.2s;
    transition-property: all;
    opacity: 1;
    top: 3.1rem;
    .calendar-year-picker {
      font-size: 13px;
      width: auto;
      height: 7.813rem;
      position: absolute;
      background: white;
      box-shadow: 0px 0.5rem 1rem 0px rgba(0, 0, 0, 0.05);
      padding: 0.625rem 1.188rem;
      top: 0px;
      left: 50%;
      z-index: 6;
      transform: translateX(-50%);
      border-radius: 0.313rem;
      user-select: none;
      border: 1px solid contants.$DISABLED;
      @include contants.flex-middle;
      flex-direction: column;
      .calendar-year-picker-child1 {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        .calendar-year-picker-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.625rem;
          line-height: 1.125rem;
          width: 100%;
          .display-future {
            color: rgb(61, 61, 61);
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
          }
        }
        .header-close-area {
          width: 100%;
          height: 1.938rem;
          @include contants.flex-middle;
          justify-content: space-between !important;
          margin-top: 1.25rem;
          .header-close-text {
            color: rgb(66, 66, 66);
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
          }
          .header-close {
            color: #c1c5ff;
            text-align: center;
            font-size: 13px;
            font-style: normal;
            cursor: pointer;
          }
        }
      }
      .years {
        display: grid;
        gap: 1px;
        width: 13.188rem;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(2, 1fr);
        div {
          @include contants.flex-middle;
          width: 1.75rem;
          height: 1.75rem;
          font-size: 13px;
        }
      }
    }

    .grid-cursor {
      cursor: pointer;
    }
    .grid-cursor:hover {
      color: rgb(206, 206, 206);
    }
    .grid-head-cursor {
      cursor: pointer;
    }
    .grid-head-cursor:hover {
      opacity: 0.7;
    }

    .grid-head {
      display: flex;
      font-size: 13px;
      justify-content: space-between;
      padding-left: 20px;
      padding-right: 20px;
      align-items: center;
      color: rgb(20, 20, 20);
      font-style: normal;
      font-weight: 400;
      height: 2.188rem;
      user-select: none;
      margin-top: 0.313rem;
      margin-bottom: 2.5px;
    }
    .grid-main {
      border-radius: 0.5rem;
      border: 1px solid contants.$DISABLED;
      background: contants.$WHITE;
      box-shadow: 0px 0.5rem 1rem 0px rgba(0, 0, 0, 0.05);

      .grid-container {
        display: grid;
        grid-template-columns: repeat(7, 1.75rem);
        column-gap: 3.3px;
        grid-template-rows: repeat(7, 1.75rem);
        height: calc(11.125rem + 1.75rem);
        padding: 0px 20px 0px 20px;
        margin-bottom: 0.5px;
        .grid-day-of-week {
          color: rgb(21, 21, 53);
        }
        .grid-7-layer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: rgb(61, 61, 61);
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          user-select: none;
          border: 1px solid rgba(0, 0, 0, 0);
          padding-bottom: 1px;
          padding-right: 1px;
        }
      }
      .grid-footer {
        display: flex;
        justify-content: end;
        align-items: center;
        border-top: 1px solid var(--Neutral-300, #e1e1e1);
        background: var(--Gray-G10, #fafafa);
        width: 100%;
        border-radius: 0px 0px 5px 5px;
        height: 51px;
        font-style: normal;
        cursor: pointer;
        user-select: none;
        transition: opacity 0.2s;
        button {
          margin-right: 20px;
        }
      }
      .grid-footer:hover {
        opacity: 0.6;
      }
    }
  }
  .hider {
    opacity: 0;
    top: 0em;
  }
  .top-zero {
    opacity: 1 !important;
    top: 0em !important;
  }
}

.cursor-pointer {
  cursor: pointer;
}
.cursor-pointer:hover {
  border-radius: 5px;
  border: 1px solid #c1c5ff !important;
}

//전 달 날짜
.past {
  color: contants.$DISABLED;
}
//현재 달 날짜
.current {
  color: black;
}
//다음 달 날짜
.future {
  color: contants.$DISABLED;
}
//선택된 또는 처음 주입받은 날짜
.selected {
  border-radius: 5px;
  background: var(--Primary-500, #0080ff);
  font-style: normal;
  font-weight: 400;
  div {
    color: contants.$WHITE !important;
  }
}

.off-shadow {
  box-shadow: none !important;
}
.off-border {
  border: none !important;
}
.red-dot {
  background: #f44336;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  right: 3px;
}
.gray-can-not-select {
  color: contants.$DISABLED !important;
  text-decoration: line-through;
}
.gray-can-not-select:hover {
  border-radius: 0% !important;
  border: 1px solid rgba(0, 0, 0, 0) !important;
  cursor: default;
}
//휴일 색상--------------------------------
.HOLLY-DAY {
  text-decoration: none !important;
  div {
    text-decoration: none !important;
    color: rgba(244, 67, 54, 1) !important;
  }
}
.SUN {
  text-decoration: none !important;
  div {
    text-decoration: none !important;
    color: rgba(244, 67, 54, 1) !important;
  }
}
.SAT {
  text-decoration: none !important;
  div {
    text-decoration: none !important;
    color: rgba(244, 67, 54, 1) !important;
  }
}
.selected.SUN {
  div {
    color: rgb(255, 166, 158) !important;
  }
}
.selected.SAT {
  div {
    color: rgb(255, 166, 158) !important;
  }
}
.selected.HOLLY-DAY {
  div {
    color: rgb(255, 166, 158) !important;
  }
}
.calendar-icon {
  position: absolute;
  left: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  color: #bbb;
  cursor: pointer;
  transition: all 0.3s ease;
}
.calendar-icon:hover {
  color: contants.$success-hover;
  opacity: 0.5;
}
.disabled-picker {
  background: var(--Neutral-100, #f5f5f5);
  border: 1px solid var(--Neutral-300, #e1e1e1);
}
.disabled-picker-text {
  color: var(--Neutral-400, #cacaca) !important;
  background: var(--Neutral-100, #f5f5f5) !important;
}

input[type="text"]::placeholder {
  font-size: 13px;
  font-weight: 400;
}
</style>
