<template>
  <div>
    <AppTitleComponent
      heading="Open a Corporate Account"
      description="Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here."
    />
    <div class="account-info__block">
      <div><hr /></div>

      <div v-if="isRC">
        <a-form>
          <AppInput
            v-model="rcNo"
            label="RC No"
            placeholder="Enter RC Number"
            :disabled="isLoading"
            max-length="10"
          />
        </a-form>
        <div style="height: 20px"></div>
        <AppButton
          :disabled="!rcNo"
          :loading="isLoading"
          @click="rcValidationHandler"
          >Submit RC No</AppButton
        >
        <br />
        <div>
          <p class="reference">
            Have a Reference Number?
            <nuxt-link to="/user/corporate/reference" class="bold"
              >Continue</nuxt-link
            >
          </p>
        </div>
      </div>
      <div v-if="isRepresentative">
        <h2>Representative Details</h2>
        <div>
          <a-row type="flex" :gutter="6">
            <a-col :span="12">
              <AppInput
                v-model="representativeDetails.firstName"
                label="First Name"
                placeholder="Enter First Name"
                is-text
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="representativeDetails.surname"
                label="Surname"
                placeholder="Enter Surname"
                is-text
              />
            </a-col>
            <a-col :span="24">
              <AppInput
                v-model="representativeDetails.email"
                label="Email Address"
                placeholder="Enter your Email Address"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="representativeDetails.phoneNumber"
                label="Phone Number"
                placeholder="Enter Number"
                is-phone
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="representativeDetails.altPhoneNumber"
                label="Alternate Phone Number"
                placeholder="Enter Number"
                is-phone
              />
            </a-col>
          </a-row>
        </div>
        <div style="height: 20px"></div>
        <AppButton :loading="loading" @click="representativeSubmitHandler"
          >Continue</AppButton
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Row, Col, Form, notification } from 'ant-design-vue'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppInput,
    AppButton,
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
  },
  data() {
    return {
      representativeDetails: {},
      loading: false,
      isRepresentative: false,
      isRC: true,
      rcNo: '',
      isLoading: false,
    }
  },
  methods: {
    async getRequestId(value) {
      try {
        const { response } = await this.$axios.$get(
          `/corporate/getRequestIdByRcNo?rcNo=${value}`
        )
        this.$cookies.set('requestId', response.requestId)
      } catch (err) {
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
    async rcValidationHandler() {
      if (!this.rcNo || this.rcNo === undefined || this.rcNo === '') {
        notification.error({
          message: 'Error',
          description: 'RC field is required to proceed',
          duration: 0,
        })
        return
      }

      this.isLoading = true
      try {
        this.isLoading = true
        const rcNo = {
          rcNo: this.rcNo,
        }
        await this.$axios.$post('/corporate', rcNo)
        await this.submitRcHandler(this.rcNo)
        this.getRequestId(this.rcNo)
        this.isRC = false
        this.isRepresentative = true
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        let error
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(err).forEach((msg) => {
          notification.error({
            message: 'Error',
            description: msg,
            duration: 0,
          })
          error = msg
        })
        // BVN Already Exists
        if (error.includes('already exist')) {
          const { response } = await this.$axios.$get(
            `/corporate/getCurrentWorkFlow?rcNo=${this.rcNo}`
          )
          this.getRequestId(this.rcNo)

          const nextWorkFlow = response.nextWorkFlow
          if (nextWorkFlow === 'COMPANY_DETAILS') {
            this.isRC = false
            this.isRepresentative = true
          }
          if (nextWorkFlow === 'DIRECTOR_DETAILS') {
            this.$router.replace('/user/corporate/director-details')
          }
          if (nextWorkFlow === 'PROPRIETOR_DETAILS') {
            this.$router.replace('/user/corporate/proprietor-details')
          }
          if (nextWorkFlow === 'UPLOADS') {
            this.$router.replace('/user/corporate/upload-document')
          }
        }
      }
    },
    async representativeSubmitHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      try {
        this.loading = true
        await this.submitRepresentativeDetailsHandler(
          this.representativeDetails
        )
        this.$cookies.set('representativeDetails', this.representativeDetails)
        this.$router.replace('/user/corporate/company-details')
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
    validationHandler() {
      if (
        this.representativeDetails.firstName === '' ||
        this.representativeDetails.firstName === undefined
      ) {
        this.errorMessageHandler('First Name')
        return true
      }
      if (
        this.representativeDetails.surname === '' ||
        this.representativeDetails.surname === undefined
      ) {
        this.errorMessageHandler('Surname')
        return true
      }
      if (
        this.representativeDetails.email === '' ||
        this.representativeDetails.email === undefined
      ) {
        this.errorMessageHandler('Email Address')
        return true
      }
      if (
        this.representativeDetails.phoneNumber === '' ||
        this.representativeDetails.phoneNumber === undefined
      ) {
        this.errorMessageHandler('Phone Number')
        return true
      }
      return false
    },
    errorMessageHandler(message) {
      notification.error({
        message: 'Error',
        description: message,
        duration: 0,
      })
    },
    ...mapActions({
      submitRepresentativeDetailsHandler:
        'corporateModule/POST_REPRESENTATIVE_DETAILS',
      submitRcHandler: 'individualModule/GET_RC_INFORMATION',
    }),
  },
}
</script>
<style lang="scss" scoped>
h2 {
  font-family: 'GothamMedium', sans-serif;
  color: #fdb813;
  font-weight: bold;
  line-height: 24px;
  font-size: 18px;
  margin-bottom: 30px;
}
.account-info__block {
  width: 80%;
  padding-top: 30px;
}
hr {
  margin: 2rem 0 !important;
}
@media only screen and (max-width: 991px) {
  .account-info__block {
    width: 100%;
    padding-top: 0;
  }
  hr {
    margin: 1rem 0 !important;
  }
}
@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    .reference {
      font-size: 14px;
    }
  }
  @media only screen and (min-height: 900px) {
    .reference {
      font-size: 16px;
    }
  }
}
</style>
