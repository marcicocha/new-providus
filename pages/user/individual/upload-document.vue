<template>
  <div>
    <AppTitleComponent heading="Final Steps" />
    <div>
      <hr />
      <div>
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
        <AppUpload
          label="Signature"
          @fileUploadHandler="fileUploadSignatureHandler"
        />
        <AppButton
          :loading="loading"
          :disabled="!signatureFile"
          @click="submitDocumentHandler"
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

export default {
  components: {
    AppTitleComponent,
    AppUpload,
    AppButton,
  },
  data() {
    return {
      referenceFile1: null,
      referenceFile2: null,
      signatureFile: null,
      loading: false,
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
  methods: {
    fileUploadReference1Handler(file) {
      this.referenceFile1 = file
    },
    fileUploadReference2Handler(file) {
      this.referenceFile2 = file
    },
    fileUploadSignatureHandler(file) {
      this.signatureFile = file
    },
    async submitDocumentHandler() {
      if (!this.signatureFile) {
        notification.error({
          message: 'Error',
          description: 'Signature File is Compulsory',
          duration: 0,
        })
        return
      }
      const response = this.$cookies.get('accountType')
      if (response === 'CURRENT') {
        if (!this.referenceFile1) {
          notification.error({
            message: 'Error',
            description: 'Reference File 1 is Mandatory',
            duration: 0,
          })
          return
        }

        if (!this.referenceFile2) {
          notification.error({
            message: 'Error',
            description: 'Reference File 2 is Mandatory',
            duration: 0,
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
        formData.append('signature', this.signatureFile)
        formData.append('requestId', response)
        await this.$axios.$post(
          '/individual/referenceAndSignatureUpload',
          formData
        )
        this.$router.replace('/user/individual/liveness-check')
        this.loading = false
      } catch (err) {
        this.loading = false
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
