<template>
  <div class="wrapper">
    <div class="wrapper__background">
      <header>
        <img class="home-icon" src="../assets/images/logo.svg" alt="logo" />
      </header>
    </div>
    <div class="wrapper__content">
      <div class="mobile_footer">
        <div style="padding: 10px 18px">
          <nuxt />
        </div>
        <img
          src="~assets/images/footer-pattern-individual.png"
          alt="footer-pattern"
        />
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
    padding: 0 10px;
    text-align: right;
  }
  &__background {
    height: 45%;
    background-image: url('../assets/images/background-image-individual.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &__content {
    position: relative;
    height: 55%;
    .mobile_footer {
      // position: absolute;
      // bottom: 0;
      padding-top: 1rem;
      height: 100%;
      img {
        position: absolute;
        bottom: 0;
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
