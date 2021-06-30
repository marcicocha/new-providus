<template>
  <div>
    <a-form class="wrap">
      <a-row type="flex" :gutter="6">
        <a-col :span="12">
          <AppSelect
            v-model="personalInfoObject.branch"
            label="Branch"
            placeholder="Select Branch"
            url="/branch/allBranchName"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
            required
          />
        </a-col>
        <a-col :span="12">
          <AppSelect
            v-model="personalInfoObject.title"
            label="Title"
            placeholder="Select Title"
            url="/globalData/data?name=TITLE"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
            required
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.maidenName"
            label="Mother's Maiden Name"
            placeholder="Type Name"
            is-text
            required
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.occupation"
            label="Occupation"
            placeholder="Type Occupation"
            is-text
            required
          />
        </a-col>
        <a-col :span="12">
          <AppSelect
            v-model="personalInfoObject.religion"
            label="Religion"
            placeholder="Select Option"
            url="/globalData/data?name=RELIGION"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
            required
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.purposeOfAcc"
            label="Purpose of Account"
            placeholder="Type Purpose of Account"
            is-text
            required
          />
        </a-col>
        <a-col :span="12">
          <p>If US citizen, please provide;</p>
          <AppInput
            v-model="personalInfoObject.taxIdNo"
            label="Tax ID Number"
            placeholder="Enter ID Number"
            max-length="15"
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.employeeIdNo"
            label="Employee ID Number"
            placeholder="Enter ID Number"
            max-length="15"
            style="position: absolute; width: 96.5%; bottom: 0"
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.firstName"
            label="First Name"
            disabled
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.lastName"
            label="Last Surname"
            disabled
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.middleName"
            label="Middle Name"
            disabled
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.dateOfBirth"
            label="Date of Birth"
            disabled
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.phoneNumber"
            label="Phone Number"
            disabled
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.altPhoneNumber"
            label="Alt Phone Number"
            placeholder="Alt Enter Number"
            is-phone
            :max-length="15"
            :min-length="7"
          />
        </a-col>
        <a-col :span="24">
          <AppInput
            v-model.trim="personalInfoObject.email"
            label="Email Address"
            disabled
          />
        </a-col>
        <!-- <a-col :span="12">
          <AppInput
            v-model="personalInfoObject.stateOfOrigin"
            label="State"
            disabled
          />
        </a-col>
        <a-col :span="12">
          <AppInput v-model="personalInfoObject.lga" label="LGA" disabled />
        </a-col> -->
        <a-col :span="24">
          <AppTextArea
            v-model="personalInfoObject.contactAddress"
            label="Contact Address"
            required
          />
        </a-col>
      </a-row>
    </a-form>
    <br />
    <AppButton @click="submitBasicInformationHandler">Continue</AppButton>
  </div>
</template>
<script>
import { notification, Row, Col, Form } from 'ant-design-vue'

import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
import AppTextArea from '@/components/UI/AppTextArea'

export default {
  name: 'AppBasicInformation',
  components: {
    AppInput,
    AppButton,
    AppSelect,
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
    AppTextArea,
  },

  data() {
    return {
      personalInfoObject: {},
      message: '',
      requestId: '',
    }
  },
  async mounted() {
    const requestId = this.$cookies.get('requestId')
    this.requestId = requestId
    const { response } = await this.$axios.$get(
      `/individual/requestId?requestId=${requestId}`
    )
    const {
      title,
      firstName,
      middleName,
      lastName,
      maritalStatus,
      gender,
      dateOfBirth,
      email,
      phoneNumber,
      // lga,
      // stateOfOrigin,
      // contactAddress,
    } = response
    this.personalInfoObject = {
      ...this.personalInfoObject,
      title,
      firstName,
      middleName,
      lastName,
      maritalStatus,
      gender,
      dateOfBirth,
      email,
      phoneNumber,
      // lga,
      // stateOfOrigin,
      // contactAddress,
    }
  },
  destroyed() {
    notification.destroy()
  },
  methods: {
    errorMessageHandler(message) {
      this.message =
        message === 'Year' ? `Must be 18 and Above` : `${message} is compulsory`
      notification.error({
        message: 'Error',
        description: this.message,
        duration: 4000,
      })
    },
    submitBasicInformationHandler() {
      if (
        this.personalInfoObject.branch === '' ||
        this.personalInfoObject.branch === undefined
      ) {
        this.errorMessageHandler('Branch')
        return
      }
      if (
        !this.personalInfoObject.title ||
        this.personalInfoObject.title === '' ||
        this.personalInfoObject.title === undefined
      ) {
        this.errorMessageHandler('Title')
        return
      }
      if (
        this.personalInfoObject.maidenName === '' ||
        this.personalInfoObject.maidenName === undefined
      ) {
        this.errorMessageHandler('Maiden Name')
        return
      }

      if (
        this.personalInfoObject.occupation === '' ||
        this.personalInfoObject.occupation === undefined
      ) {
        this.errorMessageHandler('Occupation')
        return
      }
      if (
        this.personalInfoObject.religion === '' ||
        this.personalInfoObject.religion === undefined
      ) {
        this.errorMessageHandler('religion')
        return
      }
      if (
        this.personalInfoObject.purposeOfAcc === '' ||
        this.personalInfoObject.purposeOfAcc === undefined
      ) {
        this.errorMessageHandler('Purpose Of Account')
        return
      }
      if (
        this.personalInfoObject.contactAddress === '' ||
        this.personalInfoObject.contactAddress === undefined
      ) {
        this.errorMessageHandler('Contact Address')
        return
      }
      this.basicInfoHandler()
    },

    selectStateHandler(value) {
      this.personalInfoObject = {
        ...this.personalInfoObject,
        residentState: value,
        residentLga: undefined,
      }
    },
    async basicInfoHandler() {
      const personalInfoObject = {
        ...this.personalInfoObject,
        requestId: this.requestId,
      }
      try {
        await this.$axios.$put('/individual/basicInfo', personalInfoObject)

        this.$router.replace('/user/individual/kin-information')
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
<style lang="scss" scoped>
p {
  font-size: 11px !important;
}
</style>
