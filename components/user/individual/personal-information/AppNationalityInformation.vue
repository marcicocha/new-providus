<template>
  <div>
    <a-form>
      <AppSelect
        v-model="nationalityInfoObject.nationality"
        :remote="false"
        label="Nationality"
        placeholder="Select Nationality"
        :data="['LOCAL', 'FOREIGN']"
        disabled
        required
        @change="changeNationalityHandler"
      />

      <template v-if="nationalityInfoObject.nationality === 'LOCAL'">
        <a-row type="flex" :gutter="6">
          <a-col :span="12">
            <AppSelect
              v-model="nationalityInfoObject.stateOfOrigin"
              label="State of Origin"
              placeholder="Select Option"
              url="/country/states?name=NIGERIA"
              :call-back-func="
                (resp) => ({
                  text: resp,
                  value: resp,
                })
              "
              :required="nationalityInfoObject.nationality === 'LOCAL'"
              disabled
              @change="changeStateHandler"
            />
          </a-col>
          <a-col :span="12">
            <AppSelect
              :key="nationalityInfoObject.stateOfOrigin"
              v-model="nationalityInfoObject.lga"
              label="LGA"
              placeholder="Select Option"
              :url="`/state/lgas?name=${nationalityInfoObject.stateOfOrigin}`"
              :call-back-func="
                (resp) => ({
                  text: resp,
                  value: resp,
                })
              "
              :required="nationalityInfoObject.nationality === 'LOCAL'"
              disabled
            />
          </a-col>
        </a-row>
      </template>
      <template v-else>
        <a-row type="flex" :gutter="6">
          <a-col :span="24">
            <AppInput
              v-model="nationalityInfoObject.residentPermitNo"
              label="Resident Permit No"
              placeholder="Type Number"
              :required="nationalityInfoObject.nationality === 'FOREIGN'"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="nationalityInfoObject.permitIssueDate"
              label="Permit Issue Date"
              placeholder="Select date"
              input-type="date"
              :required="nationalityInfoObject.nationality === 'FOREIGN'"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="nationalityInfoObject.permitExpiryDate"
              label="Permit Expiry Date"
              placeholder="Select date"
              input-type="date"
              :required="nationalityInfoObject.nationality === 'FOREIGN'"
            />
          </a-col>
          <a-col :span="24">
            <AppInput
              v-model="nationalityInfoObject.taxPayerId"
              label="Tax Payer's ID"
              placeholder="Enter ID"
              :required="nationalityInfoObject.nationality === 'FOREIGN'"
            />
          </a-col>
          <a-col :span="12">
            <AppSelect
              v-model="nationalityInfoObject.dualCitizenship"
              :remote="false"
              label="Dual Citizenship?"
              placeholder="Select Option"
              :data="['YES', 'NO']"
              :required="nationalityInfoObject.nationality === 'FOREIGN'"
              @change="dualCitizenshipHandler"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="nationalityInfoObject.altCitizenship"
              label="If Yes, Specify?"
              placeholder="Enter Alt. Citizenship"
              :disabled="nationalityInfoObject.dualCitizenship !== 'YES'"
              is-text
              :required="nationalityInfoObject.dualCitizenship === 'YES'"
            />
          </a-col>
        </a-row>
      </template>
      <AppSelect
        v-model="nationalityInfoObject.religion"
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
    </a-form>
    <AppButton @click="submitNationalityInfoHandler">Continue</AppButton>
  </div>
</template>
<script>
import { Row, Col, Form, notification } from 'ant-design-vue'
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppNationalityInformation',
  components: {
    AppInput,
    AppButton,
    AppSelect,
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
  },
  props: {
    nationalityObject: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      nationalityInfoObject: {},
    }
  },
  watch: {
    nationalityObject: {
      handler(newNationalityObject) {
        if (!newNationalityObject) {
          return
        }
        this.nationalityInfoObject = {
          ...newNationalityObject,
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    submitNationalityInfoHandler() {
      if (
        this.nationalityInfoObject.nationality === '' ||
        this.nationalityInfoObject.nationality === undefined
      ) {
        this.$emit('errorMessageHandler', 'Nationality')
        return
      }
      if (this.nationalityInfoObject.nationality === 'LOCAL') {
        if (
          this.nationalityInfoObject.stateOfOrigin === '' ||
          this.nationalityInfoObject.stateOfOrigin === undefined
        ) {
          this.$emit('errorMessageHandler', 'State of Origin')
          return
        }
        if (
          this.nationalityInfoObject.lga === '' ||
          this.nationalityInfoObject.lga === undefined
        ) {
          this.$emit('errorMessageHandler', 'LGA')
          return
        }
      }
      if (this.nationalityInfoObject.nationality === 'FOREIGN') {
        if (
          this.nationalityInfoObject.residentPermitNo === '' ||
          this.nationalityInfoObject.residentPermitNo === undefined
        ) {
          this.$emit('errorMessageHandler', 'Resident Permit No')
          return
        }
        if (
          this.nationalityInfoObject.permitIssueDate === '' ||
          this.nationalityInfoObject.permitIssueDate === undefined
        ) {
          this.$emit('errorMessageHandler', 'Permit Issue Date')
          return
        }
        if (
          this.nationalityInfoObject.permitExpiryDate === '' ||
          this.nationalityInfoObject.permitExpiryDate === undefined
        ) {
          this.$emit('errorMessageHandler', 'Permit Expiry Date')
          return
        }
        if (
          this.nationalityInfoObject.taxPayerId === '' ||
          this.nationalityInfoObject.taxPayerId === undefined
        ) {
          this.$emit('errorMessageHandler', 'Tax Payer Id')
          return
        }
        if (
          this.nationalityInfoObject.dualCitizenship === '' ||
          this.nationalityInfoObject.dualCitizenship === undefined
        ) {
          this.$emit('errorMessageHandler', 'Dual Citizenship')
          return
        }
        if (this.nationalityInfoObject.dualCitizenship === 'YES') {
          if (
            this.nationalityInfoObject.altCitizenship === '' ||
            this.nationalityInfoObject.altCitizenship === undefined
          ) {
            this.$emit('errorMessageHandler', 'Alt Citizenship')
            return
          }
        }
        const expiryDate = new Date(
          this.nationalityInfoObject.permitExpiryDate
        ).setHours(0, 0, 0, 0)
        const issuedDate = new Date(
          this.nationalityInfoObject.permitIssueDate
        ).setHours(0, 0, 0, 0)
        const currentDate = new Date().setHours(0, 0, 0, 0)
        if (expiryDate <= issuedDate) {
          notification.error({
            message: 'Error',
            description: 'Expiry Date should be greater than Issued date',
            duration: 4000,
          })
          return
        }
        if (issuedDate >= currentDate) {
          notification.error({
            message: 'Error',
            description: 'Issue Date should be less than current Date',
            duration: 4000,
          })
          return
        }
        if (expiryDate <= currentDate) {
          notification.error({
            message: 'Error',
            description: 'ExpiryDate should be greater than current Date',
            duration: 4000,
          })
          return
        }
      }
      if (
        this.nationalityInfoObject.religion === '' ||
        this.nationalityInfoObject.religion === undefined
      ) {
        this.$emit('errorMessageHandler', 'Religion')
        return
      }
      this.$emit('nationalityHandler', this.nationalityInfoObject)
    },
    changeNationalityHandler(value) {
      this.nationalityInfoObject = {
        nationality: value,
      }
    },
    dualCitizenshipHandler(value) {
      this.nationalityInfoObject = {
        ...this.nationalityInfoObject,
        altCitizenship: '',
      }
    },
    changeStateHandler(value) {
      this.nationalityInfoObject = {
        ...this.nationalityInfoObject,
        stateOfOrigin: value,
        lga: '',
      }
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
</style>
