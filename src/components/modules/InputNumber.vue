<script setup lang="ts">
import "@/assets/input.scss";
import { inject, ref, watchEffect, onMounted } from "vue";
import { DataStructure } from "@/type";
import { inputRightRemover, inputRightError } from "@/assets/svg/input";
const datafromParent = inject<DataStructure>("data");
const inputValue = ref(`${datafromParent?.value?.value}`);
const triggerValue = ref("");
const isInputFocus = ref(false);
const isMouseOver = ref(false);

onMounted(() => {
  try {
    if (!inputValue.value || isNaN(Number(inputValue.value))) {
      inputValue.value = "";
    }
  } catch (error) {
    console.error(error);
  }
});

const setValueAction = ($event?: any, parentValueFromForced?: any) => {
  if (datafromParent) {
    const keyEventValue = $event?.target?.value;
    let resultValue = keyEventValue || parentValueFromForced;
    datafromParent.value.value = resultValue;
    console.log("setValueAction", resultValue);
    if (keyEventValue) {
      $event.target.value = resultValue;
    }
    if (datafromParent?.option?.change) {
      datafromParent.option.change($event, resultValue, datafromParent);
    }
    triggerValue.value = randomString(10);
  }
};

const setKeyAction = ($event: any) => {
  if ($event.keyCode !== 9 && datafromParent !== undefined) {
    if (!isNaN(Number($event?.target?.value))) {
      setValueAction($event);
    } else {
      $event.target.value = $event.target.value.replace(/[^0-9]/g, "");
      datafromParent.value.value = $event?.target?.value;
      triggerValue.value = randomString(10);
    }
  }
};
const removeInputValue = () => {
  inputValue.value = "";
  if (datafromParent?.value?.value) {
    datafromParent.value.value = "";
  }
};
const setInputFocus = (focus: boolean) => {
  if (datafromParent?.option?.disabled) {
    return;
  }
  isInputFocus.value = focus;
};
const setMouseOver = (over: boolean) => {
  if (datafromParent?.option?.disabled) {
    return;
  }
  isMouseOver.value = over;
};

watchEffect(() => {
  if (triggerValue.value != undefined && datafromParent) {
    if (
      datafromParent?.value?.value?.length > 0 &&
      isNaN(Number(datafromParent.value.value))
    ) {
      inputValue.value = datafromParent.value.value.replace(/[^0-9]/g, "");
    } else {
      inputValue.value = datafromParent.value.value;
    }
    console.log(" $inputValue", datafromParent.value.value);
    setValueAction(null, datafromParent.value.value);
  }
});
</script>
<template>
  <ClientOnly>
    <div
      :class="{
        'input-area': true,
        [datafromParent?.option?.class]: datafromParent?.option?.class,
        'input-focus': isInputFocus,
        'input-error': datafromParent?.option?.error,
        'input-error-mouseover': datafromParent?.option?.error && isMouseOver,
        'input-disabled': datafromParent?.option?.disabled,
      }"
      @mouseover="setMouseOver(true)"
      @mouseleave="setMouseOver(false)"
      :style="{ ...datafromParent?.option?.style }"
    >
      <input
        :class="{
          'font-error': datafromParent?.option?.error,
          'font-disabled': datafromParent?.option?.disabled,
        }"
        :placeholder="datafromParent?.option?.placeholder"
        :disabled="datafromParent?.option?.disabled"
        :maxlength="datafromParent?.option?.max"
        :minlength="datafromParent?.option?.min"
        type="text"
        v-model="inputValue"
        @input="setKeyAction"
        @focus="setInputFocus(true)"
        @focusout="setInputFocus(false)"
        :style="{ ...datafromParent?.option?.textStyle }"
      />
      <template v-if="!datafromParent?.option?.disabled">
        <div class="position-absolute">
          <inputRightError
            v-if="datafromParent?.option?.error"
          ></inputRightError>
          <inputRightRemover
            v-else-if="
              inputValue?.length > 0 && !datafromParent?.option?.hideRight
            "
            :class="{ 'cursor-pointer': true }"
            @click.prevent.stop="removeInputValue"
          >
          </inputRightRemover>
        </div>
      </template>
    </div>
  </ClientOnly>
</template>
<style lang="scss" scoped></style>
