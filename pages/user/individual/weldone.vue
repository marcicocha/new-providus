<template>
  <div class="child-container">
    <div style="margin-top: -15px; width: 70%">
      <div>
        <img src="@/assets/images/fire-cracker.svg" />
      </div>

      <h1 v-if="typeof accountNo === 'number'">Congratulations</h1>
      <h1 v-else>Session Completed</h1>

      <p v-if="typeof accountNo === 'number'">
        Please Check your Email and SMS for your new Account Details and Next
        Steps
      </p>
      <p v-else>
        {{ accountNo }}
      </p>

      <div v-if="typeof accountNo === 'number'">
        <hr />
        <div>
          <span> Account Number</span>
          <p>{{ accountNo }}</p>
        </div>
      </div>
      <AppButton @click="saveHandler">Go back to Website</AppButton>
      <br />
      <div
        v-if="accountType === 'CURRENT'"
        style="margin-top: 20px; font-size: 14px"
      >
        <nuxt-link to="/user/individual/upload-document"
          ><span>Click here for Reference Upload</span></nuxt-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppButton,
  },
  data() {
    return {
      name: 'David',
      accountType: '',
    }
  },
  computed: {
    ...mapState({
      accountNo: (state) => state.accountNumber,
    }),
  },
  async mounted() {
    const requestId = this.$cookies.get('requestId')
    this.requestId = requestId
    const { response } = await this.$axios.$get(
      `/individual/requestId?requestId=${requestId}`
    )
    const { accountType } = response
    this.accountType = accountType
  },
  methods: {
    saveHandler() {
      window.location = '/'
    },
  },
}
</script>
<style lang="scss" scoped>
.child-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 150%;
  margin-bottom: 15px;
  color: #2e434e;
  margin-top: 30px;
}
p {
  font-family: 'GothamThin', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  color: #2e434e;
  letter-spacing: 1px;
  margin-bottom: 30px;
}
</style>
