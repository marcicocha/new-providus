<template>
  <div class="parent-container">
    <AppTitleComponent
      heading="Upload Valid Id"
      description="Please upload a valid means of Identification. Either International passport, Driver’s license, Permanent Voter’s card or National ID"
    />
    <br />
    <div>
      <a-form>
        <AppSelect
          v-model="idType"
          label="Id Type"
          placeholder="Select Id Type"
          url="/globalData/data?name=ID%20TYPE"
          :call-back-func="
            (resp) => ({
              text: resp,
              value: resp,
            })
          "
          required
        />
      </a-form>
      <AppButton
        type="default"
        class="outlined_button"
        @click="capturePageHandler"
      >
        <span class="flex_display"
          ><img src="@/assets/images/camera.svg" alt="camera" />
          <span>Capture with Camera</span></span
        >
      </AppButton>
      <br />
      <br />
      <h4 style="margin-top: 0.5rem">OR</h4>
      <AppUpload
        label="from Device"
        height="10em"
        @fileUploadHandler="fileUploadHandler"
        @errorMessagehandler="errorMessagehandler"
        ><template slot="caption">
          <ul v-if="!identityFile" class="caption_list">
            <li>ID must take up at least 80% of the image</li>
            <li>Resolution should be above 300 DPI</li>
            <li>Must be a Jpeg</li>
          </ul>
          <p v-if="identityFile" class="file_name">{{ identityFile.name }}</p>
        </template>
      </AppUpload>
      <br />
      <br />
      <AppButton v-if="identityFile" @click="submitUploadHandler"
        >Continue</AppButton
      >
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { Form, notification } from 'ant-design-vue'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppUpload from '@/components/UI/AppUpload'
import AppButton from '@/components/UI/AppButton'
import AppSelect from '@/components/UI/AppSelect'

export default {
  components: {
    AppTitleComponent,
    AppUpload,
    AppButton,
    AppSelect,
    'a-form': Form,
  },
  data() {
    return {
      identityFile: '',
      message: '',
      idType: '',
    }
  },
  computed: {
    ...mapState({
      idObject: (state) => state.idObject,
    }),
  },
  watch: {
    idObject: {
      handler(newIdObject) {
        if (!newIdObject) {
          this.identityFile = ''
          this.idType = ''
        } else {
          this.identityFile = newIdObject.identityFile
          this.idType = newIdObject.idType
        }
      },
      immediate: true,
      deep: true,
    },
  },
  destroyed() {
    notification.destroy()
  },
  methods: {
    async submitUploadHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      try {
        this.message = ''
        const idObject = {
          idType: this.idType,
          identityFile: this.identityFile,
        }
        await this.submitIdInfoHandler(idObject)
        this.$router.replace('/user/individual/upload')
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
    capturePageHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      this.$cookies.set('idType', this.idType)
      this.$router.replace('/user/individual/capture-id')
    },
    fileUploadHandler(file) {
      this.identityFile = file
      this.message = ''
    },
    errorMessagehandler(message) {
      this.message = message
      this.identityFile = ''
    },
    validationHandler() {
      if (this.idType === undefined || this.idType === '') {
        notification.error({
          message: 'Error',
          description: 'Id Type is Compulsory',
          duration: 4000,
        })
        return true
      }
    },
    ...mapActions({
      submitIdInfoHandler: 'UPLOAD_ID_INFORMATION',
    }),
  },
}
</script>
<style lang="scss" scoped>
// .parent-container {
//   width: 85%;
// }
h4 {
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  font-size: 14px;
}
h4::before,
h4::after {
  background-color: #eaeaea;
  content: '';
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 30%;
}
h4::before {
  right: 0.5em;
  margin-left: -50%;
}
h4::after {
  left: 0.5em;
  margin-right: -50%;
}
.file_name {
  color: #18c139;
  margin-top: 15px;
}
.outlined-button {
  border: 1px solid #fdb813 !important;
  background-color: transparent !important;
  color: #fdb813 !important;
  border-radius: 0;
  font-size: 16px !important;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: bold;
  .flex_display {
    display: flex;
    img {
      margin-right: 10px;
    }
  }
}
.caption_list {
  margin-top: 20px;
  li {
    color: #828e95;
    font-weight: 400;
    margin-bottom: 5px;
  }
  li::before {
    content: '-';
    padding-right: 8px;
  }
}
@media only screen and (max-width: 991px) {
  .outlined-button {
    font-size: 13px !important;
  }
  h4 {
    margin-bottom: 20px;
    font-size: 12px;
  }
  .parent-container {
    width: 100%;
  }
}
@media only screen and (max-width: 1200px) {
  .parent-container {
    width: 100%;
  }
}
</style>
