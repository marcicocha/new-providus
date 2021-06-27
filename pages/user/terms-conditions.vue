<template>
  <div class="parent-container">
    <nuxt-link to="/user/individual/account-type-selection"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></nuxt-link
    >
    <br />
    <AppTitleComponent
      heading="Terms &amp; Conditions"
      style="margin-top: 1rem"
    />
    <br />
    <p v-for="(terms, i) in termsArray" :key="i" style="font-weight: bold">
      {{ terms }}
    </p>
    <div style="height: 20px"></div>
    <AppButton
      @click="$router.replace('/user/individual/account-type-selection')"
      >GO BACK</AppButton
    >
  </div>
</template>
<script>
import { notification } from 'ant-design-vue'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppButton,
  },
  data() {
    return {
      termsArray: [],
    }
  },
  async mounted() {
    try {
      const { response } = await this.$axios.$get('/terms/fullTerms')
      this.termsArray = [...response]
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
}
</script>
