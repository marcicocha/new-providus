<template>
  <div>
    <AppTitleComponent
      heading="Reference"
      description="Please enter the Reference ID you recieved via Email"
    />
    <br />
    <AppInput
      v-model="referenceCode"
      label="Reference ID"
      placeholder="Enter Reference ID"
      :disabled="isLoading"
      max-length="11"
      min-length="11"
    />
    <div style="height: 20px"></div>
    <AppButton
      :disabled="!referenceCode"
      :loading="isLoading"
      @click="referenceIdHandler"
      >Submit Reference ID</AppButton
    >
  </div>
</template>
<script>
import { notification } from 'ant-design-vue'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppInput,
    AppButton,
  },
  data() {
    return {
      referenceCode: '',
      isLoading: false,
    }
  },
  methods: {
    async referenceIdHandler() {
      try {
        this.isLoading = true
        const response = await this.$axios.$post(
          `/corporate/verifyReferenceCode?referenceCode=${this.referenceCode}`
        )
        if (response) {
          this.$router.replace('/user/corporate/upload-document')
          this.isLoading = false
        }
      } catch (err) {
        this.isLoading = false
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(err).forEach((msg) => {
          notification.error({
            message: 'Error',
            description: msg,
            duration: 0,
          })
        })
      }
    },
  },
}
</script>
