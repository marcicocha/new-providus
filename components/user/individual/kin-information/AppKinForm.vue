<template>
  <div>
    <a-form>
      <a-row type="flex">
        <a-col :span="8">
          <AppSelect
            v-model="kinObject.title"
            label="Title"
            placeholder="Select"
            url="/globalData/data?name=TITLE"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </a-col>
        <a-col :span="16">
          <AppInput
            v-model="kinObject.surname"
            label="Surname"
            placeholder="Type Surname"
            is-text
          />
        </a-col>
      </a-row>
      <a-row type="flex" :gutter="6">
        <a-col :span="12">
          <AppInput
            v-model="kinObject.firstName"
            label="First Name"
            placeholder="First Name"
            is-text
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="kinObject.middleName"
            label="Middle Name"
            placeholder="Middle Name"
            is-text
          />
        </a-col>
        <a-col :span="12">
          <AppSelect
            v-model="kinObject.relationship"
            label="Relationship"
            placeholder="Select your relationship with this person"
            url="/globalData/data?name=RELATIONSHIP"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </a-col>
        <a-col :span="12">
          <AppSelect
            v-model="kinObject.maritalStatus"
            label="Marital Status"
            placeholder="Select Option"
            url="/globalData/data?name=MARITAL_STATUS"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </a-col>
        <a-col :span="12">
          <AppSelect
            v-model="kinObject.gender"
            label="Gender"
            placeholder="Select Option"
            url="/globalData/data?name=GENDER"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="kinObject.dateOfBirth"
            label="Date of Birth"
            placeholder="Select Date"
            input-type="date"
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="kinObject.bvn"
            label="BVN"
            placeholder="Enter Bank Verification Number"
            is-number
            :max-length="11"
            :min-length="11"
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
export default {
  name: 'AppKinForm',
  components: {
    AppSelect,
    AppInput,
    AppButton,
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
  },
  props: {
    kinInfoObject: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      kinObject: {},
    }
  },
  watch: {
    kinInfoObject: {
      handler(newKinInfoObject) {
        if (!newKinInfoObject) {
          return
        }
        this.kinObject = {
          ...newKinInfoObject,
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    kinDetailsHandler() {
      if (this.kinObject.title === undefined || this.kinObject.title === '') {
        this.$emit('errorMessageHandler', 'Title')
        return
      }
      if (
        this.kinObject.surname === undefined ||
        this.kinObject.surname === ''
      ) {
        this.$emit('errorMessageHandler', 'Surname')
        return
      }
      if (
        this.kinObject.firstName === undefined ||
        this.kinObject.firstName === ''
      ) {
        this.$emit('errorMessageHandler', 'First Name')
        return
      }
      // if (
      //   this.kinObject.middleName === undefined ||
      //   this.kinObject.middleName === ''
      // ) {
      //   this.$emit('errorMessageHandler', 'Middle Name')
      //   return
      // }
      if (
        this.kinObject.relationship === undefined ||
        this.kinObject.relationship === ''
      ) {
        this.$emit('errorMessageHandler', 'Relationship')
        return
      }
      if (
        this.kinObject.maritalStatus === undefined ||
        this.kinObject.maritalStatus === ''
      ) {
        this.$emit('errorMessageHandler', 'MaritalStatus')
        return
      }
      if (this.kinObject.gender === undefined || this.kinObject.gender === '') {
        this.$emit('errorMessageHandler', 'Gender')
        return
      }
      if (
        this.kinObject.dateOfBirth === undefined ||
        this.kinObject.dateOfBirth === ''
      ) {
        this.$emit('errorMessageHandler', 'Date of Birth')
        return
      }
      // const year = this.kinObject.dateOfBirth.substring(0, 4)
      const newDate = new Date()
      const currentDate = new Date(this.kinObject.dateOfBirth)
      if (currentDate > newDate) {
        this.$emit('errorMessageHandler', 'Year')
        return
      }
      if (this.kinObject.bvn) {
        if (this.kinObject.bvn.length < 11) {
          this.message =
            'The BVN entered is incomplete. BVN length should be 11'
          notification.error({
            message: 'BVN Validation Message',
            description: this.message,
            duration: 0,
          })
          return
        }
      }

      // const year = this.kinObject.dateOfBirth.getYear()
      this.$emit('kinDetailsHandler', this.kinObject)
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
