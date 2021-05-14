<template>
  <div>
    <AppTitleComponent
      heading="Reference"
      description="Please enter the Reference ID you recieved via Email"
    />
    <br />
    <AppInput
      v-model="referenceId"
      label="Reference ID"
      placeholder="Enter Reference ID"
      :disabled="isLoading"
    />
    <div style="height: 20px"></div>
    <AppButton
      title="Submit Reference ID"
      :disabled="!referenceId"
      :loading="isLoading"
      @click="referenceIdHandler"
    />
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
      referenceId: '',
      isLoading: false,
    }
  },
  methods: {
    async referenceIdHandler() {
      try {
        this.isLoading = true
        const response = await this.$axios.$post(
          '/individual',
          this.referenceId
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
