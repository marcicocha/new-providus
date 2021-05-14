<template>
  <div class="parent_container">
    <AppTitleComponent heading="Capture Selfie" :description="description" />
    <br />
    <AppCaptureInstruction
      v-if="isCaptureInstruction"
      @captureInstructionHandler="captureInstructionHandler"
    />
    <AppCaptureSelfie
      v-if="isCapture"
      :form-loading="formLoading"
      @submitCapturehandler="submitCapturehandler"
    />
  </div>
</template>
<script>
import { notification } from 'ant-design-vue'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppCaptureInstruction from '@/components/user/individual/capture/AppCaptureInstruction'
import AppCaptureSelfie from '@/components/user/individual/capture/AppCaptureSelfie.vue'
export default {
  components: {
    AppTitleComponent,
    AppCaptureInstruction,
    AppCaptureSelfie,
  },
  data() {
    return {
      description: 'Take a selfie showing your face.',
      isCaptureInstruction: true,
      isCapture: false,
      formLoading: false,
    }
  },
  methods: {
    captureInstructionHandler() {
      this.isCaptureInstruction = false
      this.isCapture = true
      this.description =
        'Stay still and keep your face inside the oval while taking selfie'
    },
    async submitCapturehandler(file) {
      try {
        this.formLoading = true
        const referenceCode = this.$cookies.get('referenceCode')
        const formData = new FormData()
        formData.append('file', file)
        formData.append('referenceCode', referenceCode)
        await this.$axios.$post('/corporate/directorSelfieUpload', formData)
        this.formLoading = false
        this.$router.replace('/user/corporate/upload-document')
      } catch (err) {
        this.formLoading = false
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
<style lang="scss" scoped>
.parent_container {
  width: 85%;
  height: 100%;
}
@media only screen and (max-width: 600px) {
  .parent_container {
    width: 100% !important;
    height: 100%;
  }
}
</style>
