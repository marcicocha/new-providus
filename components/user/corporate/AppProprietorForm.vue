<template>
  <div>
    <a-form>
      <a-row type="flex">
        <a-col :span="8">
          <AppSelect
            v-model="proprietorObject.title"
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
            v-model="proprietorObject.surname"
            label="Surname"
            placeholder="Type Surname"
            is-text
          />
        </a-col>
      </a-row>
      <AppInput
        v-model="proprietorObject.firstName"
        label="First Name"
        placeholder="Type First Name"
        is-text
      />
      <AppInput
        v-model="proprietorObject.email"
        label="Email Address"
        placeholder="Enter Proprietor's email address"
      />
      <AppInput
        v-model="proprietorObject.bvn"
        placeholder="Enter Proprietor's Bank Verification Number"
        label="BVN"
        is-number
        max-length="11"
        min-length="11"
      />
    </a-form>
    <div class="button_container">
      <p v-if="!isAddedToList">
        <a @click="addProprietorFormHandler"
          ><span class="icon"> <i class="fas fa-plus"></i> </span
        ></a>
      </p>
      <p v-if="isAddedToList">
        <a @click="editProprietorFormHandler"
          ><span class="icon"> <i class="fas fa-pen"></i> </span
        ></a>
      </p>
      <p v-if="isAddedToList">
        <a @click="removeProprietorFormHandler"
          ><span class="icon"> <i class="fas fa-trash"></i> </span
        ></a>
      </p>
    </div>
  </div>
</template>
<script>
import { Row, Col, Form, notification } from 'ant-design-vue'
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'

export default {
  name: 'AppProprietorForm',
  components: {
    AppInput,
    AppSelect,
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
  },
  props: {
    proprietorDetailsObject: {
      type: Object,
      default: () => ({}),
    },
    isAddedToList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      proprietorObject: {},
    }
  },
  watch: {
    proprietorDetailsObject: {
      handler(newProprietorDetailsObject) {
        if (!newProprietorDetailsObject) {
          return
        }
        this.proprietorObject = {
          ...newProprietorDetailsObject,
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    validationHandler() {
      if (
        this.proprietorObject.title === '' ||
        this.proprietorObject.title === undefined
      ) {
        this.errorMessageHandler('Title')
        return true
      }
      if (
        this.proprietorObject.firstName === '' ||
        this.proprietorObject.firstName === undefined
      ) {
        this.errorMessageHandler('First Name')
        return true
      }
      if (
        this.proprietorObject.surname === '' ||
        this.proprietorObject.surname === undefined
      ) {
        this.errorMessageHandler('Surname')
        return true
      }
      if (
        this.proprietorObject.email === '' ||
        this.proprietorObject.email === undefined
      ) {
        this.errorMessageHandler('Email')
        return true
      }
      if (
        this.proprietorObject.bvn === '' ||
        this.proprietorObject.bvn === undefined
      ) {
        this.errorMessageHandler('BVN')
        return true
      }
      if (this.proprietorObject.bvn.length !== 11) {
        this.message = 'BVN length should be 11'

        notification.error({
          message: 'Error',
          description: this.message,
          duration: 4000,
        })
        return true
      }
      return false
    },
    editProprietorFormHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      this.$emit('editProprietorFormHandler')
    },
    addProprietorFormHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      this.$emit('addProprietorFormHandler', this.proprietorObject)
    },
    removeProprietorFormHandler() {
      this.$emit('removeProprietorFormHandler')
    },
    errorMessageHandler(message) {
      notification.error({
        message: 'Error',
        description: message,
        duration: 4000,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  p {
    a {
      font-size: 13px !important;
    }
  }
}
.button_container {
  display: flex;
  justify-content: space-between;
}
.surname {
  /* width: 66.9%;
  padding-left: 0 !important;
  border-left-color: transparent !important; */
  margin-left: -1px !important;
}
</style>
