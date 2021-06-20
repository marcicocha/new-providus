<template>
  <div>
    <AppTitleComponent heading="Final Steps" />
    <div>
      <hr />
      <div>
        <AppInput v-model="referenceNumber" required label="Reference Number" />
        <AppUpload
          :label="accountTypeLabel"
          :extension="['.docx', '.pdf']"
          @fileUploadHandler="fileUploadReference1Handler"
        />
        <AppUpload
          :label="accountTypeLabel2"
          :extension="['.docx', '.pdf']"
          @fileUploadHandler="fileUploadReference2Handler"
        />
        <AppButton :loading="loading" @click="submitDocumentHandler"
          >Save &amp; Continue</AppButton
        >
      </div>
    </div>
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
    }
  },
  computed: {
    accountTypeLabel() {
      const response = this.$cookies.get('accountType')

      if (response === 'CURRENT') {
        return 'Reference Form 1'
      }
      return 'Reference Form 1 (optional)'
    },
    accountTypeLabel2() {
      const response = this.$cookies.get('accountType')

      if (response === 'CURRENT') {
        return 'Reference Form 2'
      }
      return 'Reference Form 2 (optional)'
    },
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
      const response = this.$cookies.get('accountType')
      if (!this.referenceNumber) {
        notification.error({
          message: 'Error',
          description: 'Reference Number is Mandatory',
          duration: 4000,
        })
        return
      }
      if (response === 'CURRENT') {
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
