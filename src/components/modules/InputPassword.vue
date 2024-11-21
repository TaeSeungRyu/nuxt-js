<script setup lang="ts">
import "@/assets/input.scss";
import { inject, ref, watchEffect } from "vue";
import { DataStructure } from "@/type";
import { inputRightLock, inputRightUnlock } from "@/assets/svg/input";

const PASSWORD = "password";
const TEXT = "text";

const datafromParent = inject<DataStructure>("data");
const inputValue = ref(`${datafromParent?.value.value}`);
const isInputFocus = ref(false);
const isMouseOver = ref(false);
const displayType = ref(PASSWORD);

const setKeyAction = ($event: any) => {
  if ($event.keyCode !== 9 && datafromParent !== undefined) {
    datafromParent.value.value = $event?.target?.value;
    if (datafromParent?.option?.change) {
      datafromParent.option.change(
        $event,
        $event?.target?.value,
        datafromParent
      );
    }
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
const setDisplayType = () => {
  displayType.value = displayType.value === PASSWORD ? TEXT : PASSWORD;
};

watchEffect(() => {
  if (datafromParent?.value?.value != undefined) {
    inputValue.value = datafromParent.value.value;
  }
});
</script>
<template>
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
        'font-small': datafromParent?.option?.smallType,
        'font-error': datafromParent?.option?.error,
        'font-disabled': datafromParent?.option?.disabled,
      }"
      :placeholder="datafromParent?.option?.placeholder"
      :disabled="datafromParent?.option?.disabled"
      :maxlength="datafromParent?.option?.max"
      :minlength="datafromParent?.option?.min"
      :type="displayType"
      v-model="inputValue"
      autocomplete="false"
      @input="setKeyAction"
      @focus="setInputFocus(true)"
      @focusout="setInputFocus(false)"
      :style="{ ...datafromParent?.option?.textStyle }"
    />
    <template v-if="!datafromParent?.option?.disabled">
      <div class="position-absolute">
        <inputRightLock
          v-if="displayType === PASSWORD"
          :stroke="datafromParent?.option?.error ? '#EA372A' : '#C8C8C8'"
          :class="{ 'cursor-pointer': true }"
          @click.prevent.stop="setDisplayType"
        ></inputRightLock>
        <inputRightUnlock
          v-else
          :stroke="datafromParent?.option?.error ? '#EA372A' : '#C8C8C8'"
          :class="{ 'cursor-pointer': true }"
          @click.prevent.stop="setDisplayType"
        ></inputRightUnlock>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
