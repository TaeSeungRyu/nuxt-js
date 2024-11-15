<script setup lang="ts">
/****
 * 들어온 타입을 구분하여 어떠한 컴포넌트로 붙여줄지 결정 합니다.
 */
import { provide, isProxy, toRaw } from "vue";
import { ComponentAccess } from "./ComponentAccess";
const { data } = defineProps(["data"]);
let targetComponent: any = null;

if (data?.type) {
  //들어온 타입에 맞게 컴포넌트를 골라 줍니다.
  targetComponent = ComponentAccess.getComponentCase(data?.type);
}
if (targetComponent !== null) {
  if (isProxy(data)) {
    provide("data", toRaw(data));
  } else {
    //컴포넌트에게 데이터 전달
    provide("data", data);
  }
}
</script>

<template>
  <component
    v-if="targetComponent"
    :is="{ ...targetComponent.component }"
  ></component>
</template>
