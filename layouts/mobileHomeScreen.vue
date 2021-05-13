<template>
  <div class="wrapper">
    <div class="wrapper__background"></div>
    <div class="wrapper__content">
      <header>
        <img class="home-icon" src="../assets/images/logo.svg" alt="logo" />
      </header>
      <div class="mobile_footer">
        <img
          src="~assets/images/footer-pattern-individual.png"
          alt="footer-pattern"
        />
        <div style="padding: 10px 18px">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  header {
    margin-top: 0.5rem;
    text-align: center;
  }
  &__background {
    height: 40%;
    background-image: url('../assets/images/background-image-individual.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &__content {
    position: relative;
    .mobile_footer {
      //   position: absolute;
      //   top: 0;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
