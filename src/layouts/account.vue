<script setup lang="ts">
const layoutProps = useAttrs();
const gapClass = ref(
  !layoutProps?.changeLeftIcon ? `gap-[186px]` : `gap-[179px]`
);
</script>
<template>
  <div class="siginin-container">
    <div :class="{ 'siginin-body': true, [gapClass]: true }">
      <div class="siginin-body-left">
        <div
          v-if="!layoutProps?.changeLeftIcon"
          class="image-area camera-image"
        ></div>
        <div v-else class="image-area password-image"></div>
      </div>
      <ClientOnly>
        <form class="siginin-body-right">
          <slot></slot>
        </form>
      </ClientOnly>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.siginin-container {
  background: var(--Primary-50, #e6f2ff);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 200px;
  .siginin-body {
    width: calc(100%);
    height: 762px;
    border-radius: 30px;
    background: var(--Background-White, #fff);
    box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    min-width: 338px;
    .siginin-body-left {
      @include contants.flex-middle;
      .camera-image {
        width: 576px;
        height: 440px;
        background: url("~/assets/img/signin-left-camera-image.png");
        background-size: contain;
        background-repeat: no-repeat;
      }
      .password-image {
        width: 596px;
        height: 450px;
        background: url("~/assets/img/signin-left-password-image.png");
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
    .siginin-body-right {
      width: 318px;
      height: 355px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 26px;
    }
  }
}

@media (max-width: 1478px) {
  .siginin-body {
    gap: 16px !important;
  }
  .siginin-body-left {
    height: 30%;
    .image-area {
      scale: 0.6;
    }
  }
}
@media (max-width: 708px) {
  .siginin-body {
    gap: 5px !important;
  }
  .siginin-body-left {
    height: 30%;
    .image-area {
      scale: 0.4;
    }
  }
}
</style>
