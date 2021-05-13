<template>
  <div>
    <a-form class="wrap">
      <a-row type="flex">
        <a-col :span="8">
          <AppSelect
            v-model="basicInformationObject.title"
            label="Title"
            placeholder="Select"
            :data="['Miss', 'Mrs', 'Mister']"
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
            v-model="basicInformationObject.surname"
            label="Surname"
            placeholder="Type Surname"
            is-text
            :max-length="30"
            disabled
          />
        </a-col>
      </a-row>
      <a-row type="flex" :gutter="6">
        <a-col :span="12">
          <AppInput
            v-model="basicInformationObject.firstName"
            label="First Name"
            placeholder="First Name"
            is-text
            :max-length="30"
            disabled
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="basicInformationObject.middleName"
            label="Middle Name"
            placeholder="Middle Name"
            is-text
            :max-length="30"
          />
        </a-col>
        <a-col :span="12">
          <AppSelect
            v-model="basicInformationObject.maritalStatus"
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
            v-model="basicInformationObject.gender"
            label="Gender"
            placeholder="Select Option"
            url="/globalData/data?name=GENDER"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
            disabled
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="basicInformationObject.maidenName"
            label="Mother's Maiden Name"
            placeholder="Type Name"
            is-text
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="basicInformationObject.dateOfBirth"
            label="Date of Birth"
            placeholder="Select Date"
            input-type="date"
            disabled
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="basicInformationObject.occupation"
            label="Occupation"
            placeholder="Type Occupation"
            is-text
          />
        </a-col>
        <a-col :span="12">
          <AppSelect
            v-model="basicInformationObject.currency"
            label="Currency Type"
            placeholder="Select Currency"
            url="/globalData/data?name=CURRENCY"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
            disabled
          />
        </a-col>
      </a-row>
    </a-form>
    <br />
    <AppButton @click="submitBasicInformationHandler">Continue</AppButton>
  </div>
</template>
<script>
import { Row, Col, Form } from 'ant-design-vue'
import AppInput from '@/components/UI/AppInput'
// import AppSelect from '@/components/UI/AppSelect'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'AppBasicInformation',
  components: {
    AppInput,
    AppButton,
    // AppSelect,
    AppSelect,
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
  },
  props: {
    personalInfoObject: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      basicInformationObject: {
        ...this.personalInfoObject,
      },
    }
  },
  methods: {
    submitBasicInformationHandler() {
      if (
        !this.basicInformationObject.title ||
        this.basicInformationObject.title === '' ||
        this.basicInformationObject.title === undefined
      ) {
        this.$emit('errorMessageHandler', 'Title')
        return
      }
      if (
        this.basicInformationObject.surname === '' ||
        this.basicInformationObject.surname === undefined
      ) {
        this.$emit('errorMessageHandler', 'Surname')
        return
      }
      if (
        this.basicInformationObject.firstName === '' ||
        this.basicInformationObject.firstName === undefined
      ) {
        this.$emit('errorMessageHandler', 'First Name')
        return
      }
      // if (
      //   this.basicInformationObject.middleName === '' ||
      //   this.basicInformationObject.middleName === undefined
      // ) {
      //   this.$emit('errorMessageHandler', 'Middle Name')
      //   return
      // }
      if (
        this.basicInformationObject.maritalStatus === '' ||
        this.basicInformationObject.maritalStatus === undefined
      ) {
        this.$emit('errorMessageHandler', 'Marital Status')
        return
      }
      if (
        this.basicInformationObject.gender === '' ||
        this.basicInformationObject.gender === undefined
      ) {
        this.$emit('errorMessageHandler', 'Gender')
        return
      }
      if (
        this.basicInformationObject.maidenName === '' ||
        this.basicInformationObject.maidenName === undefined
      ) {
        this.$emit('errorMessageHandler', 'Maiden Name')
        return
      }
      if (
        this.basicInformationObject.dateOfBirth === '' ||
        this.basicInformationObject.dateOfBirth === undefined
      ) {
        this.$emit('errorMessageHandler', 'Date of Birth')
        return
      }
      if (
        this.basicInformationObject.occupation === '' ||
        this.basicInformationObject.occupation === undefined
      ) {
        this.$emit('errorMessageHandler', 'Occupation')
        return
      }
      if (
        this.basicInformationObject.currency === '' ||
        this.basicInformationObject.currency === undefined
      ) {
        this.$emit('errorMessageHandler', 'Currency')
        return
      }
      const year = this.basicInformationObject.dateOfBirth.substring(0, 4)
      const newDate = new Date()
      const currentYear = newDate.getFullYear()
      if (currentYear - year < 18) {
        this.$emit('errorMessageHandler', 'Year')
        return
      }
      this.$emit('basicInfoHandler', this.basicInformationObject)
    },
  },
}
</script>

<style scoped>
.surname {
  /* width: 66.9%;
  padding-left: 0 !important;
  border-left-color: transparent !important; */
  margin-left: -1px !important;
}
.firstname {
  padding-right: 0 !important;
}
.small-left-padding {
  padding-left: 5px !important;
}
.small-right-padding {
  padding-right: 5px !important;
}
</style>
