<template>
  <div>
    <AppTitleComponent heading="Final Steps" />
    <div>
      <div>
        <AppInput v-model="referenceNumber" required label="Reference Number" />
        <AppUpload
          label="Reference Form 1"
          :extension="['.docx', '.pdf']"
          @fileUploadHandler="fileUploadReference1Handler"
        />
        <AppUpload
          label="Reference Form 2"
          :extension="['.docx', '.pdf']"
          @fileUploadHandler="fileUploadReference2Handler"
        />
        <AppButton :loading="loading" @click="submitDocumentHandler"
          >Save &amp; Continue</AppButton
        >
      </div>
    </div>
    <p class="notification">
      Two Reference forms are required to open a Current Account,
      <a :href="baseUrl + `/forms/download/referenceForm`" download
        >click here</a
      >
      to download, fill and make ready for upload.
    </p>
  </div>
</template>
<script>
import { notification } from 'ant-design-vue'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppUpload from '@/components/UI/AppUpload'
import AppButton from '@/components/UI/AppButton'
import AppInput from '@/components/UI/AppInput'

export default {
  components: {
    AppTitleComponent,
    AppUpload,
    AppButton,
    AppInput,
  },
  data() {
    return {
      referenceFile1: null,
      referenceFile2: null,
      loading: false,
      referenceNumber: '',
      baseUrl: process.env.BASE_URL,
    }
  },
  destroyed() {
    notification.destroy()
  },
  methods: {
    fileUploadReference1Handler(file) {
      this.referenceFile1 = file
    },
    fileUploadReference2Handler(file) {
      this.referenceFile2 = file
    },
    async submitDocumentHandler() {
      if (!this.referenceNumber) {
        notification.error({
          message: 'Error',
          description: 'Reference Number is Mandatory',
          duration: 4000,
        })
        return
      }
      if (!this.referenceFile1) {
        notification.error({
          message: 'Error',
          description: 'Reference File 1 is Mandatory',
          duration: 4000,
        })
        return
      }

      if (!this.referenceFile2) {
        notification.error({
          message: 'Error',
          description: 'Reference File 2 is Mandatory',
          duration: 4000,
        })
        return
      }
      try {
        this.message = ''
        this.loading = true
        const response = this.$cookies.get('requestId')
        const formData = new FormData()
        if (this.referenceFile1) {
          formData.append('referenceForm1', this.referenceFile1)
        }
        if (this.referenceFile2) {
          formData.append('referenceForm2', this.referenceFile2)
        }
        formData.append('referenceNumber', this.referenceNumber)
        formData.append('requestId', response)
        await this.$axios.$post('/individual/uploadReferences', formData)
        this.$router.replace('/user/individual/weldone')
        this.loading = false
      } catch (err) {
        this.loading = false
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(err).forEach((msg) => {
          notification.error({
            message: 'Error',
            description: msg,
            duration: 4000,
          })
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.notification {
  position: absolute;
  bottom: 4%;
  font-weight: bold;
  font-size: 14px;
}
</style>
