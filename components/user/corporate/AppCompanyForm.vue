<template>
  <div>
    <a-form>
      <AppInput
        v-model="companyDetails.companyName"
        label="Name of Company"
        placeholder="Type Name of Company"
        is-text
      />
      <AppSelect
        v-model="companyDetails.bizCat"
        label="Category of Business"
        placeholder="Select the category business fails under"
        url="/globalData/data?name=BUSINESS%20CATEGORY"
        :call-back-func="
          (resp) => ({
            text: resp,
            value: resp,
          })
        "
      />
      <AppInput
        v-model="companyDetails.bizAddress"
        label="Registered Business Address"
        placeholder="Type your registered Business Address"
      />
      <a-row type="flex" :gutter="6">
        <a-col :span="12">
          <AppInput
            v-model="companyDetails.rcNo"
            label="Registration Number"
            placeholder="Type RC No."
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="companyDetails.taxIdNo"
            label="Tax Identification Number"
            placeholder="Type TIN"
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="companyDetails.companyPhoneNo"
            label="Company Phone Number"
            placeholder="Type Phone No"
            is-phone
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="companyDetails.companyEmail"
            label="Company Email Address"
            placeholder="Type Company Email"
          />
        </a-col>
      </a-row>
    </a-form>
    <AppButton :loading="loading" @click="submitCompanyDetails"
      >Continue</AppButton
    >
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Row, Col, Form, notification } from 'ant-design-vue'
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppCompanyForm',
  components: {
    AppSelect,
    AppInput,
    AppButton,
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
  },
  data() {
    return {
      companyDetails: {},
      loading: false,
    }
  },
  methods: {
    async submitCompanyDetails() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      try {
        this.loading = true
        const representativeDetails = await this.$cookies.get(
          'representativeDetails'
        )
        const requestId = await this.$cookies.get('requestId')
        const companyDetails = {
          ...this.companyDetails,
          ...representativeDetails,
          requestId,
        }
        await this.$axios.$put('/corporate/companyDetails', companyDetails)
        await this.submitCompanyDetailsHandler(companyDetails)
        this.loading = false
        this.$router.replace('/user/corporate/director-details')
        this.$cookies.remove('representativeDetails')
      } catch (err) {
        this.loading = false
        this.message = err.response.data.errorMessage
        let errorMessage = 'Network Error'
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
          errorMessage = res.data.errorMessage
          const validationError = res.data.fieldValidationErrors
            ? res.data.fieldValidationErrors
            : []
          if (validationError === [] || !validationError) {
            notification.error({
              message: 'Error Message',
              description: errorMessage,
              duration: 0,
            })
            return
          }
          validationError.forEach((element) => {
            notification.error({
              message: 'Error',
              description: element.message,
              duration: 0,
            })
          })
        }
      }
    },
    validationHandler() {
      if (
        this.companyDetails.companyName === '' ||
        this.companyDetails.companyName === undefined
      ) {
        this.errorMessageHandler('Company Name')
        return true
      }
      if (
        this.companyDetails.bizCat === '' ||
        this.companyDetails.bizCat === undefined
      ) {
        this.errorMessageHandler('Category of Business')
        return true
      }
      if (
        this.companyDetails.bizAddress === '' ||
        this.companyDetails.bizAddress === undefined
      ) {
        this.errorMessageHandler('Registered Business Address')
        return true
      }
      if (
        this.companyDetails.rcNo === '' ||
        this.companyDetails.rcNo === undefined
      ) {
        this.errorMessageHandler('Registration Number')
        return true
      }
      if (
        this.companyDetails.taxIdNo === '' ||
        this.companyDetails.taxIdNo === undefined
      ) {
        this.errorMessageHandler('Tax Identification Number')
        return true
      }
      if (
        this.companyDetails.companyPhoneNo === '' ||
        this.companyDetails.companyPhoneNo === undefined
      ) {
        this.errorMessageHandler('Company Phone Number')
        return true
      }
      if (
        this.companyDetails.companyEmail === '' ||
        this.companyDetails.companyEmail === undefined
      ) {
        this.errorMessageHandler('Company Email Address')
        return true
      }
      return false
    },
    errorMessageHandler(message) {
      notification.error({
        message: 'Error',
        description: message,
        type: 'error',
        duration: 0,
      })
    },
    ...mapActions({
      submitCompanyDetailsHandler: 'corporateModule/POST_COMPANY_DETAILS',
    }),
  },
}
</script>
<style lang="scss" scoped>
.mb-10 {
  margin-bottom: 10px;
}
</style>
