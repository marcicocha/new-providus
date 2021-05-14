<template>
  <div>
    <a v-if="!isBasicDetails" class="back-button" @click="backButtonHandler"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></a
    >
    <AppTitleComponent :heading="heading" />

    <AppKinForm
      v-if="isBasicDetails"
      :kin-info-object="kinInfoObject"
      @kinDetailsHandler="kinDetailsHandler"
      @errorMessageHandler="errorMessageHandler"
    />
    <AppKinContactForm
      v-if="!isBasicDetails"
      :kin-info-object="kinInfoObject"
      @kinsContactDetailsHandler="kinsContactDetailsHandler"
      @errorMessageHandler="errorMessageHandler"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { notification } from 'ant-design-vue'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppKinForm from '@/components/user/individual/kin-information/AppKinForm'
import AppKinContactForm from '@/components/user/individual/kin-information/AppKinContactForm'
export default {
  components: {
    AppTitleComponent,
    AppKinForm,
    AppKinContactForm,
  },
  data() {
    return {
      kinInfoObject: {},
      isBasicDetails: true,
      heading: 'Next of Kin information',
      message: '',
    }
  },
  mounted() {
    const {
      // houseNo,
      landmark,
      // streetName,
      residentCity,
      saveAddress,
      // residentState,
      // residentLga,
    } = this.$cookies.get('contactDetails')
    if (saveAddress) {
      this.kinInfoObject = {
        ...this.kinInfoObject,
        // houseNo,
        landMark: landmark,
        // streetName,
        city: residentCity,
        // residentState,
        // residentLga,
      }
    }
  },
  methods: {
    kinDetailsHandler(obj) {
      this.heading = 'Next of Kin Contact information'
      this.isBasicDetails = false
      this.kinInfoObject = {
        ...this.kinInfoObject,
        ...obj,
      }
    },
    backButtonHandler() {
      // if (this.isBasicDetails) {
      //   this.$router.replace('/user/individual/contact-information')
      //   return
      // }
      if (!this.isBasicDetails) {
        this.isBasicDetails = true
      }
    },
    async kinsContactDetailsHandler() {
      try {
        const response = this.$cookies.get('requestId')
        const kinInfoObject = {
          ...this.kinInfoObject,
          requestId: response,
        }
        await this.$axios.$put('/individual/kinDetails', kinInfoObject)
        this.$cookies.remove('contactDetails')
        this.$router.replace('/user/individual/upload-valid-id')
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
    errorMessageHandler(message) {
      this.message =
        message === 'Year'
          ? `Must not be future date`
          : `${message} is compulsory`
      notification.error({
        message: 'Error',
        description: this.message,
        duration: 0,
      })
    },
    ...mapActions({
      submitKinInfoHandler: 'individualModule/POST_KINS_INFORMATION',
    }),
  },
}
</script>
<style lang="scss" scoped>
.back-button {
  span {
    margin-left: 5px;
  }
}
@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    .back-button {
      font-size: 13px !important;
    }
  }
  @media only screen and (min-height: 900px) {
    .back-button {
      font-size: 1em;
    }
  }
}
</style>
