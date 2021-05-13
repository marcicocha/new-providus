<template>
  <div>
    <AppInput
      v-model="localPersonInfoObject.taxPayerId"
      label="Tax Identification Number"
      placeholder="Enter ID Number"
      max-length="15"
    />
    <AppInput
      v-model="localPersonInfoObject.employeeIdNo"
      label="Employee Identification Number"
      placeholder="Enter Number"
      max-length="15"
    />
    <AppTextArea
      v-model="localPersonInfoObject.purposeOfAcc"
      label="Purpose of Account"
      placeholder="Type purpose of account here"
    />
    <AppButton @click="submitIdentificationInfoHandler"
      >Save &amp; Continue</AppButton
    >
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'
import AppTextArea from '@/components/UI/AppTextArea'
export default {
  name: 'AppIdentificationNumberInformation',
  components: {
    AppInput,
    AppButton,
    AppTextArea,
  },
  props: {
    personalInfoObject: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      localPersonInfoObject: {
        ...this.personalInfoObject,
      },
    }
  },
  methods: {
    submitIdentificationInfoHandler() {
      this.$emit('identificationHandler', this.localPersonInfoObject)
    },
  },
}
</script>
