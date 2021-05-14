<template>
  <div>
    <a-form>
      <div>
        <AppInput
          v-model.trim="contactDetails.email"
          label="Email Address"
          placeholder="Enter your Email Address"
        />
      </div>

      <a-row type="flex" :gutter="6">
        <a-col :span="12">
          <AppInput
            v-model="contactDetails.phoneNumber"
            label="Phone Number"
            placeholder="Enter Number"
            is-phone
            :max-length="15"
            :min-length="7"
          />
        </a-col>
        <a-col :span="12">
          <AppInput
            v-model="contactDetails.altPhoneNumber"
            label="Alt. Phone Number"
            placeholder="Enter Number"
            is-phone
            max-length="15"
            min-length="7"
          />
        </a-col>
        <a-col :span="24">
          <AppInput
            v-model="contactDetails.landmark"
            label="Closest Landmark"
            placeholder="Enter Closest Landmark"
            is-text
          />
        </a-col>
        <a-col :span="24">
          <AppInput
            v-model="contactDetails.residentialAddress"
            label="Residential Address"
            placeholder="Enter Residential Address"
          />
        </a-col>
        <a-col :span="12">
          <AppSelect
            v-model="contactDetails.residentState"
            label="State"
            placeholder="Select Option"
            url="/country/states?name=NIGERIA"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
            @change="selectStateHandler"
          />
        </a-col>
        <a-col :span="12">
          <AppSelect
            :key="contactDetails.residentState"
            v-model="contactDetails.residentLga"
            label="LGA"
            placeholder="Select Option"
            :url="`/state/lgas?name=${contactDetails.residentState}`"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </a-col>
        <a-col>
          <AppCheckbox
            v-model="contactDetails.saveAddress"
            label="Use address for kin's address?"
          />
        </a-col>
      </a-row>
    </a-form>

    <AppButton @click="contactDetailsHandler">Save &amp; Continue</AppButton>
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
import { Row, Col, Form, notification } from 'ant-design-vue'
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
import AppCheckbox from '@/components/UI/AppCheckbox.vue'
// import AppSelect from '@/components/UI/AppSelect'

export default {
  name: 'AppContactDetails',
  components: {
    AppSelect,
    AppInput,
    AppButton,
    AppCheckbox,
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
    // AppSelect,
  },
  data() {
    return {
      contactDetails: {},
    }
  },
  mounted() {
    const contactObject = this.$cookies.get('contactDetails')
    this.contactDetails = {
      ...this.contactDetails,
      ...contactObject,
    }
  },
  methods: {
    async contactDetailsHandler() {
      if (
        this.contactDetails.email === '' ||
        this.contactDetails.email === undefined
      ) {
        this.errorHandler('Email')
        return
      }
      if (
        this.contactDetails.phoneNumber === '' ||
        this.contactDetails.phoneNumber === undefined
      ) {
        this.errorHandler('Phone Number')
        return
      }
      if (
        this.contactDetails.landmark === '' ||
        this.contactDetails.landmark === undefined
      ) {
        this.errorHandler('Landmark')
        return
      }
      if (
        this.contactDetails.residentialAddress === '' ||
        this.contactDetails.residentialAddress === undefined
      ) {
        this.errorHandler('Resident Address')
        return
      }
      if (
        this.contactDetails.residentState === '' ||
        this.contactDetails.residentState === undefined
      ) {
        this.errorHandler('Resident State')
        return
      }
      if (
        this.contactDetails.residentLga === '' ||
        this.contactDetails.residentLga === undefined
      ) {
        this.errorHandler('Resident Lga')
        return
      }
      const requestId = this.$cookies.get('requestId')
      const contactDetails = {
        ...this.contactDetails,
        requestId,
      }
      try {
        await this.$axios.$put('/individual/contactDetails', contactDetails)
        // await this.submitContactHandler(contactDetails)
        this.$cookies.set('contactDetails', contactDetails)
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
    errorHandler(err) {
      notification.error({
        message: 'Error',
        description: err,
        duration: 4000,
      })
    },
    selectStateHandler(value) {
      this.contactDetails = {
        ...this.contactDetails,
        residentState: value,
        residentLga: undefined,
      }
    },
    // ...mapActions({
    //   submitContactHandler: 'individualModule/POST_CONTACT_INFORMATION',
    // }),
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
