<template>
  <div>
    <AppTitleComponent heading="Proprietor Details" />
    <br />
    <div>
      <AppAccordion
        v-for="(item, index) in proprietorList"
        :key="index"
        :heading="`Proprietor ${index + 1}`"
        :init-is-true="false"
      >
        <template slot="content">
          <AppProprietorForm
            :proprietor-details-object="item"
            :is-added-to-list="true"
            @editProprietorFormHandler="editProprietorFormHandler(item)"
            @removeProprietorFormHandler="removeProprietorFormHandler(item)"
          />
        </template>
      </AppAccordion>
      <AppProprietorForm
        v-if="proprietorList.length < 5"
        :proprietor-details-object="proprietorDetailsObject"
        @addProprietorFormHandler="addProprietorFormHandler"
      />
    </div>
    <br />
    <AppButton
      v-if="proprietorList.length !== 0"
      :loading="loading"
      @click="submitProprietorHandler"
      >Continue</AppButton
    >
  </div>
</template>
<script>
import { notification } from 'ant-design-vue'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppAccordion from '@/components/UI/AppAccordion.vue'
import AppProprietorForm from '@/components/user/corporate/AppProprietorForm.vue'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppAccordion,
    AppProprietorForm,
    AppButton,
  },
  data() {
    return {
      proprietorList: [],
      proprietorDetailsObject: {},
      loading: false,
    }
  },
  methods: {
    async submitProprietorHandler() {
      try {
        this.loading = true
        await this.$axios.$put(
          '/corporate/proprietorDetails',
          this.proprietorList
        )
        this.loading = false
        this.$router.replace('/user/corporate/next-step')
      } catch (err) {
        this.loading = false
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(err).forEach((msg) => {
          notification.error({
            message: 'Error',
            description: msg,
            duration: 0,
          })
        })
        // this.message = err.response.data.errorMessage
        // let errorMessage = 'Network Error'
        // // eslint-disable-next-line no-prototype-builtins
        // if (err.hasOwnProperty('response')) {
        //   const res = err.response
        //   errorMessage = res.data.errorMessage
        //   const validationError = res.data.fieldValidationErrors
        //     ? res.data.fieldValidationErrors
        //     : []
        //   if (validationError === [] || !validationError) {
        //     notification.error({
        //       message: 'Error',
        //       description: errorMessage,
        //       duration: 0,
        //     })
        //     return
        //   }
        //   validationError.forEach((element) => {
        //     notification.error({
        //       message: 'Error',
        //       description: element.message,
        //       duration: 0,
        //     })
        //   })
        // }
      }
    },
    editProprietorFormHandler(obj, index) {
      this.proprietorList = this.proprietorList.map((proprietor) => {
        return proprietor.key === obj.key ? obj : proprietor
      })
    },
    addProprietorFormHandler(proprietor) {
      if (this.proprietorList.length <= 5) {
        const requestId = this.$cookies.get('requestId')
        const obj = {
          ...proprietor,
          requestId,
          key: Date.now(),
        }

        this.proprietorList.push(obj)
      } else {
        notification.error({
          message: 'Error',
          description: 'Only 5 proprietors can be added',
          duration: 0,
        })
        return
      }
      this.proprietorDetailsObject = {}
    },
    removeProprietorFormHandler(obj) {
      const newArray = this.proprietorList.filter(
        (proprietor) => proprietor.key !== obj.key
      )
      this.proprietorList = newArray
    },
  },
}
</script>
