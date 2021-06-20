<template>
  <div>
    <!-- <a class="back-button" @click="backButtonHandler"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></a
    >
    <br /> -->
    <AppTitleComponent heading="Basic Information" />
    <div class="wrap">
      <AppBasicInformation />
    </div>
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppBasicInformation from '@/components/user/individual/personal-information/AppBasicInformation.vue'

export default {
  components: {
    AppTitleComponent,
    AppBasicInformation,
  },

  // mounted() {
  //   const {
  //     title,
  //     firstName,
  //     middleName,
  //     surname,
  //     maritalStatus,
  //     gender,
  //     dateOfBirth,
  //     foreignNationality,
  //     stateOfOrigin,
  //     lga,
  //   } = this.$cookies.get('personalDetails')
  //   this.personalInfoObject = {
  //     ...this.personalInfoObject,
  //     title,
  //     firstName,
  //     middleName,
  //     surname,
  //     maritalStatus,
  //     gender,
  //     dateOfBirth,
  //   }
  //   this.nationalityObject = {
  //     ...this.nationalityObject,
  //     nationality: foreignNationality === 'NO' ? 'LOCAL' : 'FOREIGN',
  //     stateOfOrigin: foreignNationality === 'NO' ? stateOfOrigin : undefined,
  //     lga: foreignNationality === 'NO' ? lga : undefined,
  //   }
  // },

  methods: {
    backButtonHandler() {
      console.log('CLICKED')
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
