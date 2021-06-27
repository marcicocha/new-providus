<template>
  <div class="full-checkbox">
    <a-form-item :required="required">
      <a-checkbox v-model="innerValue" :disabled="disabled" @change="onChange">
        {{ label }}
      </a-checkbox>
    </a-form-item>
  </div>
</template>
<script>
import { Checkbox, Form } from 'ant-design-vue'
import 'ant-design-vue/lib/checkbox/style/index.less'
export default {
  name: 'AppCheckbox',
  components: { 'a-checkbox': Checkbox, 'a-form-item': Form.Item },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: false,
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.innerValue = newVal
        } else {
          this.innerValue = undefined
        }
      },
      immediate: true,
    },
    innerValue: {
      handler(newVal, oldVal) {
        this.$emit('input', newVal)
      },
      immediate: true,
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    } else {
      this.innerValue = undefined
    }
  },
  methods: {
    onChange(e) {
      console.log(this.innerValue, 'TEST')
      this.$emit('change', this.innerValue)
    },
  },
}
</script>
<style lang="scss" scoped>
label {
  width: 100%;
  display: flex;
  font-size: 14px !important;
}
input {
  width: auto;
  margin-right: 15px;
}
.full-checkbox {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
}
// input[type='checkbox'] {
//   visibility: hidden;
// }
</style>
