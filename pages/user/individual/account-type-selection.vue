<template>
  <div class="parent-container">
    <a class="back-button" @click="backButtonHandler"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></a
    >
    <AppTitleComponent
      heading="Open an Account"
      description="Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here."
    />
    <div class="account-info__block">
      <div><a-divider /></div>
      <div v-if="!isBvnDetails">
        <h2>Select Account Type</h2>

        <a-form>
          <a-radio-group v-model="accountInformation.accountType" size="large">
            <a-radio :style="radioStyle" value="SAVINGS"> Savings </a-radio>
            <a-radio :style="radioStyle" value="CURRENT"> Current </a-radio>
          </a-radio-group>
          <AppInput
            v-model="accountInformation.BVN"
            label="BVN"
            placeholder="Enter Bank Verification Number"
            :disabled="isLoading"
            is-number
            :max-length="11"
            :min-length="11"
            required
          />
          <div style="height: 20px"></div>
          <AppButton
            type="primary"
            :loading="isLoading"
            @click="bvnValidationHandler"
            >Submit</AppButton
          >
          <!-- :disabled="!accountInformation.BVN" -->

          <p :class="{ notification: true, error_message: message }">
            <span style="display: block">{{ message }}</span>
            <span>Dial *565*0# to check your Bank Verification Number</span>
          </p>
        </a-form>
      </div>
      <div v-else>
        <a-row type="flex" :gutter="6">
          <a-col :span="12" class="bvn_image">
            <img
              :src="getImgUrl(bvnDetails.base64Image)"
              :alt="bvnDetails.firstName"
            />
          </a-col>
          <a-col :span="12">
            <div class="bvn-child__block">
              <small>BVN</small>
              <p style="font-weight: bolder">{{ bvnDetails.bvn }}</p>
            </div>
            <div class="bvn-child__block">
              <small>Surname and First Name</small>
              <p>{{ `${bvnDetails.lastName} ${bvnDetails.firstName}` }}</p>
            </div>
            <a-row type="flex" :gutter="6">
              <a-col :span="12">
                <div class="bvn-child__block">
                  <small>Phone Number</small>
                  <p>{{ bvnDetails.phoneNumber1 }}</p>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="bvn-child__block">
                  <small>Middle Name</small>
                  <p>{{ bvnDetails.middleName }}</p>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <div style="height: 30px"></div>
        <a-row type="flex" :gutter="6">
          <a-col :span="12">
            <AppButton class="secondary-btn" @click="returnHandler"
              >Return</AppButton
            >
          </a-col>
          <a-col :span="12">
            <AppButton @click="nextHandler">Continue</AppButton>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
import { notification, Divider, Form, Radio, Row, Col } from 'ant-design-vue'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
// import AppCard from '@/components/user/individual/account-type-selection/AppCard'
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    // AppCard,
    AppInput,
    AppButton,
    'a-divider': Divider,
    'a-form': Form,
    'a-radio': Radio,
    'a-row': Row,
    'a-col': Col,
  },
  data() {
    return {
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        width: '50%',
      },
      isLoading: false,
      accountInformation: {
        accountType: 'SAVINGS',
      },
      message: '',
      baseUrl: process.env.BASE_URL,
      isBvnDetails: false,
      bvnDetails: {},
    }
  },
  destroyed() {
    notification.destroy()
  },
  methods: {
    returnHandler() {
      this.isBvnDetails = false
      this.bvnDetails = {}
      this.accountInformation = {
        ...this.accountInformation,
        bvn: '',
      }
    },
    getImgUrl(pic) {
      return `data:image/png;base64,${pic}`
    },
    nextHandler() {
      this.$router.replace('/user/individual/personal-information')
    },
    async getRequestId(value) {
      try {
        const { response } = await this.$axios.$get(
          `/individual/getRequestIdByBvn?bvn=${value}`
        )
        this.$cookies.set('requestId', response.requestId)
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
    backButtonHandler() {},
    async bvnValidationHandler() {
      if (
        !this.accountInformation ||
        this.accountInformation.BVN === undefined ||
        this.accountInformation.BVN === ''
      ) {
        this.message = 'BVN field is required to proceed,'
        notification.error({
          message: 'BVN Validation Message',
          description: this.message,
          duration: 4000,
        })
        return
      }

      if (this.accountInformation.BVN.length !== 11) {
        this.message = 'BVN length should be 11'
        notification.error({
          message: 'BVN Validation Message',
          description: this.message,
          duration: 4000,
        })
        return
      }

      try {
        this.message = ''
        this.isLoading = true
        const { response } = await this.$axios.$post(
          '/individual',
          this.accountInformation
        )
        await this.getRequestId(this.accountInformation.BVN)
        this.bvnDetails = { ...response }
        this.isBvnDetails = true
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        let error
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(err).forEach((msg) => {
          notification.error({
            message: 'Error',
            description: msg,
            duration: 4000,
          })
          error = msg
        })
        // BVN Already Exists
        if (error.includes('already exist')) {
          const { response } = await this.$axios.$get(
            `/individual/getCurrentWorkFlow?bvn=${this.accountInformation.BVN}`
          )
          this.getRequestId(this.accountInformation.BVN)

          const nextWorkFlow = response.nextWorkFlow
          if (nextWorkFlow === 'BASIC_INFO') {
            this.$router.replace('/user/individual/personal-information')
          }
          if (nextWorkFlow === 'KIN_DETAILS') {
            this.$router.replace('/user/individual/kin-information')
          }
          if (nextWorkFlow === 'DOC_UPLOAD') {
            this.$router.replace('/user/individual/upload')
          }
          if (nextWorkFlow === 'REFERENCE_UPLOAD') {
            this.$router.replace('/user/individual/upload-document')
          }
          if (nextWorkFlow === 'LIVENESS_CHECK') {
            this.$router.replace('/user/individual/liveness-check')
          }
          if (nextWorkFlow === 'COMPLETED') {
            this.$router.replace('/user/individual/weldone')
          }
          return
        }

        this.fetching = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.opaque,
.opaque:hover {
  opacity: 0.4 !important;
  // border: none !important;
  border: 1.5px solid #eaeaea;
}
.back-button {
  span {
    margin-left: 5px;
  }
}
.account-info__block {
  width: 100%;
  padding-top: 0;
}
.bvn-child__block {
  // padding-bottom: 15px;
  small {
    font-size: 12px;
  }
  p {
    font-family: 'GothamLight', sans-serif;
    font-style: normal;
    font-weight: 600;
  }
}
.bvn_image {
  img {
    height: 100%;
    width: 100%;
  }
}
.parent-container {
  width: 90%;
  position: relative;
}
.notification {
  // position: absolute;
  // bottom: 10%;
  font-size: 15px;
  padding-top: 2rem;
}
.error_message {
  color: #cc4c4c;
}
@media only screen and (min-width: 1025px) {
  .account-info__block {
    width: 95%;
    padding-top: 0;
  }
  .parent-container {
    width: 90%;
    position: relative;
  }
}
@media only screen and (min-width: 1536px) {
  .account-info__block {
    width: 80%;
    //padding-top: 30px;
    padding-top: 10px;
  }
  .parent-container {
    width: 90%;
    position: relative;
  }
  .back-button {
    font-size: 1em;
  }
  @media only screen and (min-height: 730px) {
    hr {
      margin: 1rem 0 !important;
    }
    .back-button {
      font-size: 13px !important;
    }
    .account-info__block {
      padding-top: 0;
      width: 85%;
    }
    .notification {
      // bottom: 0;
      font-size: 13px;
    }
    h2 {
      font-size: 16px;
    }
  }
  @media only screen and (min-height: 900px) {
    hr {
      margin: 2rem 0 !important;
    }
    .back-button {
      font-size: 1em;
    }
    .account-info__block {
      padding-top: 10px;
      width: 80%;
    }
    .notification {
      // position: absolute;
      // bottom: 5%;
      font-size: 15px;
    }
    h2 {
      font-size: 18px;
    }
  }
}
@media only screen and (max-width: 991px) {
  .account-info__block {
    width: 100%;
    padding-top: 0;
  }
  .parent-container {
    width: 100%;
  }
  .notification {
    font-size: 14px;
  }
  h2 {
    font-size: 16px;
  }
  .bvn-child__block {
    // padding-bottom: 15px;
    small {
      font-size: 11px;
    }
    p {
      font-size: 14px;
    }
  }
}
@media only screen and (max-width: 767px) {
  h2 {
    line-height: 1px;
    font-size: 15px;
    margin-bottom: 20px;
  }
  .notification {
    // position: absolute;
    // bottom: 2%;
    font-size: 12px;
  }
  .back-button {
    font-size: 13px;
  }
}
</style>
