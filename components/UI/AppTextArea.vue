<template>
  <div class="full-input">
    <a-form-item
      :label="label"
      :required="required"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-textarea
        v-model="innerValue"
        type="text"
        :placeholder="placeholder"
        :size="size"
        :rows="rows"
        cols="50"
        :disabled="disabled"
        @blur="blurHandler"
      />
    </a-form-item>
  </div>
</template>

<script>
import { Input, Form } from 'ant-design-vue'
import 'ant-design-vue/lib/input/style/index.less'
import 'ant-design-vue/lib/form/style/index.less'
export default {
  name: 'AppInput',
  components: {
    'a-textarea': Input.TextArea,
    'a-form-item': Form.Item,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 4,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  computed: {
    classObject() {
      return {
        'ant-input-lg': this.size === 'large',
        'ant-input-sm': this.size === 'small',
        'ant-input-disabled': this.disabled,
      }
    },
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal && (newVal !== '' || newVal.length > 0)) {
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
  methods: {
    blurHandler(e) {
      this.$emit('blur', e.target.value)
    },
  },
}
</script>
<style lang="scss" scoped>
.full-input {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #eaeaea;
  width: 100%;
  margin-bottom: 15px;
}
label {
  font-family: 'GothamThin', sans-serif;
}
textarea {
  outline: none;
  border: none;
  display: block;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #2e434e;
  padding: 2px 1px;
  width: 100%;
}
@media only screen and (max-width: 600px) {
  label {
    font-size: 10px !important;
  }
}
@media only screen and (max-width: 991px) {
  textarea {
    font-size: 13px !important;
    line-height: 195%;
  }
}
@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    textarea {
      font-size: 12px !important;
      line-height: 195%;
    }
  }
  @media only screen and (min-height: 900px) {
    textarea {
      font-size: 14px !important;
      line-height: 195%;
    }
  }
}
</style>
