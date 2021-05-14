<template>
  <div>
    <a-form>
      <a-row type="flex">
        <a-col :span="8">
          <AppSelect
            v-model="directorObject.title"
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
            v-model="directorObject.surname"
            label="Surname"
            placeholder="Type Surname"
            is-text
          />
        </a-col>
      </a-row>
      <AppInput
        v-model="directorObject.firstName"
        label="First Name"
        placeholder="Type First Name"
        is-text
      />
      <AppInput
        v-model="directorObject.email"
        label="Email Address"
        placeholder="Enter Director's email address"
      />
      <AppInput
        v-model="directorObject.bvn"
        placeholder="Enter Director's Bank Verification Number"
        label="BVN"
        is-number
        max-length="11"
        min-length="11"
      />
    </a-form>
    <div class="button_container">
      <p v-if="!isAddedToList">
        <a @click="addDirectorFormHandler"
          ><span class="icon"> <i class="fas fa-plus"></i> </span
        ></a>
      </p>
      <p v-if="isAddedToList">
        <a @click="editDirectorFormHandler"
          ><span class="icon"> <i class="fas fa-pen"></i> </span
        ></a>
      </p>
      <p v-if="isAddedToList">
        <a @click="removeDirectorFormHandler"
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
  name: 'AppDirectorForm',
  components: {
    AppInput,
    AppSelect,
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
  },
  props: {
    directorDetailsObject: {
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
      directorObject: {},
    }
  },
  watch: {
    directorDetailsObject: {
      handler(newDirectorDetailsObject) {
        if (!newDirectorDetailsObject) {
          return
        }
        this.directorObject = {
          ...newDirectorDetailsObject,
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    validationHandler() {
      if (
        this.directorObject.title === '' ||
        this.directorObject.title === undefined
      ) {
        this.errorMessageHandler('Title')
        return true
      }
      if (
        this.directorObject.firstName === '' ||
        this.directorObject.firstName === undefined
      ) {
        this.errorMessageHandler('First Name')
        return true
      }
      if (
        this.directorObject.surname === '' ||
        this.directorObject.surname === undefined
      ) {
        this.errorMessageHandler('Surname')
        return true
      }
      if (
        this.directorObject.email === '' ||
        this.directorObject.email === undefined
      ) {
        this.errorMessageHandler('Email')
        return true
      }
      if (
        this.directorObject.bvn === '' ||
        this.directorObject.bvn === undefined
      ) {
        this.errorMessageHandler('BVN')
        return true
      }
      if (this.directorObject.bvn.length !== 11) {
        this.message = 'BVN length should be 11'

        notification.error({
          message: 'Error',
          description: this.message,
          duration: 0,
        })
        return true
      }
      return false
    },
    editDirectorFormHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      this.$emit('editDirectorFormHandler')
    },
    addDirectorFormHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      this.$emit('addDirectorFormHandler', this.directorObject)
    },
    removeDirectorFormHandler() {
      this.$emit('removeDirectorFormHandler')
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
