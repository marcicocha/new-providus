<template>
  <div>
    <a-form>
      <div>
        <AppInput
          v-model.trim="kinContactObject.email"
          label="Email Address"
          placeholder="Enter Next of Kin's Email Address"
        />
      </div>
      <a-row type="flex" :gutter="6">
        <a-col :span="12">
          <AppInput
            v-model="kinContactObject.phoneNumber"
            label="Phone Number"
            placeholder="Enter Number"
            is-phone
            max-length="15"
            min-length="7"
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="kinContactObject.altPhoneNumber"
            label="Alternate Phone Number"
            placeholder="Enter Number"
            is-phone
            max-length="15"
            min-length="7"
          />
        </a-col>
        <a-col :span="8">
          <AppInput
            v-model="kinContactObject.houseNo"
            label="House No."
            placeholder="Enter No."
          />
        </a-col>
        <a-col :span="16">
          <AppInput
            v-model="kinContactObject.landMark"
            label="Closest Landmark"
            placeholder="Enter Closest Landmark"
            is-text
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="kinContactObject.streetName"
            label="Street Name"
            placeholder="Enter Street Name"
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="kinContactObject.city"
            label="City/Town"
            placeholder="Enter City or Town"
            is-text
          />
        </a-col>
        <a-col :span="24">
          <AppSelect
            v-model="kinContactObject.residentCountry"
            label="Country"
            placeholder="Select the country of residence of yoour next of Kin"
            url="/country/countryList"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
            @change="changeCountryHandler"
          />
        </a-col>
        <template v-if="kinContactObject.residentCountry === 'NIGERIA'">
          <a-col :span="12">
            <AppSelect
              :key="kinContactObject.residentCountry"
              v-model="kinContactObject.residentState"
              label="State"
              placeholder="Select Option"
              :url="`/country/states?name=${kinContactObject.residentCountry}`"
              :call-back-func="
                (resp) => ({
                  text: resp,
                  value: resp,
                })
              "
              @change="changeStateHandler"
            />
          </a-col>
          <a-col :span="12">
            <AppSelect
              :key="kinContactObject.residentState"
              v-model="kinContactObject.residentLga"
              label="LGA"
              placeholder="Select Option"
              :url="`/state/lgas?name=${kinContactObject.residentState}`"
              :call-back-func="
                (resp) => ({
                  text: resp,
                  value: resp,
                })
              "
            />
          </a-col>
        </template>
      </a-row>
    </a-form>

    <AppButton @click="kinsContactDetailsHandler"
      >Save &amp; Continue</AppButton
    >
  </div>
</template>
<script>
import { Row, Col, Form } from 'ant-design-vue'
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppContactForm',
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
      kinContactObject: {},
    }
  },
  watch: {
    kinInfoObject: {
      handler(newKinInfoObject) {
        if (!newKinInfoObject) {
          return
        }
        this.kinContactObject = {
          ...newKinInfoObject,
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    kinsContactDetailsHandler() {
      // if (
      //   this.kinContactObject.email === undefined ||
      //   this.kinContactObject.email === ''
      // ) {
      //   this.$emit('errorMessageHandler', 'Email')
      //   return
      // }
      // if (
      //   this.kinContactObject.phoneNumber === undefined ||
      //   this.kinContactObject.phoneNumber === ''
      // ) {
      //   this.$emit('errorMessageHandler', 'Phone Number')
      //   return
      // }
      if (
        this.kinContactObject.houseNo === undefined ||
        this.kinContactObject.houseNo === ''
      ) {
        this.$emit('errorMessageHandler', 'House Number')
        return
      }
      if (
        this.kinContactObject.landMark === undefined ||
        this.kinContactObject.landMark === ''
      ) {
        this.$emit('errorMessageHandler', 'Landmark')
        return
      }
      if (
        this.kinContactObject.streetName === undefined ||
        this.kinContactObject.streetName === ''
      ) {
        this.$emit('errorMessageHandler', 'Street Name')
        return
      }
      if (
        this.kinContactObject.city === undefined ||
        this.kinContactObject.city === ''
      ) {
        this.$emit('errorMessageHandler', 'City')
        return
      }
      if (
        this.kinContactObject.residentCountry === undefined ||
        this.kinContactObject.residentCountry === ''
      ) {
        this.$emit('errorMessageHandler', 'Country')
        return
      }
      if (
        this.kinContactObject.residentCountry === 'NIGERIA' &&
        (this.kinContactObject.residentState === undefined ||
          this.kinContactObject.residentState === '')
      ) {
        this.$emit('errorMessageHandler', 'State')
        return
      }
      if (
        this.kinContactObject.residentCountry === 'NIGERIA' &&
        (this.kinContactObject.residentLga === undefined ||
          this.kinContactObject.residentLga === '')
      ) {
        this.$emit('errorMessageHandler', 'LGA')
        return
      }
      this.$emit('kinsContactDetailsHandler', this.kinContactObject)
    },
    changeStateHandler(value) {
      this.kinContactObject = {
        ...this.kinContactObject,
        residentState: value,
        residentLga: undefined,
      }
    },
    changeCountryHandler(value) {
      this.kinContactObject = {
        ...this.kinContactObject,
        residentCountry: value,
        residentState: undefined,
        residentLga: undefined,
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
