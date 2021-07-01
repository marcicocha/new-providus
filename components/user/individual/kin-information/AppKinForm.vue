<template>
  <div>
    <a-form>
      <a-row type="flex" :gutter="6">
        <a-col :span="12">
          <AppSelect
            v-model="kinInfoObject.title"
            label="Title"
            placeholder="Select"
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
            v-model="kinInfoObject.surname"
            label="Surname"
            placeholder="Type Surname"
            is-text
            required
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="kinInfoObject.firstName"
            label="First Name"
            placeholder="First Name"
            is-text
            required
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="kinInfoObject.middleName"
            label="Middle Name"
            placeholder="Middle Name"
            is-text
          />
        </a-col>
        <a-col :span="12">
          <AppSelect
            v-model="kinInfoObject.relationship"
            label="Relationship"
            placeholder="Select your relationship with this person"
            url="/globalData/data?name=RELATIONSHIP"
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
            v-model="kinInfoObject.phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            is-number
            :text-allowed="false"
            :space-allowed="false"
            :char-allowed="false"
          />
        </a-col>
        <a-col :span="24">
          <AppTextArea
            v-model="kinInfoObject.contact"
            label="Contact Address"
            placeholder="Type Contact Address"
            required
          />
        </a-col>
      </a-row>
    </a-form>
    <br />
    <AppButton @click="kinDetailsHandler">Continue</AppButton>
  </div>
</template>
<script>
import { Row, Col, Form, notification } from 'ant-design-vue'
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
import AppTextArea from '@/components/UI/AppTextArea'

export default {
  name: 'AppKinForm',
  components: {
    AppSelect,
    AppInput,
    AppButton,
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
    AppTextArea,
  },

  data() {
    return {
      kinInfoObject: {},
    }
  },
  destroyed() {
    notification.destroy()
  },
  methods: {
    kinDetailsHandler() {
      if (
        this.kinInfoObject.title === undefined ||
        this.kinInfoObject.title === ''
      ) {
        this.errorMessageHandler('Title')
        return
      }
      if (
        this.kinInfoObject.surname === undefined ||
        this.kinInfoObject.surname === ''
      ) {
        this.errorMessageHandler('Surname')
        return
      }
      if (
        this.kinInfoObject.firstName === undefined ||
        this.kinInfoObject.firstName === ''
      ) {
        this.errorMessageHandler('First Name')
        return
      }
      if (
        this.kinInfoObject.relationship === undefined ||
        this.kinInfoObject.relationship === ''
      ) {
        this.errorMessageHandler('Relationship')
        return
      }
      if (
        this.kinInfoObject.contact === undefined ||
        this.kinInfoObject.contact === ''
      ) {
        this.errorMessageHandler('Contact Address')
        return
      }
      this.kinHandler()
    },
    async kinHandler() {
      try {
        const response = this.$cookies.get('requestId')
        const kinInfoObject = {
          ...this.kinInfoObject,
          requestId: response,
        }
        await this.$axios.$put('/individual/kinDetails', kinInfoObject)
        this.$router.replace('/user/individual/capture-selfie')
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
    errorMessageHandler(message) {
      notification.error({
        message: 'Error',
        description: `${message} is compulsory`,
        duration: 4000,
      })
    },
  },
}
</script>
<style scoped>
.small-left-padding {
  padding-left: 5px !important;
}
.small-right-padding {
  padding-right: 5px !important;
}
.surname {
  margin-left: -1px !important;
}
</style>
