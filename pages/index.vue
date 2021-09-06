<template>
  <div class="parent_container">
    <AppTitleComponent
      heading="Account Creation Web Portal"
      :description="description"
    />

    <div class="child-container">
      <div class="homepage_button__padding">
        <nuxt-link
          to="/user/individual/account-type-selection"
          class="button is-medium is-primary"
          ><span>GET STARTED</span></nuxt-link
        >
      </div>
      <p class="reference">
        Have a Reference Number?
        <nuxt-link to="/user/individual/upload-document">Click Here</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { isBrowser } from 'browser-or-node'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
export default {
  components: {
    AppTitleComponent,
  },
  layout(context) {
    let mobile
    if (isBrowser) {
      const isMobile = {
        Android() {
          return navigator.userAgent.match(/Android/i)
        },
        BlackBerry() {
          return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera() {
          return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows() {
          return navigator.userAgent.match(/IEMobile/i)
        },
        any() {
          return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
          )
        },
      }

      mobile = isMobile.any() !== null
    }
    return mobile ? 'mobileHomeScreen' : 'default'
  },
  // layout: 'mobileHomeScreen',
  data() {
    return {
      description:
        'Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here. Now let’s guide you through the process of creating your very own Future Forward Bank account.',
      isMobile: false,
    }
  },
  methods: {
    handleResize() {},
  },
}
</script>
<style scoped>
.bold,
.bold * {
  font-weight: 700 !important;
  font-family: 'GothamMedium', sans-serif;
}
p {
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 150%;
  color: #2e434e;
  text-align: center;
  padding-top: 1rem;
}
.reference {
  text-align: left;
}
.homepage_button__padding {
  margin: 1.5rem 0;
}
.parent_container {
  width: 90%;
  height: 100%;
  position: relative;
  top: 13%;
}
.child-container {
  width: 75%;
}
.button {
  width: 100%;
  border-radius: 0;
  font-size: 15px !important;
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #fff !important;
  background-color: #fdb813;
  border-color: transparent;
  cursor: pointer;
  justify-content: center;
  padding: 1em;
  text-align: center;
  white-space: nowrap;
}
@media only screen and (max-width: 600px) {
  .parent_container {
    width: 100%;
    height: 100%;
    position: relative;
    top: 2%;
  }
}
@media only screen and (min-width: 1280px) {
  .parent_container {
    width: 85%;
    height: 100%;
    position: relative;
    top: 19%;
  }
}
@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    .parent_container {
      width: 90%;
      top: 14%;
    }

    .reference {
      font-size: 14px;
    }

    .child-container {
      width: 80%;
    }
    .homepage_button__padding {
      padding-top: 30px;
    }
  }
  @media only screen and (min-height: 900px) {
    .parent_container {
      width: 85%;
      top: 19%;
    }
    .child-container {
      width: 75%;
    }
    .homepage_button__padding {
      padding-top: 50px;
    }
    .reference {
      font-size: 16px;
    }
  }
}
</style>
