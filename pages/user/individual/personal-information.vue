<template>
  <div>
    <a v-if="!isBasicInformation" class="back-button" @click="backButtonHandler"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></a
    >
    <AppTitleComponent heading="Personal Information" />
    <div class="wrap">
      <AppBasicInformation
        v-if="isBasicInformation"
        :personal-info-object="personalInfoObject"
        @basicInfoHandler="basicInfoHandler"
        @errorMessageHandler="errorMessageHandler"
      />
      <AppNationalityInformation
        v-if="isNationalityInfo"
        :nationality-object="nationalityObject"
        @nationalityHandler="nationalityHandler"
        @errorMessageHandler="errorMessageHandler"
      />
      <AppIdentificationNumberInformation
        v-if="isIdentificationInfo"
        :personal-info-object="personalInfoObject"
        @identificationHandler="identificationHandler"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { notification } from 'ant-design-vue'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppBasicInformation from '@/components/user/individual/personal-information/AppBasicInformation.vue'
import AppNationalityInformation from '@/components/user/individual/personal-information/AppNationalityInformation.vue'
import AppIdentificationNumberInformation from '@/components/user/individual/personal-information/AppIdentificationNumberInformation.vue'
export default {
  components: {
    AppTitleComponent,
    AppBasicInformation,
    AppNationalityInformation,
    AppIdentificationNumberInformation,
  },
  data() {
    return {
      isBasicInformation: true,
      isNationalityInfo: false,
      isIdentificationInfo: false,
      personalInfoObject: {
        currency: 'NGN',
      },
      nationalityObject: {},
      message: '',
    }
  },
  mounted() {
    const {
      title,
      firstName,
      middleName,
      surname,
      maritalStatus,
      gender,
      dateOfBirth,
      foreignNationality,
      stateOfOrigin,
      lga,
    } = this.$cookies.get('personalDetails')
    this.personalInfoObject = {
      ...this.personalInfoObject,
      title,
      firstName,
      middleName,
      surname,
      maritalStatus,
      gender,
      dateOfBirth,
    }
    this.nationalityObject = {
      ...this.nationalityObject,
      nationality: foreignNationality === 'NO' ? 'LOCAL' : 'FOREIGN',
      stateOfOrigin: foreignNationality === 'NO' ? stateOfOrigin : undefined,
      lga: foreignNationality === 'NO' ? lga : undefined,
    }
  },
  methods: {
    nationalityHandler(obj) {
      this.isNationalityInfo = false
      this.isIdentificationInfo = true
      this.nationalityObject = {
        ...this.nationalityObject,
        ...obj,
      }
    },
    backButtonHandler() {
      if (this.isNationalityInfo) {
        this.isNationalityInfo = false
        this.isBasicInformation = true
        return
      }
      if (this.isIdentificationInfo) {
        this.isIdentificationInfo = false
        this.isBasicInformation = true
      }
    },
    basicInfoHandler(obj) {
      this.isBasicInformation = false
      this.isNationalityInfo = true
      this.personalInfoObject = {
        ...this.personalInfoObject,
        ...obj,
      }
    },
    errorMessageHandler(message) {
      this.message =
        message === 'Year' ? `Must be 18 and Above` : `${message} is compulsory`
      notification.error({
        message: 'Error',
        description: this.message,
        duration: 0,
      })
    },
    async identificationHandler(obj) {
      const requestId = this.$cookies.get('requestId')
      const personalInfoObject = {
        ...obj,
        ...this.personalInfoObject,
        ...this.nationalityObject,
        requestId,
        foreignNationality:
          this.nationalityObject.nationality === 'FOREIGN' ? 'YES' : 'NO',
      }
      try {
        await this.$axios.$put('/individual/personalInfo', personalInfoObject)
        await this.submitPersonalInfoHandler(personalInfoObject)
        const { response } = await this.$axios.$get(
          `/individual/contact/requestId?requestId=${requestId}`
        )
        this.$cookies.set('contactDetails', response)
        this.$router.replace('/user/individual/contact-information')
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
    ...mapActions({
      submitPersonalInfoHandler: 'individualModule/POST_PERSONAL_INFORMATION',
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
