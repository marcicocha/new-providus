<template>
  <div>
    <!-- <a class="back-button" @click="backButtonHandler"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></a
    > -->
    <AppTitleComponent heading="Next of Kin information" />

    <AppKinForm />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppKinForm from '@/components/user/individual/kin-information/AppKinForm'
export default {
  components: {
    AppTitleComponent,
    AppKinForm,
  },
  data() {
    return {
      kinInfoObject: {},
      isBasicDetails: true,

      message: '',
    }
  },
  // mounted() {
  //   const {
  //     // houseNo,
  //     landmark,
  //     // streetName,
  //     residentCity,
  //     saveAddress,
  //     // residentState,
  //     // residentLga,
  //   } = this.$cookies.get('contactDetails')
  //   if (saveAddress) {
  //     this.kinInfoObject = {
  //       ...this.kinInfoObject,
  //       // houseNo,
  //       landMark: landmark,
  //       // streetName,
  //       city: residentCity,
  //       // residentState,
  //       // residentLga,
  //     }
  //   }
  // },

  methods: {
    backButtonHandler() {
      if (!this.isBasicDetails) {
        this.isBasicDetails = true
      }
    },
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
