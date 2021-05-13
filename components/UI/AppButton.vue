<template>
  <a-button
    :type="type"
    :icon="icon"
    :size="size"
    :loading="loading"
    :block="block"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </a-button>
</template>

<script>
import { Button } from 'ant-design-vue'
import 'ant-design-vue/lib/button/style/index.less'

export default {
  name: 'AppButton',
  components: { 'a-button': Button },
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'large',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '#fdb813',
    },
    block: {
      type: Boolean,
      default: true,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  // computed: {
  //   btnStyle() {
  //     const style = {
  //       'background-color': this.background,
  //       color: this.color,
  //     }
  //     return style
  //   },
  // },
}
</script>
<style lang="scss" scoped>
button {
  border-radius: 0;
  font-size: 16px !important;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: bold;
}
@media only screen and (max-width: 991px) {
  button {
    font-size: 13px !important;
  }
}
@media only screen and (min-width: 1536px) {
  .button {
    padding-top: 1.7em !important;
    padding-bottom: 1.7em !important;
  }
  @media only screen and (min-height: 730px) {
    .button {
      padding-top: 1.5em !important;
      padding-bottom: 1.5em !important;
    }
    button {
      font-size: 13px !important;
    }
  }
  @media only screen and (min-height: 900px) {
    .button {
      padding-top: 1.7em !important;
      padding-bottom: 1.7em !important;
    }
  }
}
</style>
