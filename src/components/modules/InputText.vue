<script setup lang="ts">
import { inject, ref, watchEffect } from "vue";
import { DataStructure } from "@/type";
const datafromParent = inject<DataStructure>("data");
const inputValue = ref(`${datafromParent?.value?.value}`);

const isInputFocus = ref(false);
const isMouseOver = ref(false);

const setKeyAction = ($event: any) => {
  if ($event.keyCode !== 9 && datafromParent !== undefined) {
    if (datafromParent?.option?.change) {
      datafromParent.option.change(
        $event,
        $event?.target?.value,
        datafromParent
      );
      datafromParent.value.value = $event?.target?.value;
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
  if (datafromParent?.value?.value != undefined) {
    inputValue.value = datafromParent.value.value;
  }
});
</script>
<template>
  <div
    :class="{
      'input-area': true,
      'input-small': datafromParent?.option?.smallType,
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
    inputValue test :: {{ inputValue }}
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
      type="text"
      v-model="inputValue"
      @input="setKeyAction"
      @focus="setInputFocus(true)"
      @focusout="setInputFocus(false)"
      :style="{ ...datafromParent?.option?.textStyle }"
    />
    <template v-if="!datafromParent?.option?.disabled">
      <div class="position-absolute">
        <div v-if="datafromParent?.option?.error">error</div>
        <div
          v-else-if="
            inputValue.length > 0 && !datafromParent?.option?.hideRight
          "
          :class="{ 'cursor-pointer': true }"
          @click.prevent.stop="removeInputValue"
        >
          remove
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped></style>
