<template>
  <div>
    <br />
    <div>
      <AppButton
        :class="{ 'success-btn': isIdSuccess }"
        @click="$router.replace('/user/individual/upload-valid-id')"
        >{{
          idObject.identityFile
            ? `${idObject.identityFile.name} uploaded`
            : 'Upload Valid ID'
        }}</AppButton
      >
    </div>

    <br />
    <div>
      <AppButton
        :class="{ 'success-btn': isUtilitySuccess }"
        @click="$router.replace('/user/individual/upload-utility')"
        >{{
          utilityFile
            ? `${utilityFile.name} uploaded`
            : 'Upload Valid Utlity Bill'
        }}</AppButton
      >
    </div>
    <br />
    <div>
      <AppButton
        :class="{ 'success-btn': isSignatureSuccess }"
        @click="$router.replace('/user/individual/upload-signature')"
        >{{
          signatureFile ? `${signatureFile.name} uploaded` : 'Upload Signature'
        }}</AppButton
      >
    </div>
    <br />
    <br />
    <div>
      <AppButton
        v-if="isIdSuccess && isSignatureSuccess && isUtilitySuccess"
        @click="submitHandler"
        >Submit Document</AppButton
      >
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { notification } from 'ant-design-vue'
import AppButton from '@/components/UI/AppButton'

export default {
  components: {
    AppButton,
  },
  computed: {
    isIdSuccess() {
      if (this.idObject && Object.keys(this.idObject).length !== 0) {
        return true
      }
      return false
    },
    isUtilitySuccess() {
      if (this.utilityFile && this.utilityFile !== '') {
        return true
      }
      return false
    },
    isSignatureSuccess() {
      if (this.signatureFile && this.signatureFile !== '') {
        return true
      }
      return false
    },
    ...mapState({
      idObject: (state) => state.idObject,
      utilityFile: (state) => state.utilityFile,
      signatureFile: (state) => state.signatureFile,
    }),
  },
  methods: {
    async submitHandler() {
      try {
        const response = this.$cookies.get('requestId')
        const formData = new FormData()
        formData.append('requestId', response)
        formData.append('idType', this.idObject.idType)
        formData.append('idCard', this.idObject.identityFile)
        formData.append('utilityBill', this.utilityFile)
        formData.append('signature', this.signatureFile)
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        await this.$axios.$post('/individual/uploadDocuments', formData, config)
        this.$router.replace('/user/individual/liveness-check')
      } catch (err) {
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
