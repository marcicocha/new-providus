<template>
  <div v-if="!loading">
    <div class="container">
      <video
        v-show="!selfieCapture"
        id=""
        autoplay
        playsinline
        style="width: 100%"
      ></video>
      <img v-show="false" id="image" class="animated fadeIn" />

      <!-- <img v-show="selfieCapture" id="image" class="animated fadeIn" /> -->
      <img v-show="false" id="image4" class="animated fadeIn" />
      <canvas
        v-show="selfieCapture"
        id="face-captured"
        class="canvas-2 animated fadeIn"
        height="400px"
      ></canvas>
      <canvas
        v-show="!selfieCapture"
        id="face-detected-cv"
        class="canvas"
      ></canvas>
    </div>

    <!-- Hidden UI Please dont touch-->
    <div id="controls">
      <p id="video-settings" style="width: 100%; overflow: hidden"></p>
      <p id="feedback" style="width: 100%; overflow: hidden"></p>
      <div class="btn-control">
        <button id="start-camera" class="mbtn startcam" onclick="startCamera()">
          Start Camera
        </button>
        <button id="start-capture" class="mbtn" onclick="capture()">
          Start Capture
        </button>
        <button
          id="start-capture-single"
          class="mbtn"
          onclick="captureSingle()"
        >
          Capture
        </button>
        <button id="find-face" onclick="findFace()" disabled>Find face</button>
        <button id="stop-capture" class="mbtn" onclick="stopCapture()">
          STOP
        </button>
      </div>
      <div class="mbtn video-source select">
        <label class="sl" for="videoSource">Video source: </label
        ><select id="videoSource" onchange="restart()"></select>
      </div>
    </div>
    <div id="face-coord" class="mbtn">
      <span
        >Face coords:
        <pre id="face-coords"></pre>
      </span>
    </div>
    <pre id="settings" class="mbtn"></pre>
    <!-- Hidden UI Please dont touch-->

    <AppButton v-if="!selfieCapture" @click="submitCaptureHandler"
      >Capture Selfie</AppButton
    >
    <br />
    <a-row v-if="selfieCapture" type="flex" :gutter="24">
      <a-col :span="12">
        <AppButton class="secondary-btn" @click="returnHandler"
          >Recapture</AppButton
        >
      </a-col>
      <a-col :span="12">
        <AppButton :loading="formLoading" @click="nextHandler"
          >Save &amp; Continue</AppButton
        >
      </a-col>
    </a-row>
    <!-- <AppButton title="Capture Selfie" @click="submitCaptureHandler" /> -->
  </div>
</template>
<script>
import { notification, Row, Col } from 'ant-design-vue'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppCaptureSelfie',
  components: {
    AppButton,
    'a-row': Row,
    'a-col': Col,
  },
  props: {
    formLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      selfieCapture: false,
      imgSrc: '',
    }
  },
  mounted() {
    this.unloadScript()
    this.loadScript()
  },
  destroyed() {
    this.$destroy()
    notification.destroy()
  },
  methods: {
    loadScript() {
      this.loading = false
      this.$loadScript('https://webrtc.github.io/adapter/adapter-latest.js')
        .then(() => {
          this.loading = false
          this.$loadScript('/daon/daon.js').then(() => {
            this.$loadScript('/daon/face/faceCapture.min.js').then(() => {
              this.$loadScript('/daon/face/auto.js').then(() => {
                document.querySelector('.startcam').click()
                document.querySelector('#find-face').click()
              })
            })
          })
        })

        .catch((err) => {
          // Failed to fetch script
          this.loading = false
          let errorMessage = 'Network Error'

          // Error Message from Backend
          // eslint-disable-next-line no-prototype-builtins
          if (err.hasOwnProperty('response')) {
            const res = err.response
            errorMessage = res.data.errorMessage

            notification.error({
              message: 'Error',
              description: errorMessage,
            })
          }
        })
    },
    unloadScript() {
      this.$unloadScript('/daon/face/faceCapture.min.js')
        .then(() => {
          this.$unloadScript('/daon/face/auto.js').then(() => {})
        })
        .catch((err) => {
          // Failed to fetch script
          this.loading = false
          let errorMessage = 'Network Error'

          // Error Message from Backend
          // eslint-disable-next-line no-prototype-builtins
          if (err && err.hasOwnProperty('response')) {
            const res = err.response
            errorMessage = res.data.errorMessage

            notification.error({
              message: 'Error',
              description: errorMessage,
            })
          }
        })
    },
    submitCaptureHandler() {
      //  this.$emit('submitCapturehandler')
      document.querySelector('#start-capture-single').click()
      this.selfieCapture = true
      const image = document.querySelector('#image')
      const img = document.querySelector('#image4')
      image.onload = function () {
        const c2 = document.getElementById('face-captured')
        const ctx2 = c2.getContext('2d')
        ctx2.drawImage(image, 60, 90, 360, 460, 0, 0, c2.width, c2.height)
        img.src = c2.toDataURL()
        img.width = c2.width
        img.height = c2.height
      }
      // setTimeout(() => {
      //   this.imgSrc = document.querySelector('#image').src
      // }, 500)
    },
    returnHandler() {
      this.imgSrc = ''
      this.selfieCapture = false
    },
    // dataURLtoFile(dataurl, filename) {
    //   return new File([u8arr], filename, { type: mime })
    // },
    async nextHandler() {
      const img = document.querySelector('#image4')
      const res = await fetch(img.src)
      const blob = await res.blob()
      const file = new File([blob], 'selfie.png', {
        lastModified: new Date().getTime(),
        type: 'image/png',
      })
      console.log(file, 'FILE ')
      // const blob = document.blob
      // const file = new File([blob], 'selfie.jpg', {
      //   lastModified: new Date().getTime(),
      //   type: 'image/jpeg',
      // })

      await this.$emit('submitCapturehandler', file)
      // this.$router.replace('/user/individual/upload-valid-id')
      document.querySelector('#stop-capture').click()
    },
    getImage(data) {},
  },
}
</script>
<style scoped>
.container {
  margin: 0 auto;
  position: relative;
}
pre {
  -webkit-overflow-scrolling: touch;
  background-color: whitesmoke;
  color: #4a4a4a;
  font-size: 9px;
  overflow-x: auto;
  padding: 0.1rem;
  white-space: pre;
  word-wrap: normal;
}
#video-settings,
#feedback {
  width: 100%;
  display: block;
  font-size: 9px;
}
.video {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
}
select {
  display: inline-block;
  width: 100%;
  float: left;
}
.canvas-2 {
  width: 100%;

  /* height: 420px; */
  transform: scaleX(-1);
}
.canvas {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  transform: scaleX(-1);
  background: rgb(0, 0, 0);
  background: radial-gradient(
    ellipse,
    rgba(0, 0, 0, 0.14754098360655743) 54%,
    rgba(0, 0, 0, 0.6222950819672132) 62%
  );
}
.mbtn,
#controls {
  width: auto !important;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  float: left;
  font-size: 9px;
  visibility: hidden;
}
.sl,
#face-coord {
  font-size: 11px;
}
.select:not(.is-multiple):not(.is-loading)::after {
  border-color: #fdb813;
  right: 1.125em;
  z-index: 4;
  margin-top: 6px;
}
.video-source,
.btn-control {
  display: inline-block;
  width: 100%;
  height: auto;
  font-size: 10px;
}
#image {
  display: inline-block;
  width: 100%;

  /* position: absolute;
    left: 0;
    top: 0; */

  transform: scaleX(-1);
}
</style>
